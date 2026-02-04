/* ═══════════════════════════════════════════════════════════════════
   TOCC Invoice Manager — Main Application
   ═══════════════════════════════════════════════════════════════════ */

// ─── Firebase Configuration ──────────────────────────────────────
// IMPORTANT: Replace these values with your Firebase project config.
// Go to Firebase Console → Project Settings → Your Apps → Web App → Config
const firebaseConfig = {
    apiKey: "AIzaSyAvptNf7O1LLNUeiQ9Xi62OyZKySCB0x3w",
    authDomain: "tocc-vendor-invoices.firebaseapp.com",
    projectId: "tocc-vendor-invoices",
    storageBucket: "tocc-vendor-invoices.firebasestorage.app",
    messagingSenderId: "116647012535",
    appId: "1:116647012535:web:e6a6882164417290770532"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ─── SVG Icons ───────────────────────────────────────────────────
const ICO = {
    save: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    download: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    share: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    vendor: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    client: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    mail: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    phone: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    user: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};
const AppState = {
    user: null,
    vendors: [],
    clients: [],
    currentView: 'invoice',
    editingInvoiceId: null,
    invoice: getBlankInvoice(),
};

function getBlankInvoice() {
    return {
        vendorId: '',
        clientId: '',
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        paymentTerms: 'NET30',
        lineItems: [{ type: 'item', description: '', qty: 1, unitPrice: 0 }],
        taxEnabled: true,
        taxRate: 7,
        notes: '',
        status: 'draft',
        // Vendor display fields (populated on vendor select)
        vendorName: '', vendorAddress: '', vendorRemittance: '', vendorEmail: '',
        vendorPhone: '', vendorLogo: '', vendorColor: '#475569', vendorFont: "'DM Sans', sans-serif",
        vendorPaymentInfo: '', vendorCode: '',
        // Client display fields
        clientName: '', clientAddress: '',
    };
}

// ─── Utilities ───────────────────────────────────────────────────
function $(sel, parent = document) { return parent.querySelector(sel); }
function $$(sel, parent = document) { return [...parent.querySelectorAll(sel)]; }

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(num) {
    return '$' + (num || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calcDueDate(invoiceDate, terms) {
    if (!invoiceDate) return '';
    const d = new Date(invoiceDate + 'T00:00:00');
    switch (terms) {
        case 'DUE_ON_RECEIPT': return invoiceDate;
        case 'NET15': d.setDate(d.getDate() + 15); break;
        case 'NET30': d.setDate(d.getDate() + 30); break;
        case 'NET45': d.setDate(d.getDate() + 45); break;
        case 'NET60': d.setDate(d.getDate() + 60); break;
        case 'CUSTOM': return '';
        default: d.setDate(d.getDate() + 30);
    }
    return d.toISOString().split('T')[0];
}

function termsLabel(terms) {
    const labels = {
        'DUE_ON_RECEIPT': 'Due on Receipt',
        'NET15': 'Net 15',
        'NET30': 'Net 30',
        'NET45': 'Net 45',
        'NET60': 'Net 60',
        'CUSTOM': 'Custom'
    };
    return labels[terms] || terms;
}

function calcInvoiceTotals(lineItems, taxEnabled, taxRate) {
    const subtotal = lineItems.reduce((sum, item) => {
        if (item.type === 'parent') return sum;
        return sum + ((item.qty || 0) * (item.unitPrice || 0));
    }, 0);
    const taxAmount = taxEnabled ? subtotal * (taxRate / 100) : 0;
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
}

function generateVendorCode(name) {
    if (!name) return 'INV';
    return name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() || 'INV';
}

async function generateInvoiceNumber(vendorCode, invoiceDate) {
    const dateStr = invoiceDate.replace(/-/g, '').substring(2); // YYMMDD
    const prefix = `${vendorCode}-${dateStr}`;
    // Query existing invoices with this prefix
    const snap = await db.collection('invoices')
        .where('invoiceNumber', '>=', prefix)
        .where('invoiceNumber', '<=', prefix + '\uf8ff')
        .get();
    const seq = String(snap.size + 1).padStart(2, '0');
    return `${prefix}-${seq}`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function openModal(html) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    content.innerHTML = html;
    overlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
}

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ─── Database Operations ─────────────────────────────────────────
const DB = {
    // Vendors
    async getVendors() {
        const snap = await db.collection('vendors').orderBy('name').get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async saveVendor(data, id = null) {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        if (id) {
            await db.collection('vendors').doc(id).update(data);
            return id;
        } else {
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            const ref = await db.collection('vendors').add(data);
            return ref.id;
        }
    },
    async deleteVendor(id) {
        await db.collection('vendors').doc(id).delete();
    },

    // Clients
    async getClients() {
        const snap = await db.collection('clients').orderBy('name').get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async saveClient(data, id = null) {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        if (id) {
            await db.collection('clients').doc(id).update(data);
            return id;
        } else {
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            const ref = await db.collection('clients').add(data);
            return ref.id;
        }
    },
    async deleteClient(id) {
        await db.collection('clients').doc(id).delete();
    },

    // Invoices
    async getInvoices(filters = {}) {
        let query = db.collection('invoices').orderBy('createdAt', 'desc');
        if (filters.vendorId) query = db.collection('invoices').where('vendorId', '==', filters.vendorId).orderBy('createdAt', 'desc');
        if (filters.status && filters.status !== 'all') {
            query = filters.vendorId
                ? db.collection('invoices').where('vendorId', '==', filters.vendorId).where('status', '==', filters.status).orderBy('createdAt', 'desc')
                : db.collection('invoices').where('status', '==', filters.status).orderBy('createdAt', 'desc');
        }
        const snap = await query.limit(100).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async getInvoice(id) {
        const doc = await db.collection('invoices').doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    },
    async saveInvoice(data, id = null) {
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        if (id) {
            await db.collection('invoices').doc(id).update(data);
            return id;
        } else {
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            const ref = await db.collection('invoices').add(data);
            return ref.id;
        }
    },
    async updateInvoiceStatus(id, status) {
        const doc = await db.collection('invoices').doc(id).get();
        const data = doc.data();
        const history = data.statusHistory || [];
        history.push({ status, date: new Date().toISOString(), note: '' });
        await db.collection('invoices').doc(id).update({
            status,
            statusHistory: history,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    async deleteInvoice(id) {
        await db.collection('invoices').doc(id).delete();
    },

    // Ensure default client exists
    async ensureDefaultClient() {
        const snap = await db.collection('clients').where('isDefault', '==', true).get();
        if (snap.empty) {
            await db.collection('clients').add({
                name: 'Toyota of Coconut Creek',
                address: '5201 W Sample Rd.\nCoconut Creek, FL 33073',
                contactName: '',
                contactEmail: '',
                contactPhone: '',
                isDefault: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }
};

// ─── Authentication ──────────────────────────────────────────────
function initAuth() {
    const emailForm = document.getElementById('emailAuthForm');
    const signOutBtn = document.getElementById('signOutBtn');
    const authError = document.getElementById('authError');

    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;
        authError.textContent = '';

        if (!email || !password) {
            authError.textContent = 'Please enter email and password.';
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            // If user doesn't exist yet, create the account
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                try {
                    await auth.createUserWithEmailAndPassword(email, password);
                } catch (createErr) {
                    authError.textContent = createErr.message.replace('Firebase: ', '');
                }
            } else if (err.code === 'auth/wrong-password') {
                authError.textContent = 'Incorrect password.';
            } else if (err.code === 'auth/invalid-email') {
                authError.textContent = 'Invalid email address.';
            } else if (err.code === 'auth/too-many-requests') {
                authError.textContent = 'Too many attempts. Try again later.';
            } else {
                authError.textContent = err.message.replace('Firebase: ', '');
            }
        }
    });

    signOutBtn.addEventListener('click', async () => {
        await auth.signOut();
    });

    auth.onAuthStateChanged(async (user) => {
        AppState.user = user;
        if (user) {
            document.getElementById('authScreen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            await loadAppData();
            handleRoute();
        } else {
            document.getElementById('authScreen').classList.remove('hidden');
            document.getElementById('app').classList.add('hidden');
        }
    });
}

async function loadAppData() {
    try {
        await DB.ensureDefaultClient();
        AppState.vendors = await DB.getVendors();
        AppState.clients = await DB.getClients();
    } catch (err) {
        console.error('Error loading data:', err);
        showToast('Error loading data', 'error');
    }
}

// ─── Router & Navigation ─────────────────────────────────────────
function handleRoute() {
    const hash = window.location.hash.slice(1) || 'invoice';
    const parts = hash.split('/');
    const view = parts[0];
    const param = parts[1];

    AppState.currentView = view;
    updateNavActive(view);

    const main = document.getElementById('mainContent');
    main.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

    // Hide preview panel unless on invoice view
    const previewPanel = document.getElementById('previewPanel');
    if (view !== 'invoice') {
        previewPanel.classList.add('hidden');
        if (window.innerWidth > 1024) {
            document.querySelector('.main-content').style.marginRight = '0';
        }
    }

    switch (view) {
        case 'invoice':
            if (param) {
                loadInvoiceForEditing(param).then(() => renderInvoiceBuilder());
            } else {
                AppState.editingInvoiceId = null;
                AppState.invoice = getBlankInvoice();
                // Auto-select default client
                const defaultClient = AppState.clients.find(c => c.isDefault);
                if (defaultClient) {
                    AppState.invoice.clientId = defaultClient.id;
                    AppState.invoice.clientName = defaultClient.name;
                    AppState.invoice.clientAddress = defaultClient.address;
                }
                renderInvoiceBuilder();
            }
            break;
        case 'history':
            renderHistory();
            break;
        case 'vendors':
            renderVendors();
            break;
        case 'clients':
            renderClients();
            break;
        default:
            renderInvoiceBuilder();
    }
}

async function loadInvoiceForEditing(invoiceId) {
    try {
        const inv = await DB.getInvoice(invoiceId);
        if (inv) {
            AppState.editingInvoiceId = inv.id;
            const snap = inv.vendorSnapshot || {};
            const cSnap = inv.clientSnapshot || {};
            AppState.invoice = {
                vendorId: inv.vendorId || '',
                clientId: inv.clientId || '',
                invoiceNumber: inv.invoiceNumber || '',
                invoiceDate: inv.invoiceDate || '',
                dueDate: inv.dueDate || '',
                paymentTerms: inv.paymentTerms || 'NET30',
                lineItems: inv.lineItems || [{ type: 'item', description: '', qty: 1, unitPrice: 0 }],
                taxEnabled: inv.taxEnabled !== false,
                taxRate: inv.taxRate || 7,
                notes: inv.notes || '',
                status: inv.status || 'draft',
                vendorName: snap.name || inv.vendorName || '',
                vendorAddress: snap.address || '',
                vendorRemittance: snap.remittanceAddress || '',
                vendorEmail: snap.email || '',
                vendorPhone: snap.phone || '',
                vendorLogo: snap.logoUrl || '',
                vendorColor: snap.accentColor || '#475569',
                vendorFont: snap.font || "'DM Sans', sans-serif",
                vendorPaymentInfo: snap.paymentInfo || '',
                vendorCode: snap.code || '',
                clientName: cSnap.name || inv.clientName || '',
                clientAddress: cSnap.address || '',
            };
        }
    } catch (err) {
        showToast('Error loading invoice', 'error');
    }
}

function updateNavActive(view) {
    $$('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === view));
    $$('.bnav-item').forEach(el => el.classList.toggle('active', el.dataset.view === view));
}

function initNavigation() {
    // Sidebar toggle for mobile
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // Close sidebar on nav click (mobile)
    $$('.nav-item').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Close modal on overlay click
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    window.addEventListener('hashchange', handleRoute);
}


// ═══════════════════════════════════════════════════════════════════
// INVOICE BUILDER VIEW
// ═══════════════════════════════════════════════════════════════════

function renderInvoiceBuilder() {
    const inv = AppState.invoice;
    const isEditing = !!AppState.editingInvoiceId;
    const main = document.getElementById('mainContent');

    const vendorOptions = AppState.vendors.map(v =>
        `<option value="${v.id}" ${v.id === inv.vendorId ? 'selected' : ''}>${v.name} (${v.code || generateVendorCode(v.name)})</option>`
    ).join('');

    const clientOptions = AppState.clients.map(c =>
        `<option value="${c.id}" ${c.id === inv.clientId ? 'selected' : ''}>${c.name}</option>`
    ).join('');

    main.innerHTML = `
        <div class="page-header">
            <h2>${isEditing ? 'Edit Invoice' : 'New Invoice'} ${inv.invoiceNumber ? '— ' + inv.invoiceNumber : ''}</h2>
            <div class="page-header-actions">
                <button class="btn btn-secondary" id="togglePreviewBtn">${ICO.eye} Preview</button>
                <button class="btn btn-primary" id="saveInvoiceBtn">${ICO.save} ${isEditing ? 'Update' : 'Save'}</button>
            </div>
        </div>

        <div class="invoice-form-col">
            <!-- Vendor Selection -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Vendor (From)</span>
                </div>
                <div class="form-group">
                    <label>Select Vendor</label>
                    <div class="select-with-btn">
                        <select id="vendorSelect">
                            <option value="">— Choose a vendor —</option>
                            ${vendorOptions}
                        </select>
                        <button class="btn btn-secondary btn-icon" id="newVendorFromInvoice" title="New Vendor">${ICO.plus}</button>
                    </div>
                </div>
                ${inv.vendorId ? `
                <div style="margin-top:12px; padding:12px; background:var(--bg); border-radius:var(--radius-sm); font-size:13px; color:var(--text-secondary); line-height:1.6;">
                    ${inv.vendorLogo ? `<img src="${inv.vendorLogo}" style="max-width:80px;max-height:40px;object-fit:contain;margin-bottom:6px;" onerror="this.style.display='none'">` : ''}
                    <strong>${inv.vendorName}</strong><br>
                    ${inv.vendorAddress ? inv.vendorAddress.replace(/\n/g, '<br>') + '<br>' : ''}
                    ${inv.vendorEmail || ''} ${inv.vendorPhone ? '· ' + inv.vendorPhone : ''}
                </div>` : ''}
            </div>

            <!-- Client Selection -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Client (Bill To)</span>
                </div>
                <div class="form-group">
                    <label>Select Client</label>
                    <div class="select-with-btn">
                        <select id="clientSelect">
                            <option value="">— Choose a client —</option>
                            ${clientOptions}
                        </select>
                        <button class="btn btn-secondary btn-icon" id="newClientFromInvoice" title="New Client">${ICO.plus}</button>
                    </div>
                </div>
            </div>

            <!-- Invoice Details -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Invoice Details</span>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Invoice #</label>
                        <input type="text" id="invoiceNumber" value="${inv.invoiceNumber}" readonly class="readonly" placeholder="Auto-generated">
                        <span class="form-hint">Generated when vendor & date are set</span>
                    </div>
                    <div class="form-group">
                        <label>Invoice Date</label>
                        <input type="date" id="invoiceDate" value="${inv.invoiceDate}">
                    </div>
                    <div class="form-group">
                        <label>Payment Terms</label>
                        <select id="paymentTerms">
                            <option value="DUE_ON_RECEIPT" ${inv.paymentTerms === 'DUE_ON_RECEIPT' ? 'selected' : ''}>Due on Receipt</option>
                            <option value="NET15" ${inv.paymentTerms === 'NET15' ? 'selected' : ''}>Net 15</option>
                            <option value="NET30" ${inv.paymentTerms === 'NET30' ? 'selected' : ''}>Net 30</option>
                            <option value="NET45" ${inv.paymentTerms === 'NET45' ? 'selected' : ''}>Net 45</option>
                            <option value="NET60" ${inv.paymentTerms === 'NET60' ? 'selected' : ''}>Net 60</option>
                            <option value="CUSTOM" ${inv.paymentTerms === 'CUSTOM' ? 'selected' : ''}>Custom</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" id="dueDate" value="${inv.dueDate}" ${inv.paymentTerms !== 'CUSTOM' ? 'readonly class="readonly"' : ''}>
                    </div>
                </div>
            </div>

            <!-- Line Items -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Line Items</span>
                </div>
                <div id="lineItemsContainer" class="line-items-container"></div>
                <div class="line-items-actions">
                    <button class="add-item-btn" id="addItemBtn">+ Item</button>
                    <button class="add-item-btn" id="addParentBtn">+ Header Group</button>
                    <button class="add-item-btn" id="addChildBtn">+ Sub-Item</button>
                </div>
            </div>

            <!-- Tax & Totals -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Tax & Totals</span>
                </div>
                <div class="form-row" style="margin-bottom:14px;">
                    <div class="toggle-row" style="flex:1;">
                        <label>Include Tax</label>
                        <div class="toggle-switch ${inv.taxEnabled ? 'active' : ''}" id="taxToggle"></div>
                    </div>
                    <div class="form-group" style="width:100px;">
                        <label>Tax Rate %</label>
                        <input type="number" id="taxRate" value="${inv.taxRate}" min="0" max="100" step="0.5">
                    </div>
                </div>
                <div class="totals-section">
                    <div class="totals-box">
                        <div class="totals-row"><span>Subtotal</span><span id="subtotalDisplay">${formatCurrency(0)}</span></div>
                        <div class="totals-row" id="taxRow" style="${inv.taxEnabled ? '' : 'display:none'}"><span>Tax (<span id="taxRateLabel">${inv.taxRate}%</span>)</span><span id="taxDisplay">${formatCurrency(0)}</span></div>
                        <div class="totals-row grand"><span>Total</span><span id="grandTotalDisplay">${formatCurrency(0)}</span></div>
                    </div>
                </div>
            </div>

            <!-- Notes -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Notes / Memo</span>
                </div>
                <div class="form-group">
                    <textarea id="invoiceNotes" rows="3" placeholder="e.g., For January 2026 marketing services">${inv.notes}</textarea>
                </div>
            </div>

            <!-- Actions -->
            <div class="invoice-actions-bar">
                <button class="btn btn-primary btn-lg" id="saveInvoiceBtn2">${ICO.save} ${isEditing ? 'Update Invoice' : 'Save Invoice'}</button>
                <button class="btn btn-success btn-lg" id="downloadPdfBtn">${ICO.download} Download PDF</button>
                ${(navigator.share && isMobileDevice()) ? '<button class="btn btn-secondary btn-lg" id="sharePdfBtn">' + ICO.share + ' Share</button>' : ''}
                ${isEditing ? '<button class="btn btn-secondary" id="duplicateInvoiceBtn">' + ICO.copy + ' Duplicate</button>' : ''}
                <button class="btn btn-ghost" id="clearInvoiceBtn">Clear</button>
            </div>
        </div>
    `;

    // Render line items
    renderLineItems();
    updateTotals();

    // Attach event listeners
    attachInvoiceBuilderEvents();
}

function renderLineItems() {
    const container = document.getElementById('lineItemsContainer');
    if (!container) return;
    const items = AppState.invoice.lineItems;

    if (items.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding:24px"><div class="empty-state-text">No items yet</div></div>';
        return;
    }

    container.innerHTML = items.map((item, i) => {
        if (item.type === 'parent') {
            return `
                <div class="line-item-row parent-row" data-index="${i}">
                    <span class="li-type-badge li-type-parent">Header</span>
                    <input type="text" class="li-desc" value="${escapeHtml(item.description)}" data-field="description" placeholder="Group heading...">
                    <button class="li-remove-btn" data-index="${i}" title="Remove">×</button>
                </div>`;
        }
        const isChild = item.type === 'child';
        return `
            <div class="line-item-row ${isChild ? 'child-row' : ''}" data-index="${i}">
                ${isChild ? '<span class="li-type-badge li-type-child">Sub</span>' : ''}
                <input type="number" class="li-qty" value="${item.qty}" data-field="qty" min="1" placeholder="1">
                <input type="text" class="li-desc" value="${escapeHtml(item.description)}" data-field="description" placeholder="Description...">
                <input type="text" class="li-price" value="${(item.unitPrice || 0).toFixed(2)}" data-field="unitPrice" placeholder="0.00">
                <button class="li-remove-btn" data-index="${i}" title="Remove">×</button>
            </div>`;
    }).join('');

    // Attach line item input events
    $$('.line-item-row input', container).forEach(input => {
        input.addEventListener('input', handleLineItemInput);
    });
    $$('.li-remove-btn', container).forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            AppState.invoice.lineItems.splice(idx, 1);
            renderLineItems();
            updateTotals();
            updatePreview();
        });
    });
}

function handleLineItemInput(e) {
    const row = e.target.closest('.line-item-row');
    const idx = parseInt(row.dataset.index);
    const field = e.target.dataset.field;
    const item = AppState.invoice.lineItems[idx];

    if (field === 'qty') item.qty = parseInt(e.target.value) || 1;
    else if (field === 'description') item.description = e.target.value;
    else if (field === 'unitPrice') item.unitPrice = parseFloat(e.target.value) || 0;

    updateTotals();
    debouncedPreviewUpdate();
}

const debouncedPreviewUpdate = debounce(updatePreview, 200);

function updateTotals() {
    const inv = AppState.invoice;
    const { subtotal, taxAmount, grandTotal } = calcInvoiceTotals(inv.lineItems, inv.taxEnabled, inv.taxRate);
    const el = (id) => document.getElementById(id);
    if (el('subtotalDisplay')) el('subtotalDisplay').textContent = formatCurrency(subtotal);
    if (el('taxDisplay')) el('taxDisplay').textContent = formatCurrency(taxAmount);
    if (el('grandTotalDisplay')) el('grandTotalDisplay').textContent = formatCurrency(grandTotal);
    if (el('taxRow')) el('taxRow').style.display = inv.taxEnabled ? 'flex' : 'none';
    if (el('taxRateLabel')) el('taxRateLabel').textContent = inv.taxRate + '%';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function attachInvoiceBuilderEvents() {
    const el = (id) => document.getElementById(id);

    // Vendor selection
    el('vendorSelect')?.addEventListener('change', async function () {
        const vendorId = this.value;
        const inv = AppState.invoice;
        if (vendorId) {
            const vendor = AppState.vendors.find(v => v.id === vendorId);
            if (vendor) {
                inv.vendorId = vendor.id;
                inv.vendorName = vendor.name;
                inv.vendorAddress = vendor.address || '';
                inv.vendorRemittance = vendor.remittanceAddress || '';
                inv.vendorEmail = vendor.email || '';
                inv.vendorPhone = vendor.phone || '';
                inv.vendorLogo = vendor.logoUrl || '';
                inv.vendorColor = vendor.accentColor || '#475569';
                inv.vendorFont = vendor.font || "'DM Sans', sans-serif";
                inv.vendorPaymentInfo = vendor.paymentInfo || '';
                inv.vendorCode = vendor.code || generateVendorCode(vendor.name);
                inv.taxRate = vendor.defaultTaxRate ?? 7;
                if (vendor.defaultPaymentTerms) inv.paymentTerms = vendor.defaultPaymentTerms;
                // Auto-generate invoice number
                if (inv.invoiceDate) {
                    inv.invoiceNumber = await generateInvoiceNumber(inv.vendorCode, inv.invoiceDate);
                }
                inv.dueDate = calcDueDate(inv.invoiceDate, inv.paymentTerms);
                renderInvoiceBuilder();
                updatePreview();
            }
        } else {
            inv.vendorId = '';
            inv.vendorName = '';
            inv.vendorAddress = '';
            inv.vendorRemittance = '';
            inv.vendorEmail = '';
            inv.vendorPhone = '';
            inv.vendorLogo = '';
            inv.vendorColor = '#475569';
            inv.vendorFont = "'DM Sans', sans-serif";
            inv.vendorPaymentInfo = '';
            inv.vendorCode = '';
            inv.invoiceNumber = '';
            renderInvoiceBuilder();
            updatePreview();
        }
    });

    // New vendor from invoice
    el('newVendorFromInvoice')?.addEventListener('click', () => openVendorModal());

    // Client selection
    el('clientSelect')?.addEventListener('change', function () {
        const clientId = this.value;
        const inv = AppState.invoice;
        if (clientId) {
            const client = AppState.clients.find(c => c.id === clientId);
            if (client) {
                inv.clientId = client.id;
                inv.clientName = client.name;
                inv.clientAddress = client.address || '';
            }
        } else {
            inv.clientId = '';
            inv.clientName = '';
            inv.clientAddress = '';
        }
        updatePreview();
    });

    el('newClientFromInvoice')?.addEventListener('click', () => openClientModal());

    // Invoice date
    el('invoiceDate')?.addEventListener('change', async function () {
        AppState.invoice.invoiceDate = this.value;
        AppState.invoice.dueDate = calcDueDate(this.value, AppState.invoice.paymentTerms);
        if (el('dueDate')) el('dueDate').value = AppState.invoice.dueDate;
        // Regenerate invoice number
        if (AppState.invoice.vendorCode && this.value) {
            AppState.invoice.invoiceNumber = await generateInvoiceNumber(AppState.invoice.vendorCode, this.value);
            if (el('invoiceNumber')) el('invoiceNumber').value = AppState.invoice.invoiceNumber;
        }
        updatePreview();
    });

    // Payment terms
    el('paymentTerms')?.addEventListener('change', function () {
        AppState.invoice.paymentTerms = this.value;
        AppState.invoice.dueDate = calcDueDate(AppState.invoice.invoiceDate, this.value);
        const dueDateInput = el('dueDate');
        if (dueDateInput) {
            dueDateInput.value = AppState.invoice.dueDate;
            if (this.value === 'CUSTOM') {
                dueDateInput.readOnly = false;
                dueDateInput.classList.remove('readonly');
            } else {
                dueDateInput.readOnly = true;
                dueDateInput.classList.add('readonly');
            }
        }
        updatePreview();
    });

    // Due date (custom)
    el('dueDate')?.addEventListener('change', function () {
        if (AppState.invoice.paymentTerms === 'CUSTOM') {
            AppState.invoice.dueDate = this.value;
            updatePreview();
        }
    });

    // Tax toggle
    el('taxToggle')?.addEventListener('click', function () {
        this.classList.toggle('active');
        AppState.invoice.taxEnabled = this.classList.contains('active');
        updateTotals();
        updatePreview();
    });

    // Tax rate
    el('taxRate')?.addEventListener('input', function () {
        AppState.invoice.taxRate = parseFloat(this.value) || 0;
        updateTotals();
        debouncedPreviewUpdate();
    });

    // Notes
    el('invoiceNotes')?.addEventListener('input', function () {
        AppState.invoice.notes = this.value;
        debouncedPreviewUpdate();
    });

    // Add line item buttons
    el('addItemBtn')?.addEventListener('click', () => {
        AppState.invoice.lineItems.push({ type: 'item', description: '', qty: 1, unitPrice: 0 });
        renderLineItems();
        updatePreview();
    });
    el('addParentBtn')?.addEventListener('click', () => {
        AppState.invoice.lineItems.push({ type: 'parent', description: '', qty: null, unitPrice: null });
        renderLineItems();
        updatePreview();
    });
    el('addChildBtn')?.addEventListener('click', () => {
        AppState.invoice.lineItems.push({ type: 'child', description: '', qty: 1, unitPrice: 0 });
        renderLineItems();
        updatePreview();
    });

    // Save buttons
    const saveHandler = () => saveInvoice();
    el('saveInvoiceBtn')?.addEventListener('click', saveHandler);
    el('saveInvoiceBtn2')?.addEventListener('click', saveHandler);

    // Download PDF
    el('downloadPdfBtn')?.addEventListener('click', () => downloadPdf());

    // Share PDF (mobile)
    el('sharePdfBtn')?.addEventListener('click', () => sharePdf());

    // Duplicate
    el('duplicateInvoiceBtn')?.addEventListener('click', () => duplicateInvoice());

    // Clear
    el('clearInvoiceBtn')?.addEventListener('click', () => {
        AppState.editingInvoiceId = null;
        AppState.invoice = getBlankInvoice();
        const defaultClient = AppState.clients.find(c => c.isDefault);
        if (defaultClient) {
            AppState.invoice.clientId = defaultClient.id;
            AppState.invoice.clientName = defaultClient.name;
            AppState.invoice.clientAddress = defaultClient.address;
        }
        renderInvoiceBuilder();
        updatePreview();
    });

    // Toggle preview
    el('togglePreviewBtn')?.addEventListener('click', () => {
        const panel = document.getElementById('previewPanel');
        const isHidden = panel.classList.contains('hidden') || getComputedStyle(panel).transform.includes('520');
        panel.classList.toggle('hidden');
        if (window.innerWidth > 1024) {
            document.querySelector('.main-content').style.marginRight = !isHidden ? '0' : '680px';
        }
        updatePreview();
    });

    el('closePreviewBtn')?.addEventListener('click', () => {
        document.getElementById('previewPanel').classList.add('hidden');
        if (window.innerWidth > 1024) {
            document.querySelector('.main-content').style.marginRight = '0';
        }
    });

    // Initial preview
    setTimeout(() => {
        if (window.innerWidth > 1024) {
            document.getElementById('previewPanel').classList.remove('hidden');
            document.querySelector('.main-content').style.marginRight = '680px';
        }
        updatePreview();
    }, 100);
}

async function saveInvoice() {
    const inv = AppState.invoice;
    if (!inv.vendorId) { showToast('Please select a vendor', 'warning'); return; }
    if (!inv.clientId) { showToast('Please select a client', 'warning'); return; }
    if (!inv.invoiceDate) { showToast('Please set an invoice date', 'warning'); return; }

    // Generate invoice number if not set
    if (!inv.invoiceNumber && inv.vendorCode && inv.invoiceDate) {
        inv.invoiceNumber = await generateInvoiceNumber(inv.vendorCode, inv.invoiceDate);
    }

    const { subtotal, taxAmount, grandTotal } = calcInvoiceTotals(inv.lineItems, inv.taxEnabled, inv.taxRate);

    const data = {
        invoiceNumber: inv.invoiceNumber,
        vendorId: inv.vendorId,
        vendorName: inv.vendorName,
        clientId: inv.clientId,
        clientName: inv.clientName,
        invoiceDate: inv.invoiceDate,
        dueDate: inv.dueDate,
        paymentTerms: inv.paymentTerms,
        lineItems: inv.lineItems,
        taxEnabled: inv.taxEnabled,
        taxRate: inv.taxRate,
        subtotal,
        taxAmount,
        grandTotal,
        notes: inv.notes,
        status: inv.status || 'draft',
        statusHistory: [{ status: inv.status || 'draft', date: new Date().toISOString() }],
        vendorSnapshot: {
            name: inv.vendorName,
            address: inv.vendorAddress,
            remittanceAddress: inv.vendorRemittance,
            email: inv.vendorEmail,
            phone: inv.vendorPhone,
            logoUrl: inv.vendorLogo,
            accentColor: inv.vendorColor,
            font: inv.vendorFont,
            paymentInfo: inv.vendorPaymentInfo,
            code: inv.vendorCode,
        },
        clientSnapshot: {
            name: inv.clientName,
            address: inv.clientAddress,
        }
    };

    try {
        const id = await DB.saveInvoice(data, AppState.editingInvoiceId);
        AppState.editingInvoiceId = id;
        showToast(AppState.editingInvoiceId ? 'Invoice updated!' : 'Invoice saved!', 'success');
    } catch (err) {
        console.error(err);
        showToast('Error saving invoice: ' + err.message, 'error');
    }
}

async function duplicateInvoice() {
    AppState.editingInvoiceId = null;
    AppState.invoice.invoiceDate = new Date().toISOString().split('T')[0];
    AppState.invoice.status = 'draft';
    if (AppState.invoice.vendorCode && AppState.invoice.invoiceDate) {
        AppState.invoice.invoiceNumber = await generateInvoiceNumber(AppState.invoice.vendorCode, AppState.invoice.invoiceDate);
    }
    AppState.invoice.dueDate = calcDueDate(AppState.invoice.invoiceDate, AppState.invoice.paymentTerms);
    renderInvoiceBuilder();
    updatePreview();
    showToast('Invoice duplicated — save when ready', 'info');
}


// ═══════════════════════════════════════════════════════════════════
// INVOICE PREVIEW RENDERER
// ═══════════════════════════════════════════════════════════════════

function renderInvoiceHTML(inv, forPdf = false) {
    if (!inv) inv = AppState.invoice;
    const { subtotal, taxAmount, grandTotal } = calcInvoiceTotals(inv.lineItems, inv.taxEnabled, inv.taxRate);

    const itemsHtml = inv.lineItems.filter(it => it.description || (it.unitPrice && it.unitPrice > 0)).map(item => {
        if (item.type === 'parent') {
            return `<tr class="parent-row"><td colspan="4" style="font-weight:700;background:#f0f4f8;border-left:3px solid var(--inv-accent,#475569);padding:10px 14px;font-size:13px;">${escapeHtml(item.description)}</td></tr>`;
        }
        const isChild = item.type === 'child';
        const lineTotal = (item.qty || 0) * (item.unitPrice || 0);
        return `<tr class="${isChild ? 'child-row' : ''}">
            <td class="text-center">${item.qty || ''}</td>
            <td style="${isChild ? 'padding-left:30px;font-size:12px;color:#444;' : ''}">${escapeHtml(item.description) || '—'}</td>
            <td class="text-right">${formatCurrency(item.unitPrice || 0)}</td>
            <td class="text-right">${formatCurrency(lineTotal)}</td>
        </tr>`;
    }).join('');

    const noItems = '<tr><td colspan="4" style="text-align:center;color:#999;padding:30px 14px;font-size:13px;">No items added</td></tr>';

    const showPayment = inv.vendorPaymentInfo || inv.vendorRemittance;

    return `
        <div class="inv" style="--inv-accent:${inv.vendorColor || '#475569'}; --inv-font:${inv.vendorFont || "'DM Sans', sans-serif"}; font-family:${inv.vendorFont || "'DM Sans', sans-serif"};">
            <div class="inv-header">
                <div class="inv-company">
                    ${inv.vendorLogo ? `<img src="${inv.vendorLogo}" class="inv-logo" onerror="this.style.display='none'">` : ''}
                    <div>
                        <div class="inv-company-name">${escapeHtml(inv.vendorName) || 'Your Company'}</div>
                        ${inv.vendorAddress ? `<div class="inv-company-addr">${escapeHtml(inv.vendorAddress)}</div>` : ''}
                    </div>
                </div>
                <div class="inv-meta">
                    <div class="inv-title">INVOICE</div>
                    <div class="inv-meta-table">
                        <div class="inv-meta-row"><span class="inv-meta-label">Invoice #</span><span class="inv-meta-value">${escapeHtml(inv.invoiceNumber) || '—'}</span></div>
                        <div class="inv-meta-row"><span class="inv-meta-label">Date</span><span class="inv-meta-value">${formatDate(inv.invoiceDate)}</span></div>
                        ${inv.dueDate ? `<div class="inv-meta-row"><span class="inv-meta-label">Due Date</span><span class="inv-meta-value">${formatDate(inv.dueDate)}</span></div>` : ''}
                        ${inv.paymentTerms ? `<div class="inv-meta-row"><span class="inv-meta-label">Terms</span><span class="inv-meta-value">${termsLabel(inv.paymentTerms)}</span></div>` : ''}
                    </div>
                </div>
            </div>

            <div class="inv-billto">
                <div class="inv-billto-label">Bill To</div>
                <div class="inv-billto-name">${escapeHtml(inv.clientName) || 'Client Name'}</div>
                ${inv.clientAddress ? `<div class="inv-billto-addr">${escapeHtml(inv.clientAddress)}</div>` : ''}
            </div>

            <table class="inv-table">
                <thead>
                    <tr>
                        <th class="text-center" style="width:50px;">Qty</th>
                        <th>Description</th>
                        <th class="text-right" style="width:100px;">Unit Price</th>
                        <th class="text-right" style="width:100px;">Total</th>
                    </tr>
                </thead>
                <tbody>${itemsHtml || noItems}</tbody>
            </table>

            <div class="inv-totals">
                <div class="inv-totals-box">
                    <div class="inv-totals-row sub"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
                    ${inv.taxEnabled ? `<div class="inv-totals-row tax"><span>Tax (${inv.taxRate}%)</span><span>${formatCurrency(taxAmount)}</span></div>` : ''}
                    <div class="inv-totals-row grand"><span>Total</span><span>${formatCurrency(grandTotal)}</span></div>
                </div>
            </div>

            ${inv.notes ? `<div class="inv-notes"><div class="inv-notes-label">Notes</div>${escapeHtml(inv.notes)}</div>` : ''}

            ${showPayment ? `
            <div class="inv-payment">
                <div class="inv-payment-label">Payment Information</div>
                <div class="inv-payment-info">
                    ${inv.vendorPaymentInfo ? escapeHtml(inv.vendorPaymentInfo) : ''}
                    ${inv.vendorRemittance ? `\nRemit to:\n${escapeHtml(inv.vendorRemittance)}` : ''}
                </div>
            </div>` : ''}

            <div class="inv-footer">
                <div class="inv-footer-contact">
                    ${inv.vendorEmail ? `<p><a href="mailto:${escapeHtml(inv.vendorEmail)}">${escapeHtml(inv.vendorEmail)}</a></p>` : ''}
                    ${inv.vendorPhone ? `<p>Phone: ${escapeHtml(inv.vendorPhone)}</p>` : ''}
                </div>
                <div class="inv-footer-thanks">Thank you for your business!</div>
            </div>
        </div>
    `;
}

function updatePreview() {
    const preview = document.getElementById('invoicePreview');
    if (preview) {
        preview.innerHTML = renderInvoiceHTML(AppState.invoice);
    }
}


// ═══════════════════════════════════════════════════════════════════
// PDF GENERATION
// ═══════════════════════════════════════════════════════════════════

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1);
}

async function generatePdfBlob() {
    const container = document.getElementById('pdfContainer');
    const invoiceHtml = renderInvoiceHTML(AppState.invoice, true);

    // Build a full standalone HTML document for rendering
    const fullHtml = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Source+Sans+3:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Nunito:wght@400;600;700&family=Work+Sans:wght@400;500;600;700&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width: 8.5in; margin: 0; padding: 0; background: white; }
${getInvoiceStyles()}
</style>
</head><body>${invoiceHtml}</body></html>`;

    // Create an iframe for clean isolated rendering
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed; top:0; left:0; width:8.5in; height:11in; border:none; z-index:-1; opacity:0; pointer-events:none;';
    document.body.appendChild(iframe);

    // Write content into iframe
    iframe.contentDocument.open();
    iframe.contentDocument.write(fullHtml);
    iframe.contentDocument.close();

    // Wait for fonts and images to load
    await new Promise(r => setTimeout(r, 500));
    try { await iframe.contentDocument.fonts.ready; } catch(e) {}

    const opt = {
        margin: 0,
        filename: (AppState.invoice.invoiceNumber || 'invoice') + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 816,
            windowHeight: 1056,
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const target = iframe.contentDocument.body;
    const worker = html2pdf().set(opt).from(target);
    const blob = await worker.outputPdf('blob');

    // Clean up iframe
    document.body.removeChild(iframe);

    return blob;
}

function getInvoiceStyles() {
    // Extract invoice-specific CSS rules from the stylesheet
    return `
.inv { font-family: var(--inv-font, 'DM Sans', sans-serif); color: #1a1a1a; padding: 0.5in; display: flex; flex-direction: column; min-height: 11in; line-height: 1.5; font-size: 14px; }
.inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid var(--inv-accent, #475569); }
.inv-company { display: flex; flex-direction: column; gap: 10px; max-width: 55%; }
.inv-logo { max-width: 140px; max-height: 80px; object-fit: contain; }
.inv-company-name { font-size: 18px; font-weight: 700; }
.inv-company-addr { font-size: 12px; color: #666; white-space: pre-line; line-height: 1.5; }
.inv-meta { text-align: right; }
.inv-title { font-size: 36px; font-weight: 800; color: var(--inv-accent, #475569); letter-spacing: -1px; margin-bottom: 10px; }
.inv-meta-table { font-size: 13px; }
.inv-meta-row { display: flex; justify-content: flex-end; gap: 14px; padding: 3px 0; }
.inv-meta-label { color: #888; }
.inv-meta-value { font-weight: 600; min-width: 120px; text-align: right; }
.inv-billto { background: #f8f9fa; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px; border-left: 4px solid var(--inv-accent, #475569); }
.inv-billto-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #888; margin-bottom: 6px; font-weight: 700; }
.inv-billto-name { font-size: 17px; font-weight: 700; margin-bottom: 3px; }
.inv-billto-addr { font-size: 13px; color: #666; white-space: pre-line; }
.inv-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
.inv-table thead { background: var(--inv-accent, #475569); color: white; }
.inv-table th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.inv-table th:first-child { border-radius: 5px 0 0 5px; }
.inv-table th:last-child { border-radius: 0 5px 5px 0; text-align: right; }
.inv-table th.text-right { text-align: right; }
.inv-table th.text-center { text-align: center; }
.inv-table td { padding: 10px 14px; border-bottom: 1px solid #eee; font-size: 13px; }
.inv-table td.text-right { text-align: right; }
.inv-table td.text-center { text-align: center; width: 50px; }
.inv-table tbody tr:nth-child(odd) { background: #fff; }
.inv-table tbody tr:nth-child(even) { background: #f8fafc; }
.inv-table .parent-row td { font-weight: 700; background: #f0f4f8 !important; border-bottom: none; }
.inv-table .parent-row td:first-child { border-left: 3px solid var(--inv-accent, #475569); }
.inv-table .child-row td { padding-left: 30px; font-size: 12px; color: #444; }
.inv-table .child-row td:first-child { border-left: 3px solid transparent; }
.inv-totals { display: flex; justify-content: flex-end; margin-bottom: 24px; }
.inv-totals-box { width: 260px; }
.inv-totals-row { display: flex; justify-content: space-between; padding: 6px 14px; font-size: 14px; }
.inv-totals-row.sub { border-bottom: 1px solid #eee; }
.inv-totals-row.tax { color: #666; }
.inv-totals-row.grand { background: var(--inv-accent, #475569); color: white; border-radius: 5px; font-size: 16px; font-weight: 700; padding: 10px 14px; margin-top: 6px; }
.inv-notes { background: #f8f9fa; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; color: #555; line-height: 1.5; }
.inv-notes-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #888; font-weight: 700; margin-bottom: 4px; }
.inv-payment { background: #f0f4f8; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
.inv-payment-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #888; font-weight: 700; margin-bottom: 4px; }
.inv-payment-info { color: #333; line-height: 1.6; white-space: pre-line; }
.inv-footer { margin-top: auto; padding-top: 16px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: flex-end; }
.inv-footer-contact p { font-size: 12px; color: #666; margin-bottom: 2px; }
.inv-footer-contact a { color: var(--inv-accent, #475569); text-decoration: none; }
.inv-footer-thanks { font-size: 14px; color: #888; font-style: italic; }
    `;
}

async function downloadPdf() {
    showToast('Generating PDF...', 'info');
    try {
        const blob = await generatePdfBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (AppState.invoice.invoiceNumber || 'invoice') + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('PDF downloaded!', 'success');
    } catch (err) {
        console.error(err);
        showToast('PDF generation failed', 'error');
    }
}

async function sharePdf() {
    if (!navigator.share) {
        showToast('Share not supported on this device', 'warning');
        return;
    }
    showToast('Generating PDF for sharing...', 'info');
    try {
        const blob = await generatePdfBlob();
        const file = new File([blob], (AppState.invoice.invoiceNumber || 'invoice') + '.pdf', { type: 'application/pdf' });
        await navigator.share({ files: [file], title: AppState.invoice.invoiceNumber || 'Invoice' });
        showToast('Shared!', 'success');
    } catch (err) {
        if (err.name !== 'AbortError') {
            showToast('Share failed', 'error');
        }
    }
}


// ═══════════════════════════════════════════════════════════════════
// HISTORY VIEW
// ═══════════════════════════════════════════════════════════════════

async function renderHistory() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="page-header">
            <h2>Invoice History</h2>
        </div>
        <div class="card">
            <div class="filter-bar">
                <select id="filterVendor">
                    <option value="">All Vendors</option>
                    ${AppState.vendors.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
                </select>
                <select id="filterStatus">
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accounting">Sent to Accounting</option>
                    <option value="pending">Pending More Details</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="disputed">Disputed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button class="btn btn-secondary btn-sm" id="applyFiltersBtn">Apply</button>
            </div>
            <div id="historyTableContainer">
                <div class="loading-spinner"><div class="spinner"></div></div>
            </div>
        </div>
    `;

    document.getElementById('applyFiltersBtn').addEventListener('click', loadHistoryTable);
    document.getElementById('filterVendor').addEventListener('change', loadHistoryTable);
    document.getElementById('filterStatus').addEventListener('change', loadHistoryTable);

    await loadHistoryTable();
}

async function loadHistoryTable() {
    const container = document.getElementById('historyTableContainer');
    container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

    const vendorId = document.getElementById('filterVendor')?.value || '';
    const status = document.getElementById('filterStatus')?.value || 'all';

    try {
        let invoices;
        // Build query based on filters
        if (vendorId && status !== 'all') {
            const snap = await db.collection('invoices')
                .where('vendorId', '==', vendorId)
                .where('status', '==', status)
                .orderBy('createdAt', 'desc')
                .limit(100).get();
            invoices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } else if (vendorId) {
            const snap = await db.collection('invoices')
                .where('vendorId', '==', vendorId)
                .orderBy('createdAt', 'desc')
                .limit(100).get();
            invoices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } else if (status !== 'all') {
            const snap = await db.collection('invoices')
                .where('status', '==', status)
                .orderBy('createdAt', 'desc')
                .limit(100).get();
            invoices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } else {
            const snap = await db.collection('invoices')
                .orderBy('createdAt', 'desc')
                .limit(100).get();
            invoices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        // Check for overdue
        const today = new Date().toISOString().split('T')[0];
        invoices.forEach(inv => {
            if (inv.dueDate && inv.dueDate < today && !['paid', 'cancelled', 'overdue'].includes(inv.status)) {
                inv._overdue = true;
            }
        });

        if (invoices.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${ICO.clock}</div>
                    <div class="empty-state-text">No invoices found</div>
                    <div class="empty-state-sub">Create your first invoice to see it here</div>
                    <a href="#invoice" class="btn btn-primary">+ New Invoice</a>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div class="data-table-wrap">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Vendor</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Due</th>
                            <th class="col-amount">Amount</th>
                            <th class="col-status">Status</th>
                            <th class="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoices.map(inv => `
                            <tr data-id="${inv.id}">
                                <td><strong>${escapeHtml(inv.invoiceNumber || '—')}</strong></td>
                                <td>${escapeHtml(inv.vendorName || '—')}</td>
                                <td>${escapeHtml(inv.clientName || '—')}</td>
                                <td>${formatDateShort(inv.invoiceDate)}</td>
                                <td>${inv._overdue ? '<span style="color:var(--danger);font-weight:600;">' + formatDateShort(inv.dueDate) + '</span>' : formatDateShort(inv.dueDate)}</td>
                                <td class="col-amount">${formatCurrency(inv.grandTotal)}</td>
                                <td class="col-status">
                                    <select class="status-select" data-id="${inv.id}" data-current="${inv.status}">
                                        <option value="draft" ${inv.status === 'draft' ? 'selected' : ''}>Draft</option>
                                        <option value="sent" ${inv.status === 'sent' ? 'selected' : ''}>Sent</option>
                                        <option value="accounting" ${inv.status === 'accounting' ? 'selected' : ''}>Accounting</option>
                                        <option value="pending" ${inv.status === 'pending' ? 'selected' : ''}>Pending</option>
                                        <option value="paid" ${inv.status === 'paid' ? 'selected' : ''}>Paid</option>
                                        <option value="overdue" ${inv.status === 'overdue' ? 'selected' : ''}>Overdue</option>
                                        <option value="disputed" ${inv.status === 'disputed' ? 'selected' : ''}>Disputed</option>
                                        <option value="cancelled" ${inv.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                                    </select>
                                </td>
                                <td class="col-actions">
                                    <button class="btn btn-ghost btn-sm edit-inv-btn" data-id="${inv.id}" title="Edit">${ICO.edit}</button>
                                    <button class="btn btn-ghost btn-sm dup-inv-btn" data-id="${inv.id}" title="Duplicate">${ICO.copy}</button>
                                    <button class="btn btn-ghost btn-sm del-inv-btn" data-id="${inv.id}" title="Delete">${ICO.trash}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // Status change handlers
        $$('.status-select', container).forEach(sel => {
            sel.addEventListener('change', async function () {
                const id = this.dataset.id;
                const newStatus = this.value;
                try {
                    await DB.updateInvoiceStatus(id, newStatus);
                    showToast('Status updated', 'success');
                } catch (err) {
                    showToast('Failed to update status', 'error');
                    this.value = this.dataset.current;
                }
            });
        });

        // Edit handlers
        $$('.edit-inv-btn', container).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.hash = 'invoice/' + btn.dataset.id;
            });
        });

        // Duplicate handlers
        $$('.dup-inv-btn', container).forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const inv = await DB.getInvoice(btn.dataset.id);
                if (inv) {
                    await loadInvoiceForEditing(btn.dataset.id);
                    AppState.editingInvoiceId = null;
                    AppState.invoice.invoiceDate = new Date().toISOString().split('T')[0];
                    AppState.invoice.status = 'draft';
                    if (AppState.invoice.vendorCode) {
                        AppState.invoice.invoiceNumber = await generateInvoiceNumber(AppState.invoice.vendorCode, AppState.invoice.invoiceDate);
                    }
                    AppState.invoice.dueDate = calcDueDate(AppState.invoice.invoiceDate, AppState.invoice.paymentTerms);
                    window.location.hash = 'invoice';
                    showToast('Invoice duplicated — edit and save', 'info');
                }
            });
        });

        // Delete handlers
        $$('.del-inv-btn', container).forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (confirm('Delete this invoice? This cannot be undone.')) {
                    try {
                        await DB.deleteInvoice(btn.dataset.id);
                        showToast('Invoice deleted', 'success');
                        loadHistoryTable();
                    } catch (err) {
                        showToast('Failed to delete', 'error');
                    }
                }
            });
        });

        // Row click to edit
        $$('.data-table tbody tr', container).forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.closest('button') || e.target.closest('select')) return;
                window.location.hash = 'invoice/' + row.dataset.id;
            });
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="empty-state"><div class="empty-state-text">Error loading invoices</div><div class="empty-state-sub">${err.message}</div></div>`;
    }
}


// ═══════════════════════════════════════════════════════════════════
// VENDOR MANAGEMENT VIEW
// ═══════════════════════════════════════════════════════════════════

function renderVendors() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="page-header">
            <h2>Vendors</h2>
            <div class="page-header-actions">
                <button class="btn btn-primary" id="addVendorBtn">+ New Vendor</button>
            </div>
        </div>
        <div id="vendorsGrid" class="entity-grid"></div>
    `;

    document.getElementById('addVendorBtn').addEventListener('click', () => openVendorModal());
    renderVendorCards();
}

function renderVendorCards() {
    const grid = document.getElementById('vendorsGrid');
    if (!grid) return;

    if (AppState.vendors.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <div class="empty-state-icon">${ICO.vendor}</div>
                <div class="empty-state-text">No vendors yet</div>
                <div class="empty-state-sub">Add your first vendor to start creating invoices</div>
            </div>`;
        return;
    }

    grid.innerHTML = AppState.vendors.map(v => `
        <div class="entity-card" data-id="${v.id}">
            <div class="entity-card-accent" style="background:${v.accentColor || '#475569'}"></div>
            <div class="entity-card-header">
                ${v.logoUrl
                    ? `<img src="${v.logoUrl}" class="entity-card-logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" alt="${escapeHtml(v.name)}"><div class="entity-card-logo-placeholder" style="display:none">${ICO.vendor}</div>`
                    : `<div class="entity-card-logo-placeholder">${ICO.vendor}</div>`}
                <div>
                    <div class="entity-card-name">${escapeHtml(v.name)}</div>
                    <div class="entity-card-code">Code: ${escapeHtml(v.code || generateVendorCode(v.name))}</div>
                </div>
            </div>
            <div class="entity-card-details">
                ${v.email ? ICO.mail + ' ' + escapeHtml(v.email) + '<br>' : ''}
                ${v.phone ? ICO.phone + ' ' + escapeHtml(v.phone) + '<br>' : ''}
                ${v.address ? escapeHtml(v.address).replace(/\n/g, ', ') : ''}
            </div>
            <div class="entity-card-actions">
                <button class="btn btn-secondary btn-sm edit-vendor-btn" data-id="${v.id}">Edit</button>
                <button class="btn btn-ghost btn-sm delete-vendor-btn" data-id="${v.id}">Delete</button>
            </div>
        </div>
    `).join('');

    $$('.edit-vendor-btn', grid).forEach(btn => {
        btn.addEventListener('click', () => {
            const vendor = AppState.vendors.find(v => v.id === btn.dataset.id);
            if (vendor) openVendorModal(vendor);
        });
    });

    $$('.delete-vendor-btn', grid).forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Delete this vendor?')) {
                try {
                    await DB.deleteVendor(btn.dataset.id);
                    AppState.vendors = await DB.getVendors();
                    renderVendorCards();
                    showToast('Vendor deleted', 'success');
                } catch (err) {
                    showToast('Failed to delete vendor', 'error');
                }
            }
        });
    });
}

const ACCENT_COLORS = [
    { hex: '#2563eb', name: 'Blue' },
    { hex: '#059669', name: 'Green' },
    { hex: '#dc2626', name: 'Red' },
    { hex: '#7c3aed', name: 'Purple' },
    { hex: '#ea580c', name: 'Orange' },
    { hex: '#0891b2', name: 'Teal' },
    { hex: '#be185d', name: 'Pink' },
    { hex: '#475569', name: 'Slate' },
    { hex: '#1a1a1a', name: 'Black' },
];

const FONT_OPTIONS = [
    { value: "'DM Sans', sans-serif", label: 'DM Sans (Modern)' },
    { value: "'Inter', sans-serif", label: 'Inter (Clean)' },
    { value: "'Roboto', sans-serif", label: 'Roboto (Professional)' },
    { value: "'Open Sans', sans-serif", label: 'Open Sans (Friendly)' },
    { value: "'Lato', sans-serif", label: 'Lato (Elegant)' },
    { value: "'Montserrat', sans-serif", label: 'Montserrat (Bold)' },
    { value: "'Poppins', sans-serif", label: 'Poppins (Geometric)' },
    { value: "'Raleway', sans-serif", label: 'Raleway (Stylish)' },
    { value: "'Source Sans 3', sans-serif", label: 'Source Sans (Adobe)' },
    { value: "'Work Sans', sans-serif", label: 'Work Sans (Neutral)' },
    { value: "'Barlow', sans-serif", label: 'Barlow (Technical)' },
    { value: "'Nunito', sans-serif", label: 'Nunito (Rounded)' },
    { value: "'Merriweather', serif", label: 'Merriweather (Classic)' },
    { value: "'Playfair Display', serif", label: 'Playfair Display (Luxury)' },
    { value: "'Libre Baskerville', serif", label: 'Libre Baskerville (Traditional)' },
    { value: "Georgia, serif", label: 'Georgia (Standard)' },
];

function openVendorModal(vendor = null) {
    const isEdit = !!vendor;
    const v = vendor || { name: '', code: '', address: '', remittanceAddress: '', email: '', phone: '', logoUrl: '', accentColor: '#475569', font: "'DM Sans', sans-serif", paymentInfo: '', defaultTaxRate: 7, defaultPaymentTerms: 'NET30', notes: '' };

    openModal(`
        <div class="modal-header">
            <h3>${isEdit ? 'Edit Vendor' : 'New Vendor'}</h3>
            <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
            <div class="form-grid">
                <div class="form-group">
                    <label>Vendor Name *</label>
                    <input type="text" id="vName" value="${escapeHtml(v.name)}" placeholder="Company name">
                </div>
                <div class="form-group">
                    <label>Vendor Code (3 letters)</label>
                    <input type="text" id="vCode" value="${escapeHtml(v.code || generateVendorCode(v.name))}" maxlength="5" placeholder="ABC" style="text-transform:uppercase">
                    <span class="form-hint">Used for invoice numbers</span>
                </div>
                <div class="form-group form-full">
                    <label>Business Address</label>
                    <textarea id="vAddress" rows="2" placeholder="123 Main St&#10;City, State ZIP">${escapeHtml(v.address)}</textarea>
                </div>
                <div class="form-group form-full">
                    <label>Remittance Address (if different)</label>
                    <textarea id="vRemittance" rows="2" placeholder="Leave blank if same as above">${escapeHtml(v.remittanceAddress)}</textarea>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="vEmail" value="${escapeHtml(v.email)}" placeholder="invoices@company.com">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" id="vPhone" value="${escapeHtml(v.phone)}" placeholder="555-555-5555">
                </div>
                <div class="form-group form-full">
                    <label>Logo URL</label>
                    <input type="text" id="vLogo" value="${escapeHtml(v.logoUrl)}" placeholder="https://res.cloudinary.com/...">
                </div>
                <div class="form-group form-full">
                    <label>Payment Information</label>
                    <textarea id="vPayment" rows="2" placeholder="Make checks payable to...">${escapeHtml(v.paymentInfo)}</textarea>
                </div>
                <div class="form-group">
                    <label>Default Tax Rate %</label>
                    <input type="number" id="vTaxRate" value="${v.defaultTaxRate ?? 7}" min="0" max="100" step="0.5">
                </div>
                <div class="form-group">
                    <label>Default Payment Terms</label>
                    <select id="vTerms">
                        <option value="DUE_ON_RECEIPT" ${v.defaultPaymentTerms === 'DUE_ON_RECEIPT' ? 'selected' : ''}>Due on Receipt</option>
                        <option value="NET15" ${v.defaultPaymentTerms === 'NET15' ? 'selected' : ''}>Net 15</option>
                        <option value="NET30" ${v.defaultPaymentTerms === 'NET30' ? 'selected' : ''}>Net 30</option>
                        <option value="NET45" ${v.defaultPaymentTerms === 'NET45' ? 'selected' : ''}>Net 45</option>
                        <option value="NET60" ${v.defaultPaymentTerms === 'NET60' ? 'selected' : ''}>Net 60</option>
                    </select>
                </div>
                <div class="form-group form-full">
                    <label>Invoice Font</label>
                    <select id="vFont">
                        ${FONT_OPTIONS.map(f => `<option value="${f.value}" ${v.font === f.value ? 'selected' : ''}>${f.label}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group form-full">
                    <label>Accent Color</label>
                    <div class="color-swatches" id="vendorColors">
                        ${ACCENT_COLORS.map(c => `<div class="color-swatch ${v.accentColor === c.hex ? 'active' : ''}" style="background:${c.hex}" data-color="${c.hex}" title="${c.name}"></div>`).join('')}
                    </div>
                    <div class="custom-color-row">
                        <span>Custom:</span>
                        <input type="color" class="color-input" id="vCustomColor" value="${v.accentColor || '#475569'}">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" id="saveVendorBtn">${isEdit ? 'Update' : 'Save'} Vendor</button>
        </div>
    `);

    // Color swatch handlers
    $$('#vendorColors .color-swatch').forEach(sw => {
        sw.addEventListener('click', function () {
            $$('#vendorColors .color-swatch').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('vCustomColor').value = this.dataset.color;
        });
    });
    document.getElementById('vCustomColor').addEventListener('input', function () {
        $$('#vendorColors .color-swatch').forEach(s => s.classList.remove('active'));
    });

    // Auto-generate code from name
    document.getElementById('vName').addEventListener('input', function () {
        const codeInput = document.getElementById('vCode');
        if (!isEdit || !codeInput.value) {
            codeInput.value = generateVendorCode(this.value);
        }
    });

    // Save handler
    document.getElementById('saveVendorBtn').addEventListener('click', async () => {
        const name = document.getElementById('vName').value.trim();
        if (!name) { showToast('Vendor name is required', 'warning'); return; }

        const activeSwatch = $('#vendorColors .color-swatch.active');
        const color = activeSwatch ? activeSwatch.dataset.color : document.getElementById('vCustomColor').value;

        const data = {
            name,
            code: document.getElementById('vCode').value.trim().toUpperCase() || generateVendorCode(name),
            address: document.getElementById('vAddress').value.trim(),
            remittanceAddress: document.getElementById('vRemittance').value.trim(),
            email: document.getElementById('vEmail').value.trim(),
            phone: document.getElementById('vPhone').value.trim(),
            logoUrl: document.getElementById('vLogo').value.trim(),
            paymentInfo: document.getElementById('vPayment').value.trim(),
            defaultTaxRate: parseFloat(document.getElementById('vTaxRate').value) || 0,
            defaultPaymentTerms: document.getElementById('vTerms').value,
            font: document.getElementById('vFont').value,
            accentColor: color,
        };

        try {
            await DB.saveVendor(data, isEdit ? vendor.id : null);
            AppState.vendors = await DB.getVendors();
            closeModal();
            showToast(isEdit ? 'Vendor updated!' : 'Vendor created!', 'success');
            if (AppState.currentView === 'vendors') renderVendorCards();
            else if (AppState.currentView === 'invoice') renderInvoiceBuilder();
        } catch (err) {
            showToast('Error saving vendor: ' + err.message, 'error');
        }
    });
}


// ═══════════════════════════════════════════════════════════════════
// CLIENT MANAGEMENT VIEW
// ═══════════════════════════════════════════════════════════════════

function renderClients() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="page-header">
            <h2>Clients</h2>
            <div class="page-header-actions">
                <button class="btn btn-primary" id="addClientBtn">+ New Client</button>
            </div>
        </div>
        <div id="clientsGrid" class="entity-grid"></div>
    `;

    document.getElementById('addClientBtn').addEventListener('click', () => openClientModal());
    renderClientCards();
}

function renderClientCards() {
    const grid = document.getElementById('clientsGrid');
    if (!grid) return;

    if (AppState.clients.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <div class="empty-state-icon">${ICO.client}</div>
                <div class="empty-state-text">No clients yet</div>
            </div>`;
        return;
    }

    grid.innerHTML = AppState.clients.map(c => `
        <div class="entity-card">
            <div class="entity-card-accent" style="background:var(--primary)"></div>
            <div class="entity-card-header">
                <div class="entity-card-logo-placeholder">${ICO.client}</div>
                <div>
                    <div class="entity-card-name">${escapeHtml(c.name)}</div>
                    ${c.isDefault ? '<span class="badge badge-sent" style="font-size:9px;">DEFAULT</span>' : ''}
                </div>
            </div>
            <div class="entity-card-details">
                ${c.address ? escapeHtml(c.address).replace(/\n/g, '<br>') + '<br>' : ''}
                ${c.contactName ? ICO.user + ' ' + escapeHtml(c.contactName) + '<br>' : ''}
                ${c.contactEmail ? ICO.mail + ' ' + escapeHtml(c.contactEmail) + '<br>' : ''}
                ${c.contactPhone ? ICO.phone + ' ' + escapeHtml(c.contactPhone) : ''}
            </div>
            <div class="entity-card-actions">
                <button class="btn btn-secondary btn-sm edit-client-btn" data-id="${c.id}">Edit</button>
                ${!c.isDefault ? `<button class="btn btn-ghost btn-sm delete-client-btn" data-id="${c.id}">Delete</button>` : ''}
            </div>
        </div>
    `).join('');

    $$('.edit-client-btn', grid).forEach(btn => {
        btn.addEventListener('click', () => {
            const client = AppState.clients.find(c => c.id === btn.dataset.id);
            if (client) openClientModal(client);
        });
    });

    $$('.delete-client-btn', grid).forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Delete this client?')) {
                try {
                    await DB.deleteClient(btn.dataset.id);
                    AppState.clients = await DB.getClients();
                    renderClientCards();
                    showToast('Client deleted', 'success');
                } catch (err) {
                    showToast('Failed to delete client', 'error');
                }
            }
        });
    });
}

function openClientModal(client = null) {
    const isEdit = !!client;
    const c = client || { name: '', address: '', contactName: '', contactEmail: '', contactPhone: '', isDefault: false };

    openModal(`
        <div class="modal-header">
            <h3>${isEdit ? 'Edit Client' : 'New Client'}</h3>
            <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
            <div class="form-grid">
                <div class="form-group form-full">
                    <label>Client / Company Name *</label>
                    <input type="text" id="cName" value="${escapeHtml(c.name)}" placeholder="Company name">
                </div>
                <div class="form-group form-full">
                    <label>Address</label>
                    <textarea id="cAddress" rows="2" placeholder="5201 W Sample Rd.&#10;Coconut Creek, FL 33073">${escapeHtml(c.address)}</textarea>
                </div>
                <div class="form-group">
                    <label>Contact Name</label>
                    <input type="text" id="cContactName" value="${escapeHtml(c.contactName)}" placeholder="Primary contact">
                </div>
                <div class="form-group">
                    <label>Contact Email</label>
                    <input type="email" id="cContactEmail" value="${escapeHtml(c.contactEmail)}" placeholder="email@company.com">
                </div>
                <div class="form-group">
                    <label>Contact Phone</label>
                    <input type="text" id="cContactPhone" value="${escapeHtml(c.contactPhone)}" placeholder="555-555-5555">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary" id="saveClientBtn">${isEdit ? 'Update' : 'Save'} Client</button>
        </div>
    `);

    document.getElementById('saveClientBtn').addEventListener('click', async () => {
        const name = document.getElementById('cName').value.trim();
        if (!name) { showToast('Client name is required', 'warning'); return; }

        const data = {
            name,
            address: document.getElementById('cAddress').value.trim(),
            contactName: document.getElementById('cContactName').value.trim(),
            contactEmail: document.getElementById('cContactEmail').value.trim(),
            contactPhone: document.getElementById('cContactPhone').value.trim(),
            isDefault: isEdit ? (c.isDefault || false) : false,
        };

        try {
            await DB.saveClient(data, isEdit ? client.id : null);
            AppState.clients = await DB.getClients();
            closeModal();
            showToast(isEdit ? 'Client updated!' : 'Client created!', 'success');
            if (AppState.currentView === 'clients') renderClientCards();
            else if (AppState.currentView === 'invoice') renderInvoiceBuilder();
        } catch (err) {
            showToast('Error saving client: ' + err.message, 'error');
        }
    });
}


// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initNavigation();
});
