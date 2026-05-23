// script.js

// 1. 40 Completely Unique Products with Perfectly Matched Images

const products = [
 { id: 1, name: "Obsidian Mechanical Keyboard", price: 129.99, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop" },
  { id: 2, name: "Ergonomic Wireless Mouse", price: 79.99, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop" },
  { id: 3, name: "UltraWide Curved Monitor", price: 599.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop" },
  { id: 4, name: "Noise-Canceling Headphones", price: 249.99, image: "images/casquo.webp" },
  { id: 5, name: "True Wireless Earbuds", price: 149.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop" },
  { id: 6, name: "Horizon Smartwatch", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop" },
{ id: 7, name: "Carbon Fiber Desk Mat", price: 39.99, image: "images/carbonDesk.webp" },  { id: 8, name: "Lumina Desk Lamp", price: 59.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop" },
  { id: 9, name: "Aluminum Laptop Stand", price: 49.99, image: "images/laptopStand.webp" },
{ id: 10, name: "HD Streaming Webcam", price: 89.99, image: "images/webcam.jpg" }, {
    id: 11,
    name: "Studio Condenser Microphone",
    price: 119.99,
    image: "images/micro.avif"
  },
  {
    id: 12,
    name: "Ambient Smart Speaker",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=800&fit=crop"
  },
  {
    id: 13,
    name: "Magnetic Wireless Charger",
    price: 34.99,
    image: "images/wirelessCharger.jpg"
  },
  {
    id: 14,
    name: "Portable SSD 1TB",
    price: 109.99,
    image: "images/disk.jpg"
  },
  {
    id: 15,
    name: "USB-C Docking Station",
    price: 89.99,
    image: "images/usbc.jpg"
  },
  {
    id: 16,
    name: "Premium Office Chair",
    price: 349.99,
    image: "images/chair.webp"
  },
  {
    id: 17,
    name: "Adjustable Standing Desk",
    price: 449.99,
    image: "images/desk.webp"
  },
  {
    id: 18,
    name: "Dual Monitor Arm",
    price: 69.99,
    image: "images/duel.webp"
  },
  {
    id: 19,
    name: "Immersive VR Headset",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=800&fit=crop"
  },
  {
    id: 20,
    name: "Pro Gaming Controller",
    price: 69.99,
    image: "images/magnette.avif"
  },
  {
    id: 21,
    name: "Precision Tablet Stylus",
    price: 99.99,
    image: "images/stylo.jpg"
  },
  {
    id: 22,
    name: "Digital E-Reader",
    price: 129.99,
    image: "images/book.jpg"
  },
  {
    id: 23,
    name: "4K Action Camera",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop"
  },
  {
    id: 24,
    name: "Quadcopter Drone",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop"
  },
  {
    id: 25,
    name: "Smartphone Gimbal",
    price: 119.99,
    image: "images/gimbal.jpg"
  },
  {
    id: 26,
    name: "LED Ring Light",
    price: 45.99,
    image: "images/light.webp"
  },
  {
    id: 27,
    name: "Wireless Numpad",
    price: 39.99,
    image: "images/clavier.jpg"
  },
  {
    id: 28,
    name: "Under-Desk Cable Tray",
    price: 24.99,
    image: "images/under.jpg"
  },
  {
    id: 29,
    name: "Aluminum Headphone Stand",
    price: 29.99,
    image: "images/casque.jpg"
  },
  {
    id: 30,
    name: "Acoustic Wall Panels",
    price: 59.99,
    image: "images/wall.webp"
  },
  {
    id: 31,
    name: "Blue Light Blocking Glasses",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop"
  },
  {
    id: 32,
    name: "Smart Thermostat Mug",
    price: 99.99,
    image: "images/smart.jpg"
  },
  {
    id: 33,
    name: "Portable 15-inch Monitor",
    price: 179.99,
    image: "images/monitor.webp"
  },
  {
    id: 34,
    name: "Mesh Wi-Fi Router",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=800&fit=crop"
  },
  {
    id: 35,
    name: "Home NAS Server",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop"
  },
  {
    id: 36,
    name: "Smart Home Plug",
    price: 14.99,
    image: "images/plug.jpg"
  },
  {
    id: 37,
    name: "RGB LED Light Strip",
    price: 29.99,
    image: "images/rgb.avif"
  },
  {
    id: 38,
    name: "Desktop 3D Printer",
    price: 399.99,
    image: "images/3d.jpg"
  },
  {
    id: 39,
    name: "20,000mAh Power Bank",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop"
  },
  {
    id: 40,
    name: "Bluetooth Item Tracker",
    price: 29.99,
    image: "images/item.jpg"
  }
];

// Add a simulated date to each product so the "Newest" sort filter works
products.forEach(product => {
    product.dateAdded = Date.now() - Math.floor(Math.random() * 5000000000);
});

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
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Login form submitted. Ready for Express connection.");
    // Temporarily close modal to simulate success
    authOverlay.classList.remove('active'); 
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Register form submitted. Ready for Express connection.");
    // Temporarily close modal to simulate success
    authOverlay.classList.remove('active');
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