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

// API endpoint to get WhatsApp widget script
app.get('/api/whatsapp-script', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'whatsapp.js'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`App URL: ${process.env.HOST}`);
});
