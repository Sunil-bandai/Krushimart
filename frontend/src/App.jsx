import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerInventory from './pages/FarmerInventory';
import FarmerOrders from './pages/FarmerOrders';
import FarmerAnalytics from './pages/FarmerAnalytics';
import FarmerSettings from './pages/FarmerSettings';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AuthPage from './pages/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useUIStore from './store/uiStore';
import ConfirmModal from './components/ConfirmModal';
import ChatBotWidget from './components/ChatBotWidget';

const queryClient = new QueryClient();

function App() {
  const { isLoading, notification, clearNotification } = useUIStore();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {isLoading && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(98,223,125,0.4)]" />
            </div>
          )}

          {notification.message && (
            <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] px-xl py-md rounded-xl shadow-2xl flex items-center gap-md border backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 ${
              notification.type === 'success' 
                ? 'bg-primary/20 border-primary text-primary' 
                : notification.type === 'error'
                ? 'bg-error/20 border-error text-error'
                : 'bg-surface-container/80 border-outline-variant text-on-surface'
            }`}>
              <span className="material-symbols-outlined">
                {notification.type === 'success' ? 'check_circle' : notification.type === 'error' ? 'error' : 'info'}
              </span>
              <span className="font-bold">{notification.message}</span>
              <button onClick={clearNotification} className="hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          )}
          <ConfirmModal />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage defaultMode="login" />} />
            <Route path="/register" element={<AuthPage defaultMode="register" />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Routes - Logged In Users */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Protected Routes - Farmer */}
            <Route path="/farmer" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/farmer/inventory" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerInventory />
              </ProtectedRoute>
            } />
            <Route path="/farmer/orders" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerOrders />
              </ProtectedRoute>
            } />
            <Route path="/farmer/analytics" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/farmer/settings" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerSettings />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - Admin */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProducts />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOrders />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ChatBotWidget />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
