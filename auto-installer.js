/**
 * WhatsApp Widget Auto-Installer
 * This script automatically injects the WhatsApp widget into any Shopify theme
 * without requiring manual code installation by merchants
 */

(function() {
    'use strict';
    
    // Configuration - This will be dynamically populated from your app settings
    const config = {
        phoneNumber: '919999999999', // Will be replaced with actual merchant's number
        message: 'Hello! I need help with my order.',
        buttonText: '💬 Chat with us',
        position: 'bottom-right',
        backgroundColor: '#25D366',
        animation: 'pulse',
        showOnMobile: true,
        showOnDesktop: true
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

        // Check if widget already exists
        if (document.getElementById('whatsapp-auto-widget')) return;

        // Position styles
        const positions = {
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' }
        };
        
        const pos = positions[config.position] || positions['bottom-right'];
        
        // Create container
        const container = document.createElement('div');
        container.id = 'whatsapp-auto-widget';
        
        // Apply container styles
        Object.assign(container.style, {
            position: 'fixed',
            zIndex: '9999',
            ...pos
        });

        // Create button
        const button = document.createElement('a');
        button.href = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message )}`;
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
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Arial, sans-serif'
        });

        // Add animation
        if (config.animation === 'pulse') {
            button.style.animation = 'whatsapp-pulse-auto 2s infinite';
        } else if (config.animation === 'bounce') {
            button.style.animation = 'whatsapp-bounce-auto 2s infinite';
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
            @keyframes whatsapp-pulse-auto {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes whatsapp-bounce-auto {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            @media (max-width: 768px) {
                #whatsapp-auto-widget a {
                    padding: 10px 16px !important;
                    font-size: 14px !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Assemble widget
        container.appendChild(button);
        document.body.appendChild(container);

        // Analytics tracking
        button.addEventListener('click', function() {
            // Track click event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    event_category: 'engagement',
                    event_label: 'whatsapp_widget_auto'
                });
            }
            
            // Track with Facebook Pixel if available
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact');
            }

            // Send analytics to your app server
            fetch('/api/analytics/widget-click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event: 'whatsapp_click',
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href
                })
            }).catch(() => {}); // Silent fail
        });
    }

    // Initialize widget when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWhatsAppWidget);
    } else {
        createWhatsAppWidget();
    }

    // Also initialize after a short delay to ensure all theme scripts have loaded
    setTimeout(createWhatsAppWidget, 1000);

})();
