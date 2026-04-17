let cart = {}; 
let globalTotal = 0;
const myWhatsApp = "917369979705";

function toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); }
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }

function filterMenu(type) {
    document.querySelectorAll('.btn-f').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    let items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        item.style.display = (type === 'all' || item.getAttribute('data-type') === type) ? 'block' : 'none';
    });
}

function searchMenu() {
    let input = document.getElementById('menuSearch').value.toLowerCase();
    document.querySelectorAll('.category-item').forEach(item => {
        let name = item.querySelector('.item-name').innerText.toLowerCase();
        item.style.display = name.includes(input) ? "block" : "none";
    });
}

function addToCart(name, price) {
    if (cart[name]) { cart[name].qty += 1; } 
    else { cart[name] = { price: price, qty: 1 }; }
    updateUI();
}

function removeFromCart(name) {
    if (cart[name]) {
        if (cart[name].qty > 1) { cart[name].qty -= 1; } 
        else { delete cart[name]; }
    }
    updateUI();
}

function updateUI() {
    let list = document.getElementById('cart-items-list');
    let totalP = document.getElementById('cart-total-price');
    let badge = document.getElementById('cart-count');
    let footer = document.getElementById('footer-notification');
    let footerCount = document.getElementById('footer-count');
    let footerTotal = document.getElementById('footer-total');

    document.querySelectorAll('.qty-count').forEach(s => s.innerText = "0");
    list.innerHTML = ""; let sub = 0; let count = 0;

    for (let name in cart) {
        sub += cart[name].price * cart[name].qty; count += cart[name].qty;
        let label = document.getElementById(`qty-${name}`);
        if (label) label.innerText = cart[name].qty;

        list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:5px; border-bottom:1px solid #eee;">
            <span>${name} (${cart[name].qty})</span><span>₹${cart[name].price * cart[name].qty}</span>
        </div>`;
    }
    badge.innerText = count; totalP.innerText = "₹" + sub; globalTotal = sub;
    footer.style.display = (count > 0) ? 'flex' : 'none';
    if(count > 0) { footerCount.innerText = count + " Items"; footerTotal.innerText = "₹" + sub; }
}

function checkPaymentMode() {
    let mode = document.getElementById('payment-mode').value;
    document.getElementById('qr-display').style.display = (mode === 'Online') ? 'block' : 'none';
}

function callWaiter() {
    let table = prompt("Table Number?");
    if (table) window.open(`https://wa.me/${myWhatsApp}?text=🛎️ CALL WAITER! Table: ${table}`, '_blank');
}

function openOrderPopup() {
    if (Object.keys(cart).length === 0) return alert("Cart khali hai!");
    document.getElementById('order-modal').style.display = 'flex';
}
function closeOrderPopup() { document.getElementById('order-modal').style.display = 'none'; }

function confirmFinalOrder() {
    let table = document.getElementById('table-no').value;
    let pay = document.getElementById('payment-mode').value;
    if (!table) return alert("Table No daaliye!");

    let details = "*--- 🥘 LAZEEZ BIRYANI ORDER ---*\nTable: " + table + "\nPayment: " + pay + "\n\n";
    for (let name in cart) { details += `✅ ${name} (${cart[name].qty})\n`; }
    details += "\n*Total: ₹" + globalTotal + "*\n\n*Order confirm kar ka bill counter sa lalejea. Thank You!*";

    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(details)}`, '_blank');
    cart = {}; updateUI(); closeOrderPopup();
}
