import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import { getImageSrc } from '../utils/imageUtils';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/about' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="relative flex items-center h-[72px] px-4 md:px-6 fixed inset-x-0 top-0 z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight shadow-xl border-b border-white/20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          eco
        </span>
        <Link to="/" className="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">
          KrushiMart
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map(({ label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={
                isActive
                  ? 'text-green-500 dark:text-green-300 font-bold border-b-2 border-green-500'
                  : 'text-slate-600 dark:text-slate-300 hover:text-green-500 transition-all duration-300'
              }
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-6">
        <Link to="/cart" className="relative group cursor-pointer">
          <span className="material-symbols-outlined text-on-surface hover:text-primary transition-colors">
            shopping_cart
          </span>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link to="/orders" className="text-on-surface hover:text-primary text-sm font-medium">
              Orders
            </Link>
            {user?.role === 'farmer' && (
              <Link to="/farmer" className="text-on-surface hover:text-primary text-sm font-medium">
                Farmer
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-on-surface hover:text-primary text-sm font-medium">
                Admin
              </Link>
            )}
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={getImageSrc(user.avatar)}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <span
                  className="text-sm font-bold text-on-primary"
                  style={user?.avatar ? { display: 'none' } : { display: 'flex' }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </Link>
            <button onClick={handleLogout} className="text-on-surface hover:text-error text-sm font-medium">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-5 py-2 text-slate-300 font-semibold hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden sm:inline-flex px-5 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 active:scale-95 duration-150 hover:brightness-110 transition-all"
            >
              Register
            </Link>
            <Link
              to="/auth"
              className="sm:hidden w-10 h-10 bg-primary text-on-primary rounded-lg shadow-lg shadow-primary/20 active:scale-95 duration-150 hover:brightness-110 transition-all flex items-center justify-center"
              aria-label="Account"
            >
              <span className="material-symbols-outlined text-xl">person</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;