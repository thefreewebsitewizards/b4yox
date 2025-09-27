// Shared cart functionality for all pages
let cart = JSON.parse(localStorage.getItem('phantomCart') || '[]');
let cartTotal = 0;

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCartCount();
});

function toggleCart() {
    // If we're not on the shop page, redirect to shop page
    if (!window.location.pathname.includes('shop.html')) {
        window.location.href = 'shop.html';
        return;
    }
    
    // If we're on shop page, toggle the cart dropdown
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) {
        cartDropdown.classList.toggle('hidden');
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
    
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = totalItems;
            if (totalItems > 0) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    });
}

function addItemToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.title === item.title && cartItem.size === item.size
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('phantomCart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCartMessage = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return; // Not on shop page
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.classList.remove('hidden');
        if (cartSummary) cartSummary.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.classList.add('hidden');
    if (cartSummary) cartSummary.classList.remove('hidden');
    
    cartItemsContainer.innerHTML = '';
    cartTotal = 0;
    
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        cartTotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center space-x-3 p-3 bg-deepCharcoal/30 rounded';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-cover rounded">
            <div class="flex-1 min-w-0">
                <p class="text-brightWhite text-sm font-medium truncate">${item.title}</p>
                <p class="text-brightWhite/60 text-xs">Size: ${item.size}</p>
                <p class="text-neonPink text-xs">${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-brightWhite/60 hover:text-neonPink transition-colors duration-200">
                <i data-feather="x" class="w-4 h-4"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
    
    // Re-render feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('phantomCart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Save cart to localStorage for checkout page
    localStorage.setItem('phantomCart', JSON.stringify(cart));
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Listen for storage changes to sync cart across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'phantomCart') {
        cart = JSON.parse(e.newValue || '[]');
        updateCartDisplay();
        updateCartCount();
    }
});