// Mock Data for Cart
const cart = [];

// Open Cart
document.getElementById('cart-icon').addEventListener('click', () => {
    document.getElementById('cart-section').classList.add('cart-visible');
    renderCart();
});

// Close Cart
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-section').classList.remove('cart-visible');
});

// Add to Cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('h2').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('Rs. ', ''));
        const image = productCard.querySelector('img').src;

        addToCart({ name, price, image });
    });
});

// Add Item to Cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        // If the product is already in the cart, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Add the product to the cart with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    let subtotal = 0;

    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Price: Rs. ${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button onclick="updateQuantity('${item.name}', 'decrease')">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity('${item.name}', 'increase')">+</button>
                </p>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
}

// Remove Item from Cart
function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

// Update Quantity
function updateQuantity(name, action) {
    const product = cart.find(item => item.name === name);

    if (action === 'increase') {
        product.quantity += 1;
    } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity -= 1;
    } else if (action === 'decrease' && product.quantity === 1) {
        // Remove the product if the quantity is 0
        removeFromCart(name);
        return;
    }

    renderCart();
}
