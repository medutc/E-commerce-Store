
// script.js

const API_BASE = 'http://localhost:5000';

let products = [];
// ─── My Orders ────────────────────────────────────────────────────────────────
const ordersSidebar = document.getElementById('orders-sidebar');
const ordersOverlay = document.getElementById('orders-overlay');
const ordersListEl  = document.getElementById('orders-list');
const closeOrdersBtn = document.getElementById('close-orders-btn');

function openOrdersSidebar() {
  ordersSidebar.classList.add('open');
  ordersOverlay.classList.add('active');
  loadMyOrders();
}

function closeOrdersSidebar() {
  ordersSidebar.classList.remove('open');
  ordersOverlay.classList.remove('active');
}

closeOrdersBtn.addEventListener('click', closeOrdersSidebar);
ordersOverlay.addEventListener('click', closeOrdersSidebar);

// Clicking the username in the navbar opens "My Orders"
document.getElementById('user-name-display').addEventListener('click', () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) openOrdersSidebar();
});

async function loadMyOrders() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) return;

  ordersListEl.innerHTML = '<p class="empty-orders-msg">Loading your orders...</p>';

  try {
    const res = await fetch(`${API_BASE}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    const orders = await res.json();

    if (!orders.length) {
      ordersListEl.innerHTML = '<p class="empty-orders-msg">You have no orders yet.</p>';
      return;
    }

    ordersListEl.innerHTML = '';
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      const statusClass = order.isPaid ? 'status-paid' : 'status-pending';
      const statusText  = order.isPaid ? '✅ Paid' : '⏳ Pending';

      const itemsHTML = order.orderItems.map(item => `
        <div class="order-item-row">
          <span>${item.name} × ${item.qty}</span>
          <span>$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `).join('');

      const card = document.createElement('div');
      card.className = 'order-card';
      card.innerHTML = `
        <div class="order-card-header">
          <div>
            <div class="order-id">Order #${order._id.slice(-8).toUpperCase()}</div>
            <div class="order-date">${date}</div>
          </div>
          <span class="order-status ${statusClass}">${statusText}</span>
        </div>
        <div class="order-items-preview">${itemsHTML}</div>
        <div class="order-total">
          <span>Total</span>
          <span>$${order.totalPrice.toFixed(2)}</span>
        </div>
      `;
      ordersListEl.appendChild(card);
    });
  } catch (err) {
    ordersListEl.innerHTML = '<p class="empty-orders-msg">Failed to load orders.</p>';
    console.error(err);
  }
}
// ─── Fetch Products from DB ───────────────────────────────────────────────────
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE}/api/products`);
        const data = await response.json();

        products = data.map(p => ({
            id: p._id,       // ✅ MongoDB _id stored as string
            name: p.name,
            price: p.price,
            image: p.image.startsWith('/') ? `${API_BASE}${p.image}` : p.image,
            description: p.description,
            category: p.category,
            countInStock: p.countInStock
        }));

        renderProducts(products);
        buildCategoryFilter(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = '<p style="color:red;">Could not load products. Make sure the server is running.</p>';
    }
}

fetchProducts();

// ─── DOM Elements ─────────────────────────────────────────────────────────────
const productContainer = document.getElementById('product-container');
const searchBar = document.getElementById('search-bar');
const sortDropdown = document.getElementById('sort-dropdown');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const openAuthBtn = document.getElementById('open-auth-btn');
const closeAuthBtn = document.getElementById('close-auth');
const authOverlay = document.getElementById('auth-overlay');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const userNameDisplay = document.getElementById('user-name-display');

// ─── Category Filter ──────────────────────────────────────────────────────────
function buildCategoryFilter(allProducts) {
    const filterContainer = document.getElementById('category-filter');
    if (!filterContainer) return;

    const categories = ['All', ...new Set(allProducts.map(p => p.category))];

    filterContainer.innerHTML = categories.map(cat =>
        `<button class="cat-btn ${cat === 'All' ? 'active' : ''}" onclick="filterByCategory('${cat}')">${cat}</button>`
    ).join('');
}

window.filterByCategory = function(category) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === category);
    });

    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
};

