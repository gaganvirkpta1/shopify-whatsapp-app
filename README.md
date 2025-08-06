# 🚀 Shopify WhatsApp App with Theme App Extensions

A complete WhatsApp integration app for Shopify stores that **automatically embeds** the widget into themes without manual code injection.

## ✨ Key Features

- 🎯 **Automatic Installation** - No manual code copying required
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🎨 **Theme Customizer Integration** - Easy settings panel in Shopify admin
- ⚡ **Fast Loading** - Lightweight script that doesn't slow down stores
- 📊 **Analytics Ready** - Built-in support for Google Analytics and Facebook Pixel
- 🌐 **Multi-language Support** - Hindi and English included
- 🔧 **No Theme Conflicts** - Works with theme updates

## 🎯 How It Works

### Traditional Method (Manual)
❌ Merchant installs app → Copies script → Pastes in theme.liquid → Configures manually

### Our Method (Automatic)
✅ Merchant installs app → Widget appears in theme customizer → Configure with GUI → Done!

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Shopify Partners account
- Shopify CLI installed globally
- WhatsApp Business number

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/gaganvirkpta1/shopify-whatsapp-app
   cd shopify-whatsapp-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Update the `.env` file:
   ```env
   SHOPIFY_API_KEY=your_api_key_here
   SHOPIFY_API_SECRET=your_api_secret_here
   SCOPES=read_products,write_products
   HOST=https://your-app-url.com
   SHOP=your-shop.myshopify.com
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🚀 Theme App Extension Deployment

### Install Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
```

### Deploy Extension
```bash
shopify auth login
shopify app deploy
```

### For Merchants (After Installation)
1. Go to **Online Store > Themes > Customize**
2. Add **"WhatsApp Chat Widget"** block
3. Configure settings in the sidebar
4. Save and publish

## 📱 Widget Configuration

Merchants can customize these settings in their theme editor:

| Setting | Description | Default |
|---------|-------------|---------|
| Phone Number | WhatsApp number with country code | 919999999999 |
| Default Message | Pre-filled message text | "Hello! I need help..." |
| Button Text | Text on the widget button | "💬 Chat with us" |
| Position | Widget placement | Bottom Right |
| Background Color | Button background color | #25D366 |
| Animation | Button animation style | Pulse |
| Mobile Visibility | Show on mobile devices | Yes |
| Desktop Visibility | Show on desktop | Yes |

## 🔧 API Endpoints

- `GET /` - Main app page with demo
- `GET /whatsapp-widget` - Widget demo page
- `GET /api/whatsapp-script` - Legacy script endpoint
- `GET /auth` - Begin Shopify OAuth flow
- `GET /auth/callback` - OAuth callback handler
- `GET /health` - Health check endpoint

## 📁 Project Structure

```
shopify-whatsapp-app/
├── extensions/
│   └── whatsapp-widget/
│       ├── blocks/
│       │   └── whatsapp-widget.liquid    # Main widget block
│       ├── locales/
│       │   ├── en.default.json          # English translations
│       │   └── hi.json                  # Hindi translations
│       └── shopify.extension.toml       # Extension configuration
├── public/
│   ├── index.html                       # Demo page
│   ├── whatsapp.js                      # Legacy widget script
│   └── app-embed.js                     # Advanced widget script
├── server.js                            # Main server file
├── shopify.app.toml                     # App configuration
├── package.json                         # Dependencies
├── README.md                            # This file
└── THEME_APP_EXTENSION_GUIDE.md         # Detailed extension guide
```

## 🔒 Security Features

- ✅ Shopify OAuth integration
- ✅ Theme App Extension security model
- ✅ No direct theme file modification
- ✅ Sandboxed execution environment
- ✅ GDPR compliant (no data collection)

## 🌐 Multi-language Support

The extension includes translations for:
- **English** (default)
- **Hindi** (हिंदी)
- Easy to add more languages

## 🐛 Troubleshooting

### Extension Not Showing
1. Verify app installation in Shopify admin
2. Check if extension is enabled
3. Ensure theme compatibility

### Widget Not Appearing
1. Check if block is added to theme
2. Verify device visibility settings
3. Clear browser cache

### Settings Not Saving
1. Check theme customizer permissions
2. Verify extension configuration
3. Test with different browser

## 📊 Analytics Integration

Built-in support for:
```javascript
// Google Analytics
gtag('event', 'whatsapp_click', {
  event_category: 'engagement',
  event_label: 'whatsapp_widget'
});

// Facebook Pixel
fbq('track', 'Contact');
```

## 🚀 Deployment Options

### Option 1: Shopify App Store (Recommended)
1. Complete app development
2. Submit for Shopify review
3. Get approved and listed
4. Merchants install automatically

### Option 2: Custom App
1. Deploy to Render/Heroku
2. Create custom app in merchant's admin
3. Install manually for specific stores

### Option 3: Development Store
1. Use for testing and development
2. Perfect for client projects
3. No app store submission needed

## 📞 Support

- 📧 Email: support@yourstore.com
- 💬 WhatsApp: Use the widget on demo page
- 🌐 GitHub: [Create an issue](https://github.com/gaganvirkpta1/shopify-whatsapp-app/issues)
- 📖 Documentation: See `THEME_APP_EXTENSION_GUIDE.md`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Made with ❤️ for Shopify merchants who want seamless WhatsApp integration**
