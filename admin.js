// admin.js
const API_BASE = 'http://localhost:5000';

// ─── Auth Guard ───────────────────────────────────────────────────────────────
// Redirect to store if not logged in OR not an admin
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

if (!userInfo || !userInfo.token || !userInfo.isAdmin) {
    alert('Access denied. Admins only.');
    window.location.href = 'index.html';
}

const TOKEN = userInfo?.token;
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
};

// Show admin name in topbar
document.getElementById('admin-name').innerText = userInfo?.name || 'Admin';

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────
const navItems = document.querySelectorAll('.nav-item[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');
const topbarTitle = document.getElementById('topbar-title');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;

        // Update active nav
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // Show correct panel
        tabPanels.forEach(p => p.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active');

        // Update topbar title
        topbarTitle.innerText = tab.charAt(0).toUpperCase() + tab.slice(1);

        // Reload data for that tab
        if (tab === 'products') loadProducts();
        if (tab === 'orders')   loadOrders();
        if (tab === 'users')    loadUsers();
    });
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('userInfo');
    window.location.href = 'index.html';
});

// ─── Load Stats ───────────────────────────────────────────────────────────────
async function loadStats() {
    try {
        const [prodRes, orderRes, userRes] = await Promise.all([
            fetch(`${API_BASE}/api/products`, { headers: HEADERS }),
            fetch(`${API_BASE}/api/orders`, { headers: HEADERS }),
            fetch(`${API_BASE}/api/users`, { headers: HEADERS })
        ]);

        const products = await prodRes.json();
        const orders   = await orderRes.json();
        const users    = await userRes.json();

        document.getElementById('stat-products').innerText = products.length;
        document.getElementById('stat-orders').innerText   = orders.length;
        document.getElementById('stat-users').innerText    = users.length;

        const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
        document.getElementById('stat-revenue').innerText = `$${revenue.toFixed(2)}`;
    } catch (err) {
        console.error('Stats error:', err);
    }
}

// ═══════════════════════════════════════════════════════════
// ─── PRODUCTS ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
async function loadProducts() {
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = `<tr><td colspan="6" class="loading-row"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</td></tr>`;

    try {
        const res = await fetch(`${API_BASE}/api/products`);
        const products = await res.json();

        if (products.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="loading-row">No products found.</td></tr>`;
            return;
        }

        tbody.innerHTML = products.map(p => `
            <tr>
                <td><img class="table-img" src="${
                    p.image.startsWith('/') ? `${API_BASE}${p.image}` : p.image
                }" alt="${p.name}" onerror="this.src='https://via.placeholder.com/48'"></td>
                <td><strong>${p.name}</strong></td>
                <td>${p.category}</td>
                <td>$${p.price.toFixed(2)}</td>
                <td>
                    <span class="badge ${p.countInStock > 0 ? 'badge-instock' : 'badge-outstock'}">
                        ${p.countInStock > 0 ? `${p.countInStock} in stock` : 'Out of stock'}
                    </span>
                </td>
                <td>
                    <div class="action-btns">
                        <button class="btn-icon btn-edit" title="Edit" onclick="openEditProduct('${p._id}')">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon btn-delete" title="Delete" onclick="confirmDelete('product', '${p._id}', '${p.name.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" class="loading-row" style="color:red;">Failed to load products.</td></tr>`;
    }
}

// ─── Add Product Modal ─────────────────────────────────────
const productModalOverlay = document.getElementById('product-modal-overlay');
const productForm         = document.getElementById('product-form');

document.getElementById('open-add-product-btn').addEventListener('click', () => {
    document.getElementById('modal-title').innerText = 'Add Product';
    document.getElementById('save-product-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Add Product';
    productForm.reset();
    document.getElementById('product-id').value = '';
    productModalOverlay.classList.add('active');
});

document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
document.getElementById('cancel-product-modal').addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', (e) => {
    if (e.target === productModalOverlay) closeProductModal();
});

function closeProductModal() {
    productModalOverlay.classList.remove('active');
    productForm.reset();
}

// ─── Edit Product ──────────────────────────────────────────
window.openEditProduct = async function(productId) {
    try {
        const res = await fetch(`${API_BASE}/api/products/${productId}`);
        const p   = await res.json();

        document.getElementById('modal-title').innerText = 'Edit Product';
        document.getElementById('save-product-btn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Changes';
        document.getElementById('product-id').value          = p._id;
        document.getElementById('product-name').value        = p.name;
        document.getElementById('product-category').value    = p.category;
        document.getElementById('product-price').value       = p.price;
        document.getElementById('product-stock').value       = p.countInStock;
        document.getElementById('product-image').value       = p.image;
        document.getElementById('product-description').value = p.description;

        productModalOverlay.classList.add('active');
    } catch (err) {
        showToast('Failed to load product details.', 'error');
    }
};

// ─── Save Product (Add or Edit) ────────────────────────────
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const body = {
        name:         document.getElementById('product-name').value.trim(),
        category:     document.getElementById('product-category').value.trim(),
        price:        parseFloat(document.getElementById('product-price').value),
        countInStock: parseInt(document.getElementById('product-stock').value),
        image:        document.getElementById('product-image').value.trim(),
        description:  document.getElementById('product-description').value.trim()
    };

    const isEdit = id !== '';
    const url    = isEdit ? `${API_BASE}/api/products/${id}` : `${API_BASE}/api/products`;
    const method = isEdit ? 'PUT' : 'POST';

    const saveBtn = document.getElementById('save-product-btn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    try {
        const res = await fetch(url, { method, headers: HEADERS, body: JSON.stringify(body) });
        const data = await res.json();

        if (res.ok) {
            showToast(isEdit ? '✅ Product updated!' : '✅ Product added!');
            closeProductModal();
            loadProducts();
            loadStats();
        } else {
            showToast(data.message || 'Error saving product.', 'error');
        }
    } catch (err) {
        showToast('Network error.', 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Product';
    }
});

