import express from 'express';
import dotenv from 'dotenv';
import { shopifyApi, LATEST_API_VERSION, MemorySessionStorage } from '@shopify/shopify-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.send('Shopify WhatsApp App is Running 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
