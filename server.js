import express from "express";
import { shopifyApp } from "@shopify/shopify-app-express";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
import dotenv from "dotenv";
import { Theme } from "@shopify/shopify-api/rest/admin/2024-01/theme.js";
import { Asset } from "@shopify/shopify-api/rest/admin/2024-01/asset.js";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);

const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES.split(","),
    hostName: process.env.HOST.replace(/^https?:\/\//, ""),
    restResources,
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new shopify.api.session.MemorySessionStorage(),
});

const app = express();
app.use(shopify);

// ✅ Inject WhatsApp button after auth
shopify.afterAuth(async ({ session }) => {
  console.log("App installed on:", session.shop);

  const themes = await Theme.all({ session });
  const mainTheme = themes.find((theme) => theme.role === "main");

  if (mainTheme) {
    await Asset.create({
      session,
      theme_id: mainTheme.id,
      key: "layout/theme.liquid",
      value: `
        {% capture original_content %}{{ content_for_layout }}{% endcapture %}
        {{ original_content }}
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var whatsappBtn = document.createElement("div");
            whatsappBtn.innerHTML = '<a href="https://wa.me/919999999999" target="_blank" style="position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; padding: 10px 20px; border-radius: 30px; text-decoration: none; z-index: 9999;">Chat on WhatsApp</a>';
            document.body.appendChild(whatsappBtn);
          });
        </script>
      `,
    });

    console.log("✅ WhatsApp code injected in theme.liquid");
  }
});

app.get("/", async (_req, res) => {
  res.status(200).send("WhatsApp App is Live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
