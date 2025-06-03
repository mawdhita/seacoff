const express = require('express');
const cors = require('cors');
const db = require('./db'); // koneksi MySQL

const app = express();
const port = 3001;

// Routes
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes'); // ⬅️ Tambahin ini

app.use(cors());
app.use(express.json());

// ✅ Route: Get all menu
app.get('/menus', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      console.error('Error ambil data menu:', err);
      res.status(500).json({ error: 'Gagal ambil data menu' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Route: Get detail menu by ID
app.get('/menus/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM menu WHERE id_menu = ?', [id], (err, results) => {
    if (err) {
      console.error('Gagal ambil detail menu:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Gagal ambil data menu' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Menu tidak ditemukan' });
    }
    res.json(results[0]);
  });
});

// ✅ Route: Get all orders
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Gagal ambil data orders:', err);
      return res.status(500).json({ error: 'Gagal ambil data orders' });
    }
    res.json(results);
  });
});

// ✅ Pakai rute order & cart
app.use('/api', orderRoutes);
app.use('/api/cart', cartRoutes); // ⬅️ Tambahin ini

app.use(express.static(path.join(__dirname, '../build')));

// Untuk semua route selain API, kirim index.html React build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
