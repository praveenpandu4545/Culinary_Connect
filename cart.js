// Function to add items to cart
function addToCart(recipeName, recipeImage, recipePrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const recipe = {
        name: recipeName,
        image: recipeImage,
        price: parseFloat(recipePrice) // Ensure price is a number
    };
    cart.push(recipe);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${recipeName} has been added to your cart!`);
    displayCart(); // Update cart after adding an item
}

// Attach event listeners to all add-to-cart buttons
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const recipeName = this.getAttribute('data-name');
            const recipeImage = this.getAttribute('data-image');
            const recipePrice = this.getAttribute('data-price');
            addToCart(recipeName, recipeImage, recipePrice);
        });
    });

    // Display cart items on page load
    displayCart();

    // Place order button event
    const placeOrderButton = document.getElementById('place-order-button');
    placeOrderButton.addEventListener('click', handlePlaceOrder);
});

// Function to display cart items in the cart.html page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Clear the cart container
    cartItemsContainer.innerHTML = '';

    // Check if the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Display each item in the cart
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Price: ₹${item.price}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Display total price
    displayTotalPrice(cart);

    // Attach event listeners to each delete button
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteFromCart(index);
        });
    });
}

// Function to display total price
function displayTotalPrice(cart) {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPriceElement = document.createElement('p');
    totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
    document.getElementById('cart-items').appendChild(totalPriceElement);

    // Update total in payment section
    document.getElementById('total-display').textContent = totalPrice;
}

// Function to delete a specific item from the cart
function deleteFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to clear the entire cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Handle Place Order
function handlePlaceOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Show the payment section
    document.getElementById('payment-section').style.display = 'block';

    // Generate UPI payment QR code
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const upiPaymentUrl = `upi://pay?pa=7989692831-2@ibl&pn=Culinary Connect&am=${total}&cu=INR`;
    
    const qrCodeElement = document.getElementById('qr-code');
    qrCodeElement.innerHTML = ''; // Clear previous QR code if any
    new QRCode(qrCodeElement, {
        text: upiPaymentUrl,
        width: 200,
        height: 200
    });
}