// ─── Comments (in-memory) ─────────────────────────────────────────────────────
let productComments = {};

function getCommentsForProduct(productId) {
    if (!productComments[productId]) {
        productComments[productId] = [
            {
                author: "Sarah Jenkins",
                date: "2 days ago",
                text: "Absolutely stunning quality! Highly recommend for anyone upgrading their workspace."
            }
        ];
    }
    return productComments[productId];
}

// ─── Auth UI State ─────────────────────────────────────────────────────────────
function updateAuthUI() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
        // Show user name and logout button
        if (userNameDisplay) {
            userNameDisplay.innerText = `Hi, ${userInfo.name.split(' ')[0]}`;
            userNameDisplay.style.display = 'block';
        }
        if (openAuthBtn) openAuthBtn.style.display = 'none';
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (userNameDisplay) userNameDisplay.style.display = 'none';
        if (openAuthBtn) openAuthBtn.style.display = 'flex';
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
    const adminLink = document.getElementById('admin-nav-link');
if (adminLink) {
    adminLink.style.display = (userInfo && userInfo.isAdmin) ? 'block' : 'none';
}
}

document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('userInfo');
    updateAuthUI();
    alert('You have been logged out.');
});

// Run on load
updateAuthUI();

// ─── Auth Modal ───────────────────────────────────────────────────────────────
openAuthBtn.addEventListener('click', () => authOverlay.classList.add('active'));
closeAuthBtn.addEventListener('click', () => authOverlay.classList.remove('active'));
authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) authOverlay.classList.remove('active');
});

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

// ─── Login ────────────────────────────────────────────────────────────────────
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const res = await fetch(`${API_BASE}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert(`Welcome back, ${data.name}!`);
            authOverlay.classList.remove('active');
            updateAuthUI();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error(error);
        alert('Network error — is the server running?');
    }
});

// ─── Register ─────────────────────────────────────────────────────────────────
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[placeholder="Full Name"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    try {
        // ✅ Fixed: correct endpoint is /api/users/register
        const res = await fetch(`${API_BASE}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert(`Account created! Welcome, ${data.name}!`);
            authOverlay.classList.remove('active');
            updateAuthUI();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error(error);
        alert('Network error — is the server running?');
    }
});

// ─── Cart ─────────────────────────────────────────────────────────────────────
let cart = [];

