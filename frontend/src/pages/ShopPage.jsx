import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';

const defaultCategories = ['All Produce', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices', 'Other'];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Produce');
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', currentPage, activeCategory, search, maxPrice],
    queryFn: async () => {
      let url = `/products?page=${currentPage}&size=12`;
      if (activeCategory !== 'All Produce') url += `&category=${activeCategory}`;
      if (search) url += `&search=${search}`;
      if (maxPrice < 1000) url += `&maxPrice=${maxPrice}`;
      const res = await api.get(url);
      return res.data;
    }
  });

  const products = productsData?.data?.content || [];
  const totalPages = productsData?.data?.totalPages || 1;
  const categories = defaultCategories;
  const addItem = useCartStore((state) => state.addItem);
  const replaceItemsFromServer = useCartStore((state) => state.replaceItemsFromServer);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const showNotification = useUIStore((s) => s.showNotification);
  const showConfirm = useUIStore((s) => s.showConfirm);
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      {/* Background blobs */}
      <div
        className="floating-orb bg-primary w-96 h-96"
        style={{ top: '-10%', left: '-5%' }}
      />
      <div
        className="floating-orb bg-tertiary-container w-[500px] h-[500px]"
        style={{ bottom: '-10%', right: '-5%' }}
      />

      <Navbar />

      <main className="pt-32 pb-xl px-6 max-w-container-max mx-auto">
        {/* Hero Header */}
        <div className="mb-xl text-center">
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">Direct from the Soil</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Experience the intersection of traditional wisdom and modern agritech. Premium produce,
            harvested with precision, delivered to your door.
          </p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-24 z-40 mb-lg">
          <div className="glass-panel bg-surface-container/60 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-6 shadow-2xl overflow-hidden">
            {/* Category pills */}
            <div className="w-full min-w-0 md:flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <span className="text-label-sm text-primary uppercase mr-2 shrink-0">Categories</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-variant text-on-surface-variant hover:bg-primary/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search + Price + Filter */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                  placeholder="Search products..."
                  className="w-full bg-surface-variant border border-outline-variant rounded-xl pl-9 pr-4 py-2 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-[#62df7d]"
                />
                <span className="text-label-sm text-primary font-bold whitespace-nowrap">₹{maxPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter perspective-container">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-primary font-h3 animate-pulse">
              Harvesting products...
            </div>
          ) : products.length > 0 ? (
            products.map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                image={p.image}
                name={p.name}
                price={p.price}
                unit={p.unit}
                farmer={p.farmer}
                rating={p.rating}
                badge={p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                outOfStock={p.stock <= 0}
                onAddToCart={async () => {
                  try {
                    if (isAuthenticated) {
                      const resp = await api.post('/cart', { productId: p._id, quantity: 1 });
                      if (resp.data?.data) replaceItemsFromServer(resp.data.data);
                    } else {
                      addItem({ ...p, id: p._id, quantity: 1 });
                    }
                    showNotification('Added to cart', 'success');
                    showConfirm({
                      title: 'Added to Cart',
                      message: `${p.name} was added to your cart. Go to cart now?`,
                      confirmText: 'Go to Cart',
                      cancelText: 'Continue Shopping',
                      onConfirm: () => navigate('/cart'),
                    });
                  } catch (err) {
                    console.error('Add to cart failed', err);
                    // fallback to local add
                    addItem({ ...p, id: p._id, quantity: 1 });
                    showNotification('Added to cart (offline)', 'info');
                    showConfirm({
                      title: 'Added to Cart',
                      message: `${p.name} was added locally to your cart. Go to cart now?`,
                      confirmText: 'Go to Cart',
                      cancelText: 'Continue Shopping',
                      onConfirm: () => navigate('/cart'),
                    });
                  }
                }}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-on-surface-variant">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-xl flex items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-on-surface hover:bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${
                    currentPage === i
                      ? 'bg-primary text-on-primary-container shadow-[0_0_20px_rgba(98,223,125,0.3)]'
                      : 'glass-panel text-on-surface hover:bg-primary/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-on-surface hover:bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
