# 🚀 Shopify WhatsApp App

A complete WhatsApp integration app for Shopify stores that allows customers to easily contact store owners via WhatsApp.

## ✨ Features

- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🎨 **Customizable**: Change colors, position, text, and animations
- ⚡ **Fast Loading**: Lightweight script that doesn't slow down your store
- 📊 **Analytics Ready**: Built-in support for Google Analytics and Facebook Pixel
- 🔧 **Easy Installation**: Simple script integration
- 🌐 **Multi-language Support**: Supports Hindi and English

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Shopify Partner account
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
   Update the `.env` file with your Shopify app credentials:
   ```env
   SHOPIFY_API_KEY=your_api_key_here
   SHOPIFY_API_SECRET=your_api_secret_here
   SCOPES=read_products,write_products
   HOST=https://your-app-url.com
   SHOP=your-shop.myshopify.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Test locally**
   Visit `http://localhost:3000` to see your app running.

## 🚀 Deployment Options

### Option 1: Render (Recommended)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on git push

### Option 2: Heroku
1. Install Heroku CLI
2. Create new Heroku app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set SHOPIFY_API_KEY=your_key`
4. Deploy: `git push heroku main`

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Set environment variables in Vercel dashboard

## 📱 WhatsApp Widget Integration

### For Shopify Store Owners

1. **Add to theme.liquid**
   Add this script before the closing `</body>` tag in your theme.liquid file:
   ```html
   <script src="https://your-app-url.com/app-embed.js"></script>
   ```

2. **Customize the widget**
   Download the `app-embed.js` file and modify the config object:
   ```javascript
   const config = {
     phoneNumber: '919999999999', // Your WhatsApp number with country code
     message: 'Hello! I need help with my order.',
     buttonText: '💬 Chat with us',
     position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
     backgroundColor: '#25D366',
     animation: 'pulse' // pulse, bounce, none
   };
   ```

## 🔧 API Endpoints

- `GET /` - Main app page
- `GET /whatsapp-widget` - Widget demo page
- `GET /api/whatsapp-script` - Returns the widget JavaScript
- `GET /auth` - Begin Shopify OAuth flow
- `GET /auth/callback` - OAuth callback handler
- `GET /health` - Health check endpoint

## 📁 Project Structure

```
shopify-whatsapp-app/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md             # This file
└── public/
    ├── index.html        # Widget demo page
    ├── whatsapp.js       # Simple widget script
    └── app-embed.js      # Advanced widget script
```

## 🔒 Security Features

- ✅ Shopify OAuth integration
- ✅ Session management with MemorySessionStorage
- ✅ Environment variable protection
- ✅ CORS support for cross-origin requests

## 🐛 Troubleshooting

### Common Issues

1. **Import Error: MemorySessionStorage**
   - Solution: Install `@shopify/shopify-app-session-storage-memory`
   - Command: `npm install @shopify/shopify-app-session-storage-memory`

2. **Missing adapter implementation error**
   - Solution: Import Node.js adapter before shopifyApi
   - Add: `import '@shopify/shopify-api/adapters/node';`

3. **App not loading in Shopify**
   - Check if HOST URL is correct in .env
   - Ensure app is publicly accessible
   - Verify Shopify app settings

### Error Fixes Applied

✅ Fixed MemorySessionStorage import path
✅ Added Node.js adapter import
✅ Updated package dependencies
✅ Added proper error handling
✅ Implemented OAuth flow

## 📞 Support

- 📧 Email: support@yourstore.com
- 💬 WhatsApp: Use the widget on the demo page
- 🌐 GitHub: [Create an issue](https://github.com/gaganvirkpta1/shopify-whatsapp-app/issues)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Made with ❤️ for Shopify merchants who want to connect with their customers via WhatsApp**
