(function () {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/919999999999'; // ← yahan apna WhatsApp number dalna
  btn.target = '_blank';
  btn.innerText = '💬 Chat with us';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.padding = '10px 15px';
  btn.style.background = '#25D366';
  btn.style.color = 'white';
  btn.style.borderRadius = '5px';
  btn.style.fontSize = '16px';
  btn.style.textDecoration = 'none';
  btn.style.zIndex = '9999';
  document.body.appendChild(btn);
})();
