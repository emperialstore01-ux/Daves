document.addEventListener('DOMContentLoaded', () => {

  // --- STATE MANAGEMENT ---
  let cart = JSON.parse(localStorage.getItem('emperialCart')) || [];
  let history = JSON.parse(localStorage.getItem('emperialHistory')) || [];
  let currentLanguage = localStorage.getItem('emperialLang') || 'fr';
  let currentCurrency = localStorage.getItem('emperialCurrency') || 'USD';
  let navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory')) || ['welcome-section'];

  // --- CONSTANTS ---
  const currencyRates = {
    HTG: 1,
    USD: 0.0075,
    EUR: 0.0070,
    CAD: 0.0103,
    DOP: 0.44,
    BRL: 0.041
  };

  const currencySymbols = {
    HTG: 'HTG',
    USD: '$',
    EUR: '€',
    CAD: 'CA$',
    DOP: 'RD$',
    BRL: 'R$'
  };

  const translations = {
    fr: {
      "home": "Accueil",
      "games": "Jeux",
      "free-fire-offers": "Offres Free Fire",
      "pubg-offers": "Offres PUBG Mobile",
      "call-of-duty-offers": "Offres Call of Duty",
      "dls-offers-title": "Offres DLS",
      "ea-fc-offers-title": "Offres EA FC",
      "delta-force-offers-title": "Offres Delta Force",
      "fortnite-offers-title": "Offres Fortnite",
      "valorant-offers-title": "Offres Valorant",
      "apex-legends-offers-title": "Offres Apex Legends",
      "roblox-offers-title": "Offres Roblox",
      "pokemon-go-offers-title": "Offres Pokémon Go",
      "monopoly-go-offers-title": "Offres Monopoly Go",
      "candy-crush-saga-offers-title": "Offres Candy Crush Saga",
      "league-of-legends-offers-title": "Offres League of Legends",
      "cart": "Panier",
      "history": "Historique",
      "privacy-policy": "Politique de confidentialité",
      "faq": "FAQ",
      "contact": "Contact",
      "welcome-message": "BIENVENUE",
      "welcome-tagline": "Rechargez vos jeux préférés en toute simplicité et sécurité. Des offres exclusives vous attendent !",
      "start-now": "COMMENCER MAINTENANT",
      "diamond-packs-title": "Packs de Diamants",
      "special-packs-title": "Packs Spéciaux",
      "cart-title": "Votre Panier",
      "cart-empty": "Votre panier est vide.",
      "cart-total": "Total :",
      "checkout-button": "Procéder au paiement",
      "checkout-page-title": "Paiement",
      "checkout-summary-text": "Récapitulatif de votre commande :",
      "checkout-total": "Total à payer :",
      "player-id-label": "ID du joueur",
      "player-name-label": "Nom dans le jeu",
      "payment-method-label": "Méthode de paiement",
      "select-payment-method": "Sélectionnez une méthode",
      "cancel-payment": "Annuler",
      "confirm-payment": "Confirmer le Paiement",
      "history-title": "Historique des Achats",
      "history-empty": "Vous n'avez encore aucun achat.",
      "privacy-policy-title": "Politique de Confidentialité",
      "faq-title": "Foire aux Questions (FAQ)",
      "add-to-cart": "🛒 Ajouter",
      "added-to-cart": "ajouté ✔",
      "confirmation-title": "Commande Confirmée !",
      "confirmation-message": "Merci pour votre achat ! Votre commande a été reçue et est en cours de traitement.",
      "order-number": "Numéro de commande :",
      "order-date": "Date :",
      "order-total": "Montant total :",
      "order-details": "Détails de la commande :",
      "back-to-home": "Retour à l'accueil",
      "validation-player-id": "L'ID du joueur doit contenir 6-20 chiffres.",
      "validation-email": "Veuillez entrer une adresse e-mail valide.",
      "validation-phone": "Format de téléphone international accepté"
    },
    en: {
      "home": "Home",
      "games": "Games",
      "free-fire-offers": "Free Fire Offers",
      "pubg-offers": "PUBG Mobile Offers",
      "call-of-duty-offers": "Call of Duty Offers",
      "dls-offers-title": "DLS Offers",
      "ea-fc-offers-title": "EA FC Offers",
      "delta-force-offers-title": "Delta Force Offers",
      "fortnite-offers-title": "Fortnite Offers",
      "valorant-offers-title": "Valorant Offers",
      "apex-legends-offers-title": "Apex Legends Offers",
      "roblox-offers-title": "Roblox Offers",
      "pokemon-go-offers-title": "Pokémon Go Offers",
      "monopoly-go-offers-title": "Monopoly Go Offers",
      "candy-crush-saga-offers-title": "Candy Crush Saga Offers",
      "league-of-legends-offers-title": "League of Legends Offers",
      "cart": "Cart",
      "history": "History",
      "privacy-policy": "Privacy Policy",
      "faq": "FAQ",
      "contact": "Contact",
      "welcome-message": "WELCOME",
      "welcome-tagline": "Top up your favorite games with ease and security. Exclusive offers await you!",
      "start-now": "START NOW",
      "diamond-packs-title": "Diamond Packs",
      "special-packs-title": "Special Packs",
      "cart-title": "Your Cart",
      "cart-empty": "Your cart is empty.",
      "cart-total": "Total:",
      "checkout-button": "Proceed to Checkout",
      "checkout-page-title": "Checkout",
      "checkout-summary-text": "Your order summary:",
      "checkout-total": "Total to pay:",
      "player-id-label": "Player ID",
      "player-name-label": "In-game Name",
      "payment-method-label": "Payment Method",
      "select-payment-method": "Select a method",
      "cancel-payment": "Cancel",
      "confirm-payment": "Confirm Payment",
      "history-title": "Purchase History",
      "history-empty": "You have no purchases yet.",
      "privacy-policy-title": "Privacy Policy",
      "faq-title": "Frequently Asked Questions (FAQ)",
      "add-to-cart": "🛒 Add",
      "added-to-cart": "added ✔",
      "confirmation-title": "Order Confirmed!",
      "confirmation-message": "Thank you for your purchase! Your order has been received and is now being processed.",
      "order-number": "Order Number:",
      "order-date": "Date:",
      "order-total": "Total amount:",
      "order-details": "Order Details:",
      "back-to-home": "Back to Home",
      "validation-player-id": "Player ID must contain 6-20 digits.",
      "validation-email": "Please enter a valid email address.",
      "validation-phone": "International phone format accepted"
    },
    es: {
      "home": "Inicio",
      "games": "Juegos",
      "free-fire-offers": "Ofertas de Free Fire",
      "pubg-offers": "Ofertas de PUBG Mobile",
      "call-of-duty-offers": "Ofertas de Call of Duty",
      "dls-offers-title": "Ofertas de DLS",
      "ea-fc-offers-title": "Ofertas de EA FC",
      "delta-force-offers-title": "Ofertas de Delta Force",
      "fortnite-offers-title": "Ofertas de Fortnite",
      "valorant-offers-title": "Ofertas de Valorant",
      "apex-legends-offers-title": "Ofertas de Apex Legends",
      "roblox-offers-title": "Ofertas de Roblox",
      "pokemon-go-offers-title": "Ofertas de Pokémon Go",
      "monopoly-go-offers-title": "Ofertas de Monopoly Go",
      "candy-crush-saga-offers-title": "Ofertas de Candy Crush Saga",
      "league-of-legends-offers-title": "Ofertas de League of Legends",
      "cart": "Carrito",
      "history": "Historial",
      "privacy-policy": "Política de Privacidad",
      "faq": "Preguntas Frecuentes",
      "contact": "Contacto",
      "welcome-message": "BIENVENIDO",
      "welcome-tagline": "Recarga tus juegos favoritos de forma fácil y segura. ¡Te esperan ofertas exclusivas!",
      "start-now": "EMPEZAR AHORA",
      "diamond-packs-title": "Paquetes de Diamantes",
      "special-packs-title": "Paquetes Especiales",
      "cart-title": "Tu Carrito",
      "cart-empty": "Tu carrito está vacío.",
      "cart-total": "Total:",
      "checkout-button": "Proceder al pago",
      "checkout-page-title": "Pago",
      "checkout-summary-text": "Resumen de tu pedido:",
      "checkout-total": "Total a pagar:",
      "player-id-label": "ID del jugador",
      "player-name-label": "Nombre en el juego",
      "payment-method-label": "Método de pago",
      "select-payment-method": "Seleccione un método",
      "cancel-payment": "Cancelar",
      "confirm-payment": "Confirmar Pago",
      "history-title": "Historial de Compras",
      "history-empty": "Aún no tienes compras.",
      "privacy-policy-title": "Política de Privacidad",
      "faq-title": "Preguntas Frecuentes (FAQ)",
      "add-to-cart": "🛒 Añadir",
      "added-to-cart": "Añadido ✔",
      "confirmation-title": "¡Pedido Confirmado!",
      "confirmation-message": "¡Gracias por su compra! Su pedido ha sido recibido y está en proceso de ser procesado.",
      "order-number": "Número de pedido:",
      "order-date": "Fecha:",
      "order-total": "Cantidad total:",
      "order-details": "Detalles del pedido:",
      "back-to-home": "Volver a Inicio",
      "validation-player-id": "El ID del jugador debe contener 6-20 dígitos.",
      "validation-email": "Por favor, introduzca una dirección de correo electrónico válida.",
      "validation-phone": "Formato de teléfono internacional aceptado"
    }
  };

  // --- DOM SELECTORS ---
  const pageSections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const currencySelect = document.getElementById('currency-select');
  const langSelect = document.getElementById('lang-select');
  const cartCounts = document.querySelectorAll('.cart-count');
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartTotalAmount = document.getElementById('cart-total-amount'); 
  const checkoutBtn = document.querySelector('.checkout-btn');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const backButtons = document.querySelectorAll('.back-button');
  const floatingCartBtn = document.querySelector('.floating-cart-btn');
  const searchContainer = document.querySelector('.search-container');
  const searchInput = document.getElementById('game-search');
  const searchButton = document.getElementById('search-button');
  const gameCards = document.querySelectorAll('#games-section .game-card');
  const toastContainer = document.getElementById('toast-container');
  const checkoutForm = document.getElementById('checkout-form');
  const paymentMethodSelect = document.getElementById('payment-method');
  const moncashInstructions = document.getElementById('moncash-instructions');
  const natcashInstructions = document.getElementById('natcash-instructions');
  const cashAppInstructions = document.getElementById('cashapp-instructions');
  const debitCardInstructions = document.getElementById('debitcard-instructions');

  // Sélecteurs pour la validation et la page de confirmation
  const playerIdInput = document.getElementById('player-id');
  const playerIdError = document.getElementById('player-id-error');
  const customerEmailInput = document.getElementById('customer-email');
  const customerEmailError = document.getElementById('customer-email-error');
  const customerPhoneInput = document.getElementById('customer-phone');
  const customerPhoneError = document.getElementById('customer-phone-error');
  const serverSelect = document.getElementById('server-select');
  const confirmationOrderNumber = document.getElementById('order-number');
  const confirmationOrderDate = document.getElementById('order-date');
  const confirmationTotal = document.getElementById('confirmation-total');
  const confirmationItemsList = document.getElementById('confirmation-items');
  const backToHomeBtn = document.querySelector('.back-to-home-btn');
  const cancelCheckoutBtn = document.getElementById('cancel-checkout-btn');

  // --- FONCTIONS DU FORMULAIRE ---

  // Initialisation de l'upload de capture d'écran
  const initScreenshotUpload = () => {
    const screenshotInput = document.getElementById('screenshot-upload');
    const screenshotPreview = document.getElementById('screenshot-preview');
    const previewImage = document.getElementById('preview-image');
    const removeScreenshotBtn = document.getElementById('remove-screenshot');
    const screenshotError = document.getElementById('screenshot-error');

    if (!screenshotInput) return;

    screenshotInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validation du fichier
        if (!file.type.startsWith('image/')) {
          screenshotError.textContent = 'Veuillez sélectionner une image valide (JPG, PNG, GIF)';
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          screenshotError.textContent = 'L\'image ne doit pas dépasser 5MB';
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          screenshotPreview.classList.remove('hidden');
          screenshotError.textContent = '';
        };
        reader.readAsDataURL(file);
      }
    });

    if (removeScreenshotBtn) {
      removeScreenshotBtn.addEventListener('click', () => {
        screenshotInput.value = '';
        screenshotPreview.classList.add('hidden');
        previewImage.src = '';
        screenshotError.textContent = '';
      });
    }
  };

  // Validation du formulaire (optimisée pour éviter les rebonds)
  const validateForm = (event = null) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-\(\)]{8,}$/;
    const playerIdRegex = /^[0-9]{6,20}$/; // Changé de 6-12 à 6-20 chiffres

    // Validation de l'ID du joueur
    if (playerIdInput && !playerIdRegex.test(playerIdInput.value.trim())) {
      playerIdInput.classList.add('invalid');
      playerIdError.textContent = translations[currentLanguage]['validation-player-id'];
      isValid = false;
    } else if (playerIdInput) {
      playerIdInput.classList.remove('invalid');
      playerIdError.textContent = '';
    }

    // Validation de l'email
    if (customerEmailInput && !emailRegex.test(customerEmailInput.value.trim())) {
      customerEmailInput.classList.add('invalid');
      if (customerEmailError) {
        customerEmailError.textContent = translations[currentLanguage]['validation-email'];
      }
      isValid = false;
    } else if (customerEmailInput) {
      customerEmailInput.classList.remove('invalid');
      if (customerEmailError) {
        customerEmailError.textContent = '';
      }
    }

    // Validation du téléphone
    if (customerPhoneInput) {
      const phoneValue = customerPhoneInput.value.replace(/\s/g, '');
      if (!phoneRegex.test(phoneValue)) {
        customerPhoneInput.classList.add('invalid');
        if (customerPhoneError) {
          customerPhoneError.textContent = translations[currentLanguage]['validation-phone'];
        }
        isValid = false;
      } else {
        customerPhoneInput.classList.remove('invalid');
        if (customerPhoneError) {
          customerPhoneError.textContent = '';
        }
      }
    }

    // Validation du serveur
    if (serverSelect && !serverSelect.value) {
      serverSelect.classList.add('invalid');
      isValid = false;
    } else if (serverSelect) {
      serverSelect.classList.remove('invalid');
    }

    // Validation de la capture d'écran (uniquement lors de la soumission)
    if (event && event.type === 'submit') {
      const screenshotInput = document.getElementById('screenshot-upload');
      const screenshotError = document.getElementById('screenshot-error');
      if (screenshotInput && !screenshotInput.files[0]) {
        if (screenshotError) {
          screenshotError.textContent = 'Veuillez télécharger une capture d\'écran du paiement';
        }
        isValid = false;
      } else if (screenshotError) {
        screenshotError.textContent = '';
      }
    }
    
    // Empêcher le scroll automatique sauf pour les erreurs graves
    if (!isValid && event && event.type === 'submit') {
      event.preventDefault();
      const firstInvalid = document.querySelector('.invalid:not(.hidden)');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  };

  // Formatage du téléphone
  const formatPhoneNumber = (value) => {
    let numbers = value.replace(/\D/g, '');
    if (numbers.length > 15) {
      numbers = numbers.substring(0, 15);
    }
    return numbers;
  };

  // Générer le message WhatsApp
  const generateWhatsAppMessage = (orderId, orderItems, orderTotal, customerInfo) => {
    let message = `*👑 NOUVELLE COMMANDE EMPERIAL*\n`;
    message += `_Référence : ${orderId}_\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `🎮 *DÉTAILS DES RECHARGES :*\n`;
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.game} - ${item.name} (x${item.quantity})\n`;
    });
    
    message += `\n💰 *TOTAL À PAYER :* ${orderTotal.symbol} ${orderTotal.amount}\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `👤 *INFOS JOUEUR :*\n`;
    message += `• ID : \`${customerInfo.playerId}\`\n`;
    message += `• Nom : ${customerInfo.playerName || "Non précisé"}\n`;
    message += `• Serveur : ${customerInfo.server}\n`;
    message += `• Paiement : ${customerInfo.paymentMethod}\n`;
    message += `• Email : ${customerInfo.email}\n`;
    message += `• Téléphone : ${customerInfo.phone}\n`;
    message += `• Note : ${customerInfo.additionalNotes || "Aucune"}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `🖼️ _Je vous joins la capture d'écran du paiement._`;
    
    return encodeURIComponent(message);
  };

  // Page de confirmation
  const renderConfirmationPage = (orderId, orderTotal, orderItems, orderDate) => {
    confirmationOrderNumber.textContent = orderId;
    confirmationTotal.textContent = `${orderTotal.symbol} ${orderTotal.amount}`;
    confirmationOrderDate.textContent = orderDate;

    confirmationItemsList.innerHTML = '';
    orderItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.quantity} x ${item.name} (${item.game})`;
      confirmationItemsList.appendChild(listItem);
    });
  };

  // --- FONCTIONS EXISTANTES ---

  const saveNavigationHistory = () => {
    sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
  };

  const switchPage = (targetId, isBackAction = false) => {
    if (!targetId || !document.getElementById(targetId)) {
      console.warn(`Attempted to switch to a non-existent page: ${targetId}. Defaulting to welcome page.`);
      targetId = 'welcome-section';
    }

    if (!isBackAction) {
      if (navigationHistory[navigationHistory.length - 1] !== targetId) {
        navigationHistory.push(targetId);
        saveNavigationHistory();
      }
    }

    pageSections.forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const displayFloatingCart = targetId.includes('-offers-section') || targetId === 'cart-section' || targetId === 'checkout-page';
    floatingCartBtn.style.display = displayFloatingCart ? 'flex' : 'none';

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.target === targetId) {
        link.classList.add('active');
      }
    });

    mainNav.classList.remove('active');
    
    searchContainer.classList.remove('visible');
    setTimeout(() => {
        searchContainer.classList.add('hidden');
    }, 300);
  };

  const updatePrices = () => {
    const priceElements = document.querySelectorAll('.price');
    const rate = currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];

    priceElements.forEach(p => {
      const basePriceHTG = parseFloat(p.dataset.priceHtg);
      if (!isNaN(basePriceHTG)) {
        const convertedPrice = (basePriceHTG * rate).toFixed(2);
        p.textContent = `${symbol} ${convertedPrice}`;
      }
    });

    updateCartTotal();
    updateCheckoutTotal();
  };
  
  const updateLanguage = () => {
    const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
    const translationMap = translations[currentLanguage];

    elementsToTranslate.forEach(el => {
      const key = el.dataset.langKey;
      if (translationMap[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translationMap[key];
        } else {
          el.textContent = translationMap[key];
        }
      }
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.textContent = translations[currentLanguage]['add-to-cart'];
    });

    const emptyCartMsg = document.querySelector('.cart-items-container .empty-cart-message');
    if (emptyCartMsg) {
        emptyCartMsg.textContent = translations[currentLanguage]['cart-empty'];
    }
  };

  const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="empty-cart-message" data-lang-key="cart-empty">${translations[currentLanguage]['cart-empty']}</p>`;
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <div class="cart-item-info">
            <p class="cart-item-name">${item.game} - ${item.name}</p>
            <p class="cart-item-price price" data-price-htg="${item.priceHTG}"></p>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            <button class="remove-item-btn" data-id="${item.id}">🗑️</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
      });
      if (checkoutBtn) checkoutBtn.disabled = false;
    }
    updateCartCount();
    updateCartTotal();
    updatePrices();
  };
  
  const addToCart = (card) => {
    const itemId = `${card.dataset.game}-${card.dataset.itemName}`;
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: itemId,
        game: card.dataset.game,
        name: card.dataset.itemName,
        priceHTG: parseFloat(card.querySelector('.price').dataset.priceHtg),
        quantity: 1
      });
    }
    saveCart();
    renderCart();
  };

  const updateCartItem = (itemId, action) => {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    if (action === 'increase') {
      cart[itemIndex].quantity++;
    } else if (action === 'decrease') {
      cart[itemIndex].quantity--;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    } else if (action === 'remove') {
      cart.splice(itemIndex, 1);
    }

    saveCart();
    renderCart();
  };

  const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    cartCounts.forEach(count => {
      count.textContent = totalItems;
      count.style.display = totalItems > 0 ? 'flex' : 'none';
    });
  };

  const updateCartTotal = () => {
    const totalHTG = cart.reduce((sum, item) => sum + (item.priceHTG * item.quantity), 0);
    const rate = currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    const convertedTotal = (totalHTG * rate).toFixed(2);
    const cartTotalAmountElement = document.getElementById('cart-total-amount');
    if (cartTotalAmountElement) {
        cartTotalAmountElement.textContent = `${symbol} ${convertedTotal}`;
    }
  };

  const saveCart = () => localStorage.setItem('emperialCart', JSON.stringify(cart));
  const saveHistory = () => localStorage.setItem('emperialHistory', JSON.stringify(history));

  const renderCheckoutSummary = () => {
    const summaryContainer = document.getElementById('checkout-summary-details');
    if (!summaryContainer) return;
    
    summaryContainer.innerHTML = `<p data-lang-key="checkout-summary-text">${translations[currentLanguage]['checkout-summary-text']}</p>`;
    cart.forEach(item => {
      summaryContainer.innerHTML += `<p>${item.quantity} x ${item.name} (${item.game})</p>`;
    });
    updateCheckoutTotal();
  };

  const updateCheckoutTotal = () => {
    const totalHTG = cart.reduce((sum, item) => sum + (item.priceHTG * item.quantity), 0);
    const rate = currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    const convertedTotal = (totalHTG * rate).toFixed(2);
    const checkoutTotalEl = document.getElementById('checkout-total-amount');
    if (checkoutTotalEl) {
        checkoutTotalEl.textContent = `${symbol} ${convertedTotal}`;
    }
  };
  
  const renderHistory = () => {
      const historyContainer = document.getElementById('history-items-container');
      const emptyHistoryMsg = document.getElementById('empty-history-message');
      if (!historyContainer || !emptyHistoryMsg) return;

      historyContainer.innerHTML = '';

      if (history.length === 0) {
          emptyHistoryMsg.style.display = 'block';
      } else {
          emptyHistoryMsg.style.display = 'none';
          [...history].reverse().forEach(order => {
              const orderElement = document.createElement('div');
              orderElement.classList.add('history-item');
              const orderDate = new Date(order.date).toLocaleString(currentLanguage);

              let itemsHtml = order.items.map(item =>
                  `<li>${item.quantity} x ${item.name} (${item.game})</li>`
              ).join('');

              orderElement.innerHTML = `
                  <div class="history-item-header">
                      <span class="order-date">${orderDate}</span>
                      <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
                  </div>
                  <div class="history-item-body">
                      <p><strong>ID de la commande:</strong> ${order.id}</p>
                      <ul>${itemsHtml}</ul>
                      <p class="history-total"><strong>Total:</strong> ${order.total.symbol} ${order.total.amount}</p>
                  </div>
              `;
              historyContainer.appendChild(orderElement);
          });
      }
  };

  const showToast = (message) => {
      const toast = document.createElement('div');
      toast.classList.add('toast');
      toast.textContent = message;
      toastContainer.appendChild(toast);

      setTimeout(() => {
          toast.remove();
      }, 4000);
  };
  
  const filterGames = (query) => {
    const gamesGridElements = document.querySelectorAll('#games-section .games-grid');
    gamesGridElements.forEach(grid => {
        const gameCardsInGrid = grid.querySelectorAll('.game-card');
        let anyCardVisible = false;
        gameCardsInGrid.forEach(card => {
            const gameName = card.querySelector('h3').textContent.toLowerCase();
            if (gameName.includes(query)) {
                card.style.display = 'block';
                anyCardVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        const categoryTitle = grid.previousElementSibling;
        if (categoryTitle && categoryTitle.classList.contains('category-title')) {
            categoryTitle.style.display = anyCardVisible ? 'block' : 'none';
        }
    });
  };

  // --- EVENT LISTENERS ---

  document.body.addEventListener('click', (e) => {
    const targetElement = e.target.closest('a.nav-link, .footer-container a, [data-target], .game-card, .start-button');
    
    if (!targetElement) return;

    let targetId = null;

    if (targetElement.matches('.game-card')) {
        targetId = `${targetElement.dataset.gameId}-offers-section`;
    } else if (targetElement.matches('.start-button')) {
        targetId = 'games-section';
    } else if (targetElement.dataset.target) {
        if(targetElement.matches('a')) e.preventDefault();
        targetId = targetElement.dataset.target;
    }

    if (targetId) {
        switchPage(targetId);
    }
  });

  backButtons.forEach(button => {
    if (button.id !== 'cancel-checkout-btn') {
      button.addEventListener('click', () => {
        if (navigationHistory.length > 1) {
          navigationHistory.pop();
          const previousPageId = navigationHistory[navigationHistory.length - 1];
          switchPage(previousPageId, true);
        }
      });
    }
  });

  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    localStorage.setItem('emperialCurrency', currentCurrency);
    updatePrices();
  });

  langSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('emperialLang', currentLanguage);
    updateLanguage();
    renderCart();
    renderHistory();
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const card = e.target.closest('.card');
      if (card) {
        addToCart(card);
        const itemName = card.dataset.itemName || "Article";
        const message = `✅ ${itemName} ${translations[currentLanguage]['added-to-cart']}`;
        showToast(message);
      }
    }
  });

  cartItemsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('quantity-btn')) {
      updateCartItem(target.dataset.id, target.dataset.action);
    }
    if (target.classList.contains('remove-item-btn')) {
      updateCartItem(target.dataset.id, 'remove');
    }
  });

  checkoutBtn.addEventListener('click', () => {
    switchPage('checkout-page');
    renderCheckoutSummary();
  });
  
  backToHomeBtn.addEventListener('click', () => {
      switchPage('welcome-section');
  });

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
  
  searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle('visible');
    if (searchContainer.classList.contains('visible')) {
      searchContainer.classList.remove('hidden');
      searchInput.focus();
    } else {
      searchInput.value = '';
      filterGames('');
      setTimeout(() => {
          searchContainer.classList.add('hidden');
      }, 300);
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterGames(query);
  });
  
  // Validation en temps réel avec debounce (pour éviter les rebonds)
  let validationTimeout;
  const debouncedValidate = (e) => {
    clearTimeout(validationTimeout);
    validationTimeout = setTimeout(() => {
      validateForm(e);
    }, 300); // 300ms de délai pour éviter les validations trop fréquentes
  };

  if (playerIdInput) {
    playerIdInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
      if (e.target.value.length > 20) {
        e.target.value = e.target.value.substring(0, 20);
      }
      debouncedValidate(e);
    });
  }

  if (customerEmailInput) {
    customerEmailInput.addEventListener('input', debouncedValidate);
  }

  if (customerPhoneInput) {
    customerPhoneInput.addEventListener('input', (e) => {
      let value = e.target.value;
      e.target.value = formatPhoneNumber(value);
      debouncedValidate(e);
    });
  }

  if (serverSelect) {
    serverSelect.addEventListener('change', debouncedValidate);
  }

  // Instructions de paiement dynamiques
  paymentMethodSelect.addEventListener('change', (e) => {
    moncashInstructions.classList.add('hidden');
    natcashInstructions.classList.add('hidden');
    cashAppInstructions.classList.add('hidden');
    debitCardInstructions.classList.add('hidden');

    if (e.target.value === 'MonCash') {
      moncashInstructions.innerHTML = `
        <p><strong>Instructions MonCash:</strong></p>
        <p>1. Envoyez le montant total à <strong>+509 3859 1452</strong></p>
       
      `;
      moncashInstructions.classList.remove('hidden');
    } else if (e.target.value === 'NatCash') {
      natcashInstructions.innerHTML = `
        <p><strong>Instructions NatCash:</strong></p>
        <p>1. Envoyez le montant total à <strong>+509 3391 6393</strong></p>
        
      `; 
      natcashInstructions.classList.remove('hidden');
    } else if (e.target.value === 'CashApp') {
      cashAppInstructions.innerHTML = `
        <p><strong>Instructions Cash App:</strong></p>
        <p>1. Envoyez le montant total à <strong>$EmperialTopUp</strong></p>
        
      `;
      cashAppInstructions.classList.remove('hidden');
    } else if (e.target.value === 'DebitCard') {
      debitCardInstructions.innerHTML = `
        <p><strong>Instructions Carte de Débit:</strong></p>
        <p>1. Cliquez sur le bouton "Payer par carte" ci-dessous</p>
        
      `;
      debitCardInstructions.classList.remove('hidden');
    }
  });

  // Annulation checkout
  if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener('click', () => {
      if (navigationHistory.length > 1) {
        navigationHistory.pop();
        saveNavigationHistory();
        switchPage(navigationHistory[navigationHistory.length - 1], true);
      }
    });
  }
  
  // Soumission du formulaire avec redirection WhatsApp
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation complète avant soumission
    if (!validateForm(e)) {
      return;
    }

    // --- Préparation des données ---
    const totalHTG = cart.reduce((sum, item) => sum + (item.priceHTG * item.quantity), 0);
    const rate = currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    const newOrderId = `ES-${Date.now()}`;
    const orderDateString = new Date().toLocaleString(currentLanguage);
    
    const orderTotal = {
      amount: (totalHTG * rate).toFixed(2),
      currency: currentCurrency,
      symbol: symbol
    };

    const customerInfo = {
      playerId: document.getElementById('player-id').value,
      playerName: document.getElementById('player-name').value || "Non précisé",
      server: document.getElementById('server-select').value,
      email: document.getElementById('customer-email').value,
      phone: document.getElementById('customer-phone').value,
      paymentMethod: document.getElementById('payment-method').value,
      additionalNotes: document.getElementById('additional-notes').value || "Aucune"
    };

    // --- Envoi WhatsApp ---
    const whatsappNumber = "50932306000";
    const encodedMsg = generateWhatsAppMessage(newOrderId, cart, orderTotal, customerInfo);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');

    // --- Sauvegarde Historique ---
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: [...cart], 
      total: orderTotal,
      status: 'En attente',
      customerInfo: customerInfo
    };
    history.push(newOrder);
    saveHistory();

    // --- Reset et Confirmation ---
    const tempCart = [...cart]; // Copie pour la page de confirmation
    cart = [];
    saveCart();
    checkoutForm.reset();
    renderCart();
    
    renderConfirmationPage(newOrderId, orderTotal, tempCart, orderDateString);
    navigationHistory.push('order-confirmation-section');
    saveNavigationHistory();
    switchPage('order-confirmation-section', true);
  });

  // --- INITIALIZATION ---
  const initialize = () => {
    langSelect.value = currentLanguage;
    currencySelect.value = currentCurrency;

    updateLanguage();
    updatePrices();
    renderCart();
    renderHistory();
    initScreenshotUpload();

    // Mettre à jour le pattern HTML pour l'ID du joueur
    if (playerIdInput) {
      playerIdInput.pattern = "[0-9]{6,20}";
      playerIdInput.title = "L'ID doit contenir entre 6 et 20 chiffres";
    }

    setTimeout(() => {
      const initialPage = navigationHistory[navigationHistory.length - 1] || 'welcome-section';
      switchPage(initialPage, true);
    }, 100);
  };

  initialize();
});