import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const LandingPage = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();

  // Fetch featured products
  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await api.get('/products?page=0&size=4');
      const data = response.data;
      return data.data?.content || data.content || [];
    }
  });

  const categories = [
    { emoji: '🥬', label: 'Leafy Greens', filter: 'Vegetables' },
    { emoji: '🍎', label: 'Fresh Fruits', filter: 'Fruits' },
    { emoji: '🥔', label: 'Root Veggies', filter: 'Vegetables' },
    { emoji: '🥛', label: 'Dairy Farm', filter: 'Dairy' },
    { emoji: '🍯', label: 'Organic Honey', filter: 'Spices' },
  ];

  const handleAddToCart = async (product) => {
    try {
      if (isAuthenticated) {
        const resp = await api.post('/cart', { productId: product._id, quantity: 1 });
        if (resp.data?.data && useCartStore.getState().replaceItemsFromServer) {
          useCartStore.getState().replaceItemsFromServer(resp.data.data);
        }
      } else {
        addItem({ ...product, id: product._id, quantity: 1 });
      }
      useUIStore.getState().showNotification('Added to cart', 'success');
    } catch (err) {
      addItem({ ...product, id: product._id, quantity: 1 });
      useUIStore.getState().showNotification('Added to cart (offline)', 'info');
    }
  };

  const howItWorks = [
    {
      icon: 'person_add',
      title: 'Register',
      desc: 'Create your account as a farmer or a buyer. Simple onboarding to get you started in minutes.',
    },
    {
      icon: 'list_alt',
      title: 'List',
      desc: 'Farmers list their harvest dates and prices. Quality checks ensure only the best reaches you.',
    },
    {
      icon: 'shopping_basket',
      title: 'Buy',
      desc: 'Securely purchase fresh produce and track your order from the farm to your doorstep.',
    },
  ];
  return (
    <div className="bg-background text-on-background overflow-x-hidden">
      <Navbar />

      <main className="relative pt-20">
        {/* Decorative glowing blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary glow-blob rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tertiary glow-blob rounded-full -z-10" />

        {/* ── Hero Section ── */}
        <section className="min-h-screen flex items-center px-6 md:px-xl py-xl max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center w-full">
            {/* Left copy */}
            <div className="space-y-md min-w-0 w-full max-w-[calc(100vw-48px)] md:max-w-none">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-sm">
                <span
                  className="material-symbols-outlined text-sm mr-2 material-fill"
                >
                  verified
                </span>
                DIRECT FARM-TO-CONSUMER
              </div>

              <h1 className="font-h1 text-4xl sm:text-h1 text-white leading-tight">
                Fresh from Farm to <br />
                <span className="text-primary italic">Your Table</span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-full sm:max-w-lg">
                Connecting farmers directly to consumers. No middlemen. Just fresh produce harvested
                at its peak and delivered to your doorstep.
              </p>

              <div className="flex flex-wrap gap-md pt-sm">
                <Link to="/auth">
                  <button className="px-xl py-md bg-primary text-on-primary font-h3 rounded-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                    Start Selling
                  </button>
                </Link>
                <Link to="/shop">
                  <button className="px-xl py-md glass-panel text-white font-h3 rounded-xl border border-white/20 hover:bg-white/10 transition-all">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Right – floating product cards */}
            <div className="perspective-container hidden md:block">
              <div className="relative w-full h-[500px]">
                {/* Card 1 – Broccoli */}
                <div className="absolute top-0 right-0 w-64 h-80 glass-panel rounded-2xl hero-tilt-card p-6 shadow-2xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSydIFg_IFxqll-6P1sfv4XZ9P7UzfaddbQG1HgtcA-IgnHixxNFZzLOfAAYJ60Wl34IuycJbPlJ8VI4yISyzd33cKFPF9FYm12WrdiEixLDCupKXw0y7wSNbWnhvLOuX-eFCKmEvAcpAGmIFqFzLiy1wbTGpRcS9C9lt2eSxWpfDUUd7Lmg-PSxGOdCpRk06MJNZ7_x5sK49vFuK0KPHmFjcKWQPOeUf6nrxtDJJ99V-DDGXjRdI0DrmuHreZ_Oqo-5Q_Mb9goA"
                    alt="Fresh Produce"
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <div className="font-h3 text-white">Fresh Broccoli</div>
                  <div className="text-primary font-bold text-xl">
                    $4.50 <span className="text-xs text-on-surface-variant font-normal">/kg</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] rounded-full">Organic</span>
                    <span className="px-2 py-1 bg-on-secondary-container/10 text-on-secondary-container text-[10px] rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Card 2 – Carrots */}
                <div
                  className="absolute bottom-10 left-0 w-64 h-80 glass-panel rounded-2xl hero-tilt-card p-6 shadow-2xl z-10 delay-100"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPi_eKSiZ8t5iCE45BbJmttS7O49P48BCWbQF80gGy3G7DCSgBfOjouXCHmK5nal9qf2tg0rIGATiBeI8-m8Q5ZwOMk_75aXhMKmoG2EKUAQRl_fcd5J1xqkwwqsgC66gdbl72Iye-WFdHvovOhuVdWy6QZPULgmCoMCMgFbA32euhgvwMaXjqlNZ1o7lEufwhPROlV5h5DW9usnYVXUkxHP7e1lpLjKgXxV1j_KnxOrFYusUi8bjhOG_Hs4DjokmVARscNjJVfg"
                    alt="Organic Carrots"
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <div className="font-h3 text-white">Organic Carrots</div>
                  <div className="text-primary font-bold text-xl">
                    $2.99 <span className="text-xs text-on-surface-variant font-normal">/bunch</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] rounded-full">Direct</span>
                    <span className="px-2 py-1 bg-on-secondary-container/10 text-on-secondary-container text-[10px] rounded-full">
                      Local
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="w-full py-lg glass-panel border-y border-white/5">
          <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-lg text-center">
            {[
              { value: '500+', label: 'Active Farmers' },
              { value: '10,000+', label: 'Fresh Products' },
              { value: '50+', label: 'Cities Served' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="text-h1 font-black text-primary">{value}</div>
                <div className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-xl px-6 max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-h2 text-h2 text-white mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {howItWorks.map(({ icon, title, desc }) => (
              <div key={title} className="glass-panel p-xl rounded-3xl hover:bg-white/5 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
                </div>
                <h3 className="font-h3 text-h3 text-white mb-sm">{title}</h3>
                <p className="text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="py-xl px-6 max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-h2 text-h2 text-white">Product Categories</h2>
              <p className="text-on-surface-variant mt-2">Explore the freshest harvest by category</p>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
            {categories.map(({ emoji, label, filter }) => (
              <div
                key={label}
                onClick={() => navigate(`/shop?category=${filter}`)}
                className="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{emoji}</div>
                <div className="font-bold text-white">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Products ── */}
        <section className="py-xl px-6 max-w-container-max mx-auto mb-xl">
          <div className="text-center mb-xl">
            <h2 className="font-h2 text-h2 text-white">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {productsLoading ? (
              <div className="col-span-full py-10 text-center text-primary animate-pulse">Loading featured products...</div>
            ) : featuredProducts?.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product._id} className="glass-panel rounded-3xl overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3 py-1 rounded-full text-xs">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-bold text-white text-lg hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                      <span className="text-primary font-bold">₹{product.price}</span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{product.description}</p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-on-surface-variant">No featured products available.</div>
            )}
          </div>
        </section>

        {/* Meet the Creators */}
        <section className="py-xl px-6 max-w-container-max mx-auto">
          <h2 className="font-h2 text-h2 text-center mb-lg">Meet the Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel bg-surface-container/60 rounded-xl p-8 border border-white/10 hover:border-primary/30 transition-colors">
              <h3 className="font-bold text-lg">Sunil Bandai</h3>
              <p className="text-primary font-bold text-sm mb-3">Admin / Full Stack</p>
              <p className="text-on-surface-variant text-sm">Designed user experiences and built responsive product pages with a focus on conversion and clarity.</p>
            </div>
            <div className="glass-panel bg-surface-container/60 rounded-xl p-8 border border-white/10 hover:border-primary/30 transition-colors">
              <h3 className="font-bold text-lg">Pramood Nandagavi</h3>
              <p className="text-primary font-bold text-sm mb-3">Backend Lead</p>
              <p className="text-on-surface-variant text-sm">Implemented APIs, authentication, and order flows to make the marketplace reliable and secure.</p>
            </div>
            <div className="glass-panel bg-surface-container/60 rounded-xl p-8 border border-white/10 hover:border-primary/30 transition-colors">
              <h3 className="font-bold text-lg">Ashish Chougule</h3>
              <p className="text-primary font-bold text-sm mb-3">Frontend Lead</p>
              <p className="text-on-surface-variant text-sm">Crafted the brand direction, UI components, and accessible layouts for a polished shopper experience.</p>
            </div>
            <div className="glass-panel bg-surface-container/60 rounded-xl p-8 border border-white/10 hover:border-primary/30 transition-colors">
              <h3 className="font-bold text-lg">Vijay</h3>
              <p className="text-primary font-bold text-sm mb-3">Database</p>
              <p className="text-on-surface-variant text-sm">Connected frontend and backend workflows, optimized data handling, and ensured the app performs smoothly.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
