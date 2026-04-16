let cart = {}; 
const myWhatsApp = "917369979705";

function toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); }
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); }

// VEG / NON-VEG FILTER WAPAS AA GAYA
function filterMenu(type) {
    document.querySelectorAll('.btn-f').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        if (type === 'all' || item.getAttribute('data-type') === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function searchMenu() {
    let input = document.getElementById('menuSearch').value.toLowerCase();
    let items = document.querySelectorAll('.category-item');
    items.forEach(item => {
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

    list.innerHTML = "";
    let totalAmount = 0;
    let totalItems = 0;

    for (let name in cart) {
        let item = cart[name];
        totalAmount += item.price * item.qty;
        totalItems += item.qty;

        let menuLabel = document.getElementById(`qty-${name}`);
        if (menuLabel) menuLabel.innerText = item.qty;

        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:5px; border-bottom:1px solid #eee;">
                <span>${name} x ${item.qty}</span>
                <span>₹${item.price * item.qty}</span>
            </div>`;
    }

    badge.innerText = totalItems;
    totalP.innerText = "₹" + totalAmount;

    if (totalItems > 0) {
        footer.style.display = 'flex';
        footerCount.innerText = totalItems + " Items";
        footerTotal.innerText = "₹" + totalAmount;
    } else {
        footer.style.display = 'none';
    }
}

function callWaiter() {
    let table = prompt("Table Number?");
    if (table) { window.open(`https://wa.me/${myWhatsApp}?text=🛎️ CALL WAITER! Table: ${table}`, '_blank'); }
}

function openOrderPopup() {
    if (Object.keys(cart).length === 0) return alert("Cart khali hai!");
    document.getElementById('order-modal').style.display = 'flex';
}

function closeOrderPopup() { document.getElementById('order-modal').style.display = 'none'; }

function confirmFinalOrder() {
    let table = document.getElementById('table-no').value;
    let pay = document.getElementById('payment-mode').value;
    if (!table) return alert("Table Number bhariye!");

    let details = "*--- ORDER ---*\nTable: " + table + "\nPayment: " + pay + "\n\n";
    let total = 0;
    for (let name in cart) {
        details += `✅ ${name} (${cart[name].qty})\n`;
        total += cart[name].price * cart[name].qty;
    }
    details += "\n*Total: ₹" + total + "*";

    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(details)}`, '_blank');
    cart = {}; updateUI(); closeOrderPopup();
}
