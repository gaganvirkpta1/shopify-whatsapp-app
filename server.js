import express from 'express';
import dotenv from 'dotenv';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Manual In-Memory Session Storage
const sessionStorage = {
  store: new Map(),
  async storeSession(session) {
    sessionStorage.store.set(session.id, session);
    return true;
  },
  async loadSession(id) {
    return sessionStorage.store.get(id) || undefined;
  },
  async deleteSession(id) {
    return sessionStorage.store.delete(id);
  },
  async deleteSessions(ids) {
    ids.forEach(id => sessionStorage.store.delete(id));
    return true;
  },
  async findSessionsByShop(shop) {
    return [...sessionStorage.store.values()].filter((session) => session.shop === shop);
  },
};

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES ? process.env.SCOPES.split(',') : [],
  hostName: new URL(process.env.HOST).host,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  sessionStorage, // ✅ Use our manual session storage
});

app.get('/', (req, res) => {
  res.send('✅ Shopify WhatsApp App is Running');
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
