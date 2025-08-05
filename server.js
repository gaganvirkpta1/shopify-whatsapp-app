import express from 'express';
import dotenv from 'dotenv';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { nodeAdapter } from '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin'; // ✅ Add this here

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(','),
  hostName: new URL(process.env.HOST).host,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  adapter: nodeAdapter,
  restResources, // ✅ Add this here too
});

app.get('/', (req, res) => {
  res.send('Shopify WhatsApp App is Running 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
