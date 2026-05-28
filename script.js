// script.js

// 1. 40 Completely Unique Products with Perfectly Matched Images

let products = []; // Start empty

// Fetch products from the database on page load
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        products = await response.json();
        
        // Ensure properties map correctly if DB names differ from frontend
        products = products.map(p => ({
            id: p._id, // MongoDB uses _id
            name: p.name,
            price: p.price,
            image: p.imageUrl || p.image, 
            description: p.description
        }));
        
        renderProducts(products); // Your existing render function
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Call this when the script loads
fetchProducts();

// 4. DOM Elements
const productContainer = document.getElementById('product-container');
const searchBar = document.getElementById('search-bar');
const sortDropdown = document.getElementById('sort-dropdown');

// Cart DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');

// 13. Authentication Modal Logic
const openAuthBtn = document.getElementById('open-auth-btn');
const closeAuthBtn = document.getElementById('close-auth');
const authOverlay = document.getElementById('auth-overlay');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');

// Mock Database for Comments (Keyed by Product ID)
let productComments = {
    // We will populate this dynamically when a user adds a comment
};

// Helper function to generate a fake initial comment for display
function getCommentsForProduct(productId) {
    if (!productComments[productId]) {
        // Give every product at least one default positive review
        productComments[productId] = [
            {
                author: "Sarah Jenkins",
                date: "2 days ago",
                text: "Absolutely stunning quality. The minimalist design fits perfectly in my setup. Highly recommend this for anyone upgrading their workspace!"
            }
        ];
    }
    return productComments[productId];
}
// Open/Close Modal
openAuthBtn.addEventListener('click', () => {
    authOverlay.classList.add('active');
});

closeAuthBtn.addEventListener('click', () => {
    authOverlay.classList.remove('active');
});

authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) authOverlay.classList.remove('active');
});

// Switch between Login and Register tabs
window.switchAuthTab = function(tab) {
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
};

// Prevent default form submission (Preparing for backend fetch)
// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Login Successful!');
            authOverlay.classList.remove('active'); // Close modal
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error(error);
    }
});

