// Shopify WhatsApp App Embed Script
(function() {
  'use strict';
  
  // Configuration - यहाँ अपनी settings change करें
  const config = {
    phoneNumber: '919999999999', // अपना WhatsApp number यहाँ डालें (country code के साथ)
    message: 'Hello! I need help with my order.', // Default message
    buttonText: '💬 Chat with us',
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    showOnMobile: true,
    showOnDesktop: true,
    backgroundColor: '#25D366',
    textColor: '#ffffff',
    borderRadius: '50px',
    animation: 'pulse' // pulse, bounce, none
  };

  // Device detection
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Check if should show widget
  function shouldShowWidget() {
    if (isMobile() && !config.showOnMobile) return false;
    if (!isMobile() && !config.showOnDesktop) return false;
    return true;
  }

  // Create WhatsApp widget
  function createWhatsAppWidget() {
    if (!shouldShowWidget()) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'whatsapp-widget-container';
    
    // Position styles
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' }
    };
    
    const pos = positions[config.position] || positions['bottom-right'];
    
    // Apply styles
    Object.assign(container.style, {
      position: 'fixed',
      zIndex: '9999',
      ...pos
    });

    // Create button
    const button = document.createElement('a');
    button.href = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message)}`;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.innerHTML = config.buttonText;
    
    // Button styles
    Object.assign(button.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 20px',
      backgroundColor: config.backgroundColor,
      color: config.textColor,
      textDecoration: 'none',
      borderRadius: config.borderRadius,
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif'
    });

    // Add animation
    if (config.animation === 'pulse') {
      button.style.animation = 'whatsapp-pulse 2s infinite';
    } else if (config.animation === 'bounce') {
      button.style.animation = 'whatsapp-bounce 2s infinite';
    }

    // Hover effects
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes whatsapp-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes whatsapp-bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @media (max-width: 768px) {
        #whatsapp-widget-container a {
          padding: 10px 16px !important;
          font-size: 14px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Assemble widget
    container.appendChild(button);
    document.body.appendChild(container);

    // Analytics tracking (optional)
    button.addEventListener('click', function() {
      // Track click event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: 'whatsapp_widget'
        });
      }
      
      // Track with Facebook Pixel if available
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWhatsAppWidget);
  } else {
    createWhatsAppWidget();
  }

})();

