import express from 'express';
import dotenv from 'dotenv';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { nodeAdapter } from '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-04'; // ✅ required for ScriptTag API

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

shopify.rest.setRestResources(restResources); // ✅ required setup

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(','),
  hostName: new URL(process.env.HOST).host,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  adapter: nodeAdapter,
});

// ✅ Home route
app.get('/', (req, res) => {
  res.send('Shopify WhatsApp App is Running 🚀');
});

// ✅ WhatsApp ScriptTag registration route
app.get('/register-script', async (req, res) => {
  try {
    const session = await shopify.session.customAppSession(process.env.SHOP); // use your test store
    const response = await shopify.rest.ScriptTag.create({
      session,
      body: {
        event: 'onload',
        src: 'https://shopify-whatsapp-app-m6cy.onrender.com/whatsapp.js',
      },
    });

    res.send('✅ WhatsApp ScriptTag registered: ' + JSON.stringify(response));
  } catch (err) {
    console.error('❌ ScriptTag Error:', err);
    res.status(500).send('Error registering ScriptTag');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
