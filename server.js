import express from "express";
import dotenv from "dotenv";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Shopify
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: new URL(process.env.HOST).host,
  isEmbeddedApp: true,
  apiVersion: LATEST_API_VERSION,
});

app.get("/", (req, res) => {
  res.send("WhatsApp App Running");
});

// Inject WhatsApp code after authentication
app.get("/auth/callback", async (req, res) => {
  try {
    const session = await shopify.auth.validateAuthCallback(req, res, req.query);

    const client = new shopify.rest.RestClient(session.shop, session.accessToken);

    const themes = await client.get({ path: "themes" });
    const mainTheme = themes.body.themes.find((theme) => theme.role === "main");

    if (mainTheme) {
      await client.put({
        path: `themes/${mainTheme.id}/assets`,
        data: {
          asset: {
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
          },
        },
        type: "application/json",
      });
    }

    res.redirect(`https://${session.shop}/admin/apps`);
  } catch (error) {
    console.error("Auth callback error:", error);
    res.status(500).send("Authentication failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
