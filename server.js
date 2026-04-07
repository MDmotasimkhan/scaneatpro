
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Menu Data API
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: "Crispy Veg Burger", desc: "Our best-selling burger with crispy veg patty.", price: 70, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 2, name: "Veg Whopper", desc: "Our signature Whopper with 7 layers.", price: 179, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 3, name: "Chicken Whopper", desc: "Flame-grilled chicken patty with juicy tomatoes.", price: 199, image: "https://images.unsplash.com/photo-1608767221051-2b9d18f35a2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 4, name: "King Fries", desc: "The perfect, golden, crispy companion.", price: 109, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
    ];
    res.json(products);
});

// Order Receive API
app.post('/api/order', (req, res) => {
    const userOrder = req.body;
    console.log(`🔥 NAYA ORDER: ${userOrder.item} (₹${userOrder.price}) 🔥`);
    res.json({ success: true, message: "Order successfully received at backend!" });
});

app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
});