// ─── Render Products ──────────────────────────────────────────────────────────
function renderProducts(productsToRender) {
    productContainer.innerHTML = "";

    if (productsToRender.length === 0) {
        productContainer.innerHTML = "<p style='color:#86868b; text-align:center; padding: 2rem;'>No products found.</p>";
        return;
    }

    productsToRender.forEach(product => {
        const inStock = product.countInStock > 0;
        const card = document.createElement('div');
        card.className = 'product-card glass-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy"
                 onclick="viewProduct('${product.id}')" style="cursor: pointer;">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 onclick="viewProduct('${product.id}')"
                    style="cursor: pointer; transition: color 0.2s;"
                    onmouseover="this.style.color='#007a68'"
                    onmouseout="this.style.color='#1d1d1f'">${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                ${inStock
                    ? `<button class="btn-primary add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>`
                    : `<button class="btn-primary" disabled style="opacity:0.5;cursor:not-allowed;">Out of Stock</button>`
                }
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// ─── Add to Cart ──────────────────────────────────────────────────────────────
// ✅ Fixed: product.id is a string — use string comparison
window.addToCart = function(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) return;

    if (productToAdd.countInStock === 0) {
        alert('Sorry, this product is out of stock.');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }

    updateCartUI();
    openCart();
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
    cartCountElement.style.transform = "scale(1.3)";
    setTimeout(() => cartCountElement.style.transform = "scale(1)", 200);

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        cartTotalPrice.innerText = "$0.00";
        return;
    }

    let totalCost = 0;
    cart.forEach(item => {
        totalCost += parseFloat(item.price) * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}
                    <span style="color:#86868b; font-size: 0.85rem;">x${item.quantity}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartTotalPrice.innerText = `$${totalCost.toFixed(2)}`;
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
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
cartOverlay.addEventListener('click', closeCart);

// ─── Checkout ─────────────────────────────────────────────────────────────────
document.querySelector('.checkout-btn').addEventListener('click', async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
        alert("Please sign in to place an order.");
        authOverlay.classList.add('active');
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderItems = cart.map(item => ({
        product: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity
    }));

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
        const res = await fetch(`${API_BASE}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ orderItems, totalPrice })
        });

        if (res.ok) {
            alert('🎉 Order placed successfully! Thank you for your purchase.');
            cart = [];
            updateCartUI();
            closeCart();
        } else {
            const data = await res.json();
            alert(data.message || 'Failed to place order');
        }
    } catch (error) {
        console.error("Checkout error:", error);
        alert('Network error during checkout.');
    }
});

// ─── Search & Sort ────────────────────────────────────────────────────────────
searchBar.addEventListener('keyup', (e) => {
    const q = e.target.value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(q)));
});

sortDropdown.addEventListener('change', (e) => {
    const sortType = e.target.value;
    let sorted = [...products];
    if (sortType === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === 'price-low') sorted.sort((a, b) => a.price - b.price);
    else if (sortType === 'price-high') sorted.sort((a, b) => b.price - a.price);
    else if (sortType === 'newest') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    renderProducts(sorted);
});

// ─── Product Detail View ──────────────────────────────────────────────────────
const heroSection = document.querySelector('.hero');
const productSection = document.getElementById('products');
const detailView = document.getElementById('product-detail-view');
const detailContent = document.getElementById('detail-content');

window.viewProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    heroSection.style.display = 'none';
    productSection.style.display = 'none';
    detailView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const inStock = product.countInStock > 0;

    // ✅ Fixed: shows real product.description, not hardcoded text
    detailContent.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
            <span class="product-category">${product.category}</span>
            <h2 class="detail-title">${product.name}</h2>
            <p class="detail-price">$${product.price.toFixed(2)}</p>
            <p class="detail-desc">${product.description}</p>
            <p style="color: ${inStock ? '#007a68' : 'red'}; font-weight: 600; margin-bottom: 1rem;">
                ${inStock ? `✅ In Stock (${product.countInStock} available)` : '❌ Out of Stock'}
            </p>
            ${inStock
                ? `<button class="btn-primary" style="width:100%;padding:18px;font-size:1.2rem;"
                     onclick="addToCart('${product.id}')">Add to Cart</button>`
                : `<button class="btn-primary" disabled style="width:100%;padding:18px;font-size:1.2rem;opacity:0.5;cursor:not-allowed;">Out of Stock</button>`
            }
        </div>
    `;

    document.getElementById('new-comment-form').dataset.currentProductId = productId;
    renderComments(productId);
};

// ─── Comments ─────────────────────────────────────────────────────────────────
const commentsList = document.getElementById('comments-list');
const reviewCount = document.getElementById('review-count');
const commentForm = document.getElementById('new-comment-form');
const commentInput = document.getElementById('comment-input');

function renderComments(productId) {
    const comments = getCommentsForProduct(productId);
    commentsList.innerHTML = "";
    reviewCount.innerText = `${comments.length} Review${comments.length !== 1 ? 's' : ''}`;

    if (comments.length === 0) {
        commentsList.innerHTML = "<p style='color:#86868b;'>No reviews yet. Be the first!</p>";
        return;
    }

    [...comments].reverse().forEach(comment => {
        const initial = comment.author.charAt(0).toUpperCase();
        const div = document.createElement('div');
        div.className = 'comment-card';
        div.innerHTML = `
            <div class="comment-avatar">${initial}</div>
            <div class="comment-content">
                <div class="comment-top">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        `;
        commentsList.appendChild(div);
    });
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
        alert('Please sign in to leave a review.');
        authOverlay.classList.add('active');
        return;
    }

    const text = commentInput.value.trim();
    if (!text) return;

    const productId = e.target.dataset.currentProductId;
    productComments[productId].push({
        author: userInfo.name,
        date: 'Just now',
        text
    });

    renderComments(productId);
    commentInput.value = "";
});

window.goBack = function() {
    heroSection.style.display = 'flex';
    productSection.style.display = 'block';
    detailView.style.display = 'none';
};
