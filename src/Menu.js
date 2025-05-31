import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then((res) => {
        setMenus(res.data);
        console.log('Data menus:', res.data); // debug data dari backend
      })
      .catch((err) => console.error('Gagal fetch menu:', err));
  }, []);

  // Filter menu, tapi kalau kategori gak cocok, jangan hilangkan data
  // Buat nge-test, bisa ganti jadi cuma filter search dulu
  const filteredMenus = menus.filter(menu => {
    const matchKategori = selectedCategory === 'All' || (menu.kategori && menu.kategori.toLowerCase() === selectedCategory.toLowerCase());
    const matchSearch = menu.nama_menu && menu.nama_menu.toLowerCase().includes(searchTerm.toLowerCase());
    return matchKategori && matchSearch;
  });

  console.log('Filtered menus:', filteredMenus); // debug filtered menu

  const categories = ['All', 'Minuman', 'Makanan'];

const getImage = (fotoMenu) => {
  if (!fotoMenu) return 'http://localhost:5000/uploads/placeholder.png'; // fallback gambar
  return `http://localhost:5000/uploads/${fotoMenu}`;
};

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Menu</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Cari menu..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
      </div>

      <div className="category-filter">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredMenus.length === 0 ? (
          <p>Tidak ada menu yang ditemukan.</p>
        ) : (
          filteredMenus.map((menu, idx) => (
            <div className="menu-card" key={idx}>
             <img src={getImage(menu.foto_menu)} alt={menu.nama_menu} />
              <h3>{menu.nama_menu}</h3>
              <p>Rp {menu.harga.toLocaleString()}</p>
              <button className="order-button" onClick={() => navigate(`/detail/${menu.id_menu}`)}>+ Pesan</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
