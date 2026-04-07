let cart = {}; 
let globalTotal = 0;
const myWhatsApp = "917369979705"; // Khan bhai ka number

function toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); }
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }

function searchMenu() {
    let q = document.getElementById('menuSearch').value.toLowerCase();
    document.querySelectorAll('.category-item').forEach(i => {
        let name = i.querySelector('.item-name').innerText.toLowerCase();
        i.style.display = name.includes(q) ? 'block' : 'none';
    });
}

function filterMenu(type) {
    document.querySelectorAll('.btn-f').forEach(b => b.classList.remove('active'));
    if(event) event.target.classList.add('active');
    document.querySelectorAll('.category-item').forEach(item => {
        item.style.display = (type === 'all' || item.getAttribute('data-type') === type) ? 'block' : 'none';
    });
}

function addToCart(name, price) {
    if(cart[name]) cart[name].qty++; 
    else cart[name] = { price: price, qty: 1 };
    updateUI();
}

function removeFromCart(name) {
    if(cart[name] && cart[name].qty > 1) cart[name].qty--; 
    else delete cart[name];
    updateUI();
}

function updateUI() {
    let list = document.getElementById('cart-items-list');
    let totalP = document.getElementById('cart-total-price');
    let badge = document.getElementById('cart-count');
    list.innerHTML = ""; let sub = 0; let count = 0;
    for(let name in cart) {
        sub += cart[name].price * cart[name].qty; count += cart[name].qty;
        list.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>${name}</span>
            <div><button onclick="removeFromCart('${name}')">-</button> ${cart[name].qty} <button onclick="addToCart('${name}',${cart[name].price})">+</button></div>
        </div>`;
    }
    badge.innerText = count; totalP.innerText = "₹" + sub; globalTotal = sub;
}

function openOrderPopup() {
    if(Object.keys(cart).length === 0) return alert("Bhai, cart khali hai!");
    document.getElementById('order-modal').style.display = 'flex';
}
function closeOrderPopup() { document.getElementById('order-modal').style.display = 'none'; }

// NAYA FEATURE: CALL WAITER
function callWaiter() {
    let table = prompt("Kon si table par waiter bhejna hai? (Table No. likhen)");
    if(table) {
        let msg = `*🛎️ CALL WAITER! *\n\n🪑 *Table No:* ${table}\n📢 *Message:* Customer is calling for service.\n------------------------------\n_Sent via ScanEatPro_`;
        alert("✅ Waiter ko bulaya ja raha hai...");
        window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
    }
}

// FINAL ORDER
function confirmFinalOrder() {
    let table = document.getElementById('table-no').value;
    let payment = document.getElementById('payment-mode').value;
    if(!table) return alert("Bhai, Table Number bharna zaroori hai!");

    let orderNo = Math.floor(1000 + Math.random() * 9000);
    let itemDetails = "";
    for(let name in cart) { itemDetails += `✅ *${name}* (Qty: ${cart[name].qty})\n`; }

    let fullMsg = `*--- 🥘 LAZEEZ BIRYANI ORDER ---*\n\n🆔 *Order ID:* #${orderNo}\n🪑 *Table No:* ${table}\n💰 *Total Bill:* ₹${globalTotal}\n💳 *Payment:* ${payment}\n\n*🛒 Items:*\n${itemDetails}\n------------------------------\n✨ *THANK YOU FOR ORDERING!* ✨\n\nAapka swadisht khana taiyar ho raha hai. 😊\n------------------------------\n_Order by Khan's ScanEatPro_`;

    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(fullMsg)}`, '_blank');
    cart = {}; updateUI(); closeOrderPopup();
    if(document.getElementById('cart-drawer').classList.contains('open')) toggleCart();
}