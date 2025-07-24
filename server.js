import { Theme } from "@shopify/shopify-api/rest/admin/2024-01/theme.js";
import { Asset } from "@shopify/shopify-api/rest/admin/2024-01/asset.js";

// ... inside shopify.afterAuth = async ({ session, shop, accessToken, }) => {

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
  }