// ═══════════════════════════════════════════════════════════
// ─── ORDERS ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
async function loadOrders() {
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = `<tr><td colspan="7" class="loading-row"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</td></tr>`;

    try {
        const res    = await fetch(`${API_BASE}/api/orders`, { headers: HEADERS });
        const orders = await res.json();

        if (!Array.isArray(orders) || orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="loading-row">No orders yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = orders.map(o => {
            const date     = new Date(o.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
            const customer = o.user ? (o.user.name || o.user.email || 'Unknown') : 'Unknown';
            const itemCount = o.orderItems.reduce((sum, i) => sum + i.qty, 0);

            return `
                <tr>
                    <td><code style="font-size:0.75rem; color:#64748b;">${o._id.slice(-8).toUpperCase()}</code></td>
                    <td>${customer}</td>
                    <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
                    <td><strong>$${o.totalPrice.toFixed(2)}</strong></td>
                    <td>${date}</td>
                    <td>
                        <span class="badge ${o.isPaid ? 'badge-paid' : 'badge-unpaid'}">
                            ${o.isPaid ? '✅ Paid' : '⏳ Pending'}
                        </span>
                    </td>
                    <td>
                        <div class="action-btns">
                            ${!o.isPaid ? `
                                <button class="btn-icon btn-pay" title="Mark as Paid" onclick="markOrderPaid('${o._id}')">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                            ` : `<span style="color:#94a3b8; font-size:0.8rem;">—</span>`}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="7" class="loading-row" style="color:red;">Failed to load orders.</td></tr>`;
    }
}

window.markOrderPaid = async function(orderId) {
    try {
        const res = await fetch(`${API_BASE}/api/orders/${orderId}/pay`, {
            method: 'PUT',
            headers: HEADERS
        });

        if (res.ok) {
            showToast('✅ Order marked as paid!');
            loadOrders();
            loadStats();
        } else {
            const data = await res.json();
            showToast(data.message || 'Failed to update order.', 'error');
        }
    } catch (err) {
        showToast('Network error.', 'error');
    }
};

// ═══════════════════════════════════════════════════════════
// ─── USERS ────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
async function loadUsers() {
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = `<tr><td colspan="6" class="loading-row"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</td></tr>`;

    try {
        const res   = await fetch(`${API_BASE}/api/users`, { headers: HEADERS });
        const users = await res.json();

        if (!Array.isArray(users) || users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="loading-row">No users found.</td></tr>`;
            return;
        }

        tbody.innerHTML = users.map(u => {
            const initial = u.name.charAt(0).toUpperCase();
            const date    = new Date(u.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });

            return `
                <tr>
                    <td>
                        <div class="user-avatar" style="${u.isAdmin ? 'background:#7c3aed;' : ''}">
                            ${initial}
                        </div>
                    </td>
                    <td><strong>${u.name}</strong></td>
                    <td>${u.email}</td>
                    <td>
                        <span class="badge ${u.isAdmin ? 'badge-admin' : 'badge-user'}">
                            ${u.isAdmin ? '🛡 Admin' : '👤 User'}
                        </span>
                    </td>
                    <td>${date}</td>
                    <td>
                        <div class="action-btns">
                            ${u._id !== userInfo._id ? `
                                <button class="btn-icon btn-delete" title="Delete User"
                                    onclick="confirmDelete('user', '${u._id}', '${u.name.replace(/'/g, "\\'")}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            ` : `<span style="color:#94a3b8; font-size:0.8rem;">You</span>`}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" class="loading-row" style="color:red;">Failed to load users.</td></tr>`;
    }
}

// ═══════════════════════════════════════════════════════════
// ─── CONFIRM DELETE MODAL ─────────────────────────────────
// ═══════════════════════════════════════════════════════════
const confirmOverlay   = document.getElementById('confirm-modal-overlay');
const confirmMessage   = document.getElementById('confirm-message');
const confirmActionBtn = document.getElementById('confirm-action-btn');

let pendingDeleteAction = null;

window.confirmDelete = function(type, id, name) {
    confirmMessage.innerHTML = `Are you sure you want to delete <strong>${name}</strong>? This cannot be undone.`;
    confirmOverlay.classList.add('active');

    // Store the action to run on confirm
    pendingDeleteAction = async () => {
        const url    = type === 'product' ? `${API_BASE}/api/products/${id}` : `${API_BASE}/api/users/${id}`;
        const method = 'DELETE';

        try {
            const res = await fetch(url, { method, headers: HEADERS });
            if (res.ok) {
                showToast(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} deleted.`);
                if (type === 'product') { loadProducts(); }
                if (type === 'user')    { loadUsers(); }
                loadStats();
            } else {
                const data = await res.json();
                showToast(data.message || 'Delete failed.', 'error');
            }
        } catch (err) {
            showToast('Network error.', 'error');
        }
        closeConfirmModal();
    };
};

confirmActionBtn.addEventListener('click', () => {
    if (pendingDeleteAction) pendingDeleteAction();
});

document.getElementById('cancel-confirm').addEventListener('click', closeConfirmModal);
document.getElementById('close-confirm-modal').addEventListener('click', closeConfirmModal);
confirmOverlay.addEventListener('click', (e) => {
    if (e.target === confirmOverlay) closeConfirmModal();
});

function closeConfirmModal() {
    confirmOverlay.classList.remove('active');
    pendingDeleteAction = null;
}

// ─── Init ──────────────────────────────────────────────────
loadStats();
loadProducts(); // Default tab