// Register Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[placeholder="Full Name"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    try {
        const res = await fetch('http://localhost:5000/api/users', { // Assuming POST /api/users registers
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Registration Successful!');
            authOverlay.classList.remove('active'); // Close modal
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error(error);
    }
});
const checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click', async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo || !userInfo.token) {
        alert("Please sign in to place an order.");
        authOverlay.classList.add('active'); // Open auth modal
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Format cart to match the Mongoose Order schema
    const orderItems = cart.map(item => ({
        product: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity
    }));

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    try {
        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}` // Send the JWT token
            },
            body: JSON.stringify({ orderItems, totalPrice })
        });

        if (res.ok) {
            alert('Order placed successfully!');
            cart = []; // Clear local cart
            updateCartUI();
            closeCart();
        } else {
            const data = await res.json();
            alert(data.message || 'Failed to place order');
        }
    } catch (error) {
        console.error("Checkout error:", error);
    }
});
// Cart State Array
let cart = [];

// 5. Render Products (UPDATED to pass Product ID)
function renderProducts(productsToRender) {
    productContainer.innerHTML = ""; 

    if (productsToRender.length === 0) {
        productContainer.innerHTML = "<p>No products found matching your search.</p>";
        return;
    }

productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card glass-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" onclick="viewProduct(${product.id})" style="cursor: pointer;">
            <div class="product-info">
                <h3 onclick="viewProduct(${product.id})" style="cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='#007a68'" onmouseout="this.style.color='#1d1d1f'">${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="btn-primary add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// 6. Add to Cart Logic (UPDATED)
window.addToCart = function(productId) {
    // Find the product in our main array
    const productToAdd = products.find(p => p.id === productId);
    
    // Check if it's already in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already there
    } else {
        // Add new item with quantity 1
        cart.push({ ...productToAdd, quantity: 1 });
    }

    updateCartUI();
    
    // Open the cart automatically so the user sees what they added
    openCart();
};

// 7. Remove from Cart Logic
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

// 8. Update Cart UI and Total Price
function updateCartUI() {
    // Update the little red bubble counter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
    
    // Visual pop animation
    cartCountElement.style.transform = "scale(1.3)";
    setTimeout(() => cartCountElement.style.transform = "scale(1)", 200);

    // Update Sidebar HTML
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        cartTotalPrice.innerText = "$0.00";
        return;
    }

    let totalCost = 0;

    cart.forEach(item => {
        totalCost += (parseFloat(item.price) * item.quantity);
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price} <span style="color:#86868b; font-size: 0.85rem;">x${item.quantity}</span></div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Update Total Price Text
    cartTotalPrice.innerText = `$${totalCost.toFixed(2)}`;
}

// 9. Sidebar Open/Close Logic
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
}

cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart); // Close when clicking the dark background

// 10. Search and Sort (Unchanged from before)
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchString));
    renderProducts(filteredProducts);
});

sortDropdown.addEventListener('change', (e) => {
    const sortType = e.target.value;
    let sortedProducts = [...products]; 
    if (sortType === 'name-asc') sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === 'newest') sortedProducts.sort((a, b) => b.dateAdded - a.dateAdded);
    else if (sortType === 'price-low') sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortType === 'price-high') sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    renderProducts(sortedProducts);
});

// 11. Initial Render on Page Load
renderProducts(products);
// 12. View Navigation Logic (Single Page App Routing)
const heroSection = document.querySelector('.hero');
const productSection = document.getElementById('products');
const detailView = document.getElementById('product-detail-view');
const detailContent = document.getElementById('detail-content');

window.viewProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Hide main view, show detail view
    heroSection.style.display = 'none';
    productSection.style.display = 'none';
    detailView.style.display = 'block';

    // Scroll smoothly to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inject the specific product data into the detail view
    detailContent.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
            <h2 class="detail-title">${product.name}</h2>
            <p class="detail-price">$${product.price}</p>
            <p class="detail-desc">Experience the premium quality of the ${product.name}. Designed with ultra-minimalist aesthetics and engineered for peak performance. Elevate your workspace and discover a new standard of modern technology.</p>
            
            <button class="btn-primary" style="width: 100%; padding: 18px; font-size: 1.2rem; margin-top: auto;" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    document.getElementById('new-comment-form').dataset.currentProductId = product.id;

    // Render the comments for this specific product
    renderComments(product.id);
};
const commentsList = document.getElementById('comments-list');
const reviewCount = document.getElementById('review-count');
const commentForm = document.getElementById('new-comment-form');
const commentInput = document.getElementById('comment-input');

function renderComments(productId) {
    const comments = getCommentsForProduct(productId);
    commentsList.innerHTML = "";
    
    reviewCount.innerText = `${comments.length} Review${comments.length !== 1 ? 's' : ''}`;

    if (comments.length === 0) {
        commentsList.innerHTML = "<p style='color: #86868b;'>No reviews yet. Be the first to share your thoughts!</p>";
        return;
    }

    // Reverse the array so newest comments appear at the top
    [...comments].reverse().forEach(comment => {
        const initial = comment.author.charAt(0).toUpperCase();
        
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-card';
        commentDiv.innerHTML = `
            <div class="comment-avatar">${initial}</div>
            <div class="comment-content">
                <div class="comment-top">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Handle posting a new comment
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page from refreshing
    
    const text = commentInput.value.trim();
    if (!text) return;

    // Get the ID of the product we are currently viewing
    const productId = e.target.dataset.currentProductId;

    // Simulate checking if the user is logged in
    // For now, we will just use a hardcoded "Guest User" or your name
    const newComment = {
        author: "Moataz (You)",
        date: "Just now",
        text: text
    };

    // Add to our mock database
    productComments[productId].push(newComment);

    // Re-render the comment section and clear the input field
    renderComments(productId);
    commentInput.value = "";
});

window.goBack = function() {
    // Hide detail view, show main view
    heroSection.style.display = 'flex'; // Hero uses flexbox
    productSection.style.display = 'block';
    detailView.style.display = 'none';
};