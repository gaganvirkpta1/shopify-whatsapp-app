import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sessionStorage = new MemorySessionStorage();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES ? process.env.SCOPES.split(',') : [],
  hostName: new URL(process.env.HOST).host,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  sessionStorage,
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Shopify WhatsApp App is Running 🚀</h1>
    <p>Your app is successfully deployed!</p>
    <a href="/whatsapp-widget">View WhatsApp Widget</a>
  `);
});

// Serve WhatsApp widget
app.get('/whatsapp-widget', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// OAuth callback route
app.get('/auth/callback', async (req, res) => {
  try {
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;
    
    if (session) {
      // Store session
      await sessionStorage.storeSession(session);

      // Create Script Tag after successful installation
      const client = new shopify.clients.Rest({
        session,
        apiVersion: LATEST_API_VERSION,
      });

      try {
        await client.post({
          path: 'script_tags',
          data: {
            script_tag: {
              event: 'onload',
              src: `${process.env.HOST}/api/whatsapp-script`,
              display_scope: 'all',
            },
          },
          type: 'application/json',
        });
        console.log('Script Tag created successfully!');
      } catch (scriptTagError) {
        console.error('Error creating Script Tag:', scriptTagError);
      }

      res.redirect('/');
    } else {
      res.status(400).send('Authentication failed');
    }
  } catch (error) {
    console.error('Auth callback error:', error);
    res.status(500).send('Authentication error');
  }
});

// Begin OAuth flow
app.get('/auth', async (req, res) => {
  try {
    const authRoute = await shopify.auth.begin({
      shop: req.query.shop,
      callbackPath: '/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
    
    res.redirect(authRoute);
  } catch (error) {
    console.error('Auth begin error:', error);
    res.status(500).send('Authentication initialization failed');
  }
});

// API endpoint to get WhatsApp widget script (now serving auto-installer.js)
app.get('/api/whatsapp-script', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'auto-installer.js'));
});

// API endpoint for analytics tracking from auto-installer.js
app.post('/api/analytics/widget-click', (req, res) => {
  console.log('Widget click event received:', req.body);
  // You can store this data in a database or send it to an analytics service
  res.status(200).json({ message: 'Analytics received' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`App URL: ${process.env.HOST}`);
});
