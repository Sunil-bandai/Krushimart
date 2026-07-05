import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useUIStore from '../store/uiStore';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { items, removeItem, clearCart, getTotal, updateItemQuantity } = useCartStore();
  const replaceItemsFromServer = useCartStore((s) => s.replaceItemsFromServer);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const cartTotal = getTotal();
  const getProductId = (item) => item.id || item._id;

  const handleQuantityChange = async (item, quantity) => {
    const productId = getProductId(item);
    if (!productId) return;

    updateItemQuantity(productId, quantity);

    if (!isAuthenticated) return;

    try {
      const resp = await api.put(`/cart/${productId}`, { quantity });
      if (resp.data?.data) {
        replaceItemsFromServer(resp.data.data);
      }
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  };

  const handleRemoveItem = async (item) => {
    const productId = getProductId(item);
    if (!productId) return;

    removeItem(productId);

    if (!isAuthenticated) return;

    try {
      const resp = await api.delete(`/cart/${productId}`);
      if (resp.data?.data) {
        replaceItemsFromServer(resp.data.data);
      }
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (items.length === 0) return;
    if (!deliveryAddress.trim()) {
      setAddressError('Please enter a delivery address');
      return;
    }
    setAddressError('');
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item._id || item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cartTotal,
        deliveryAddress
      };
      
      await api.post('/orders', orderData);
      await api.delete('/cart');
      clearCart();
      useUIStore.getState().showNotification('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (error) {
      console.error('Order failed:', error);
      useUIStore.getState().showNotification(error.response?.data?.message || 'Failed to place order. Please try again.', 'error');
    }
  };

  // Sync server cart when user is authenticated
  useEffect(() => {
    let mounted = true;
    const syncCart = async () => {
      if (!isAuthenticated) return;
      try {
        const resp = await api.get('/cart');
        if (mounted && resp.data?.data) {
          replaceItemsFromServer(resp.data.data);
        }
      } catch (err) {
        console.error('Failed to sync cart from server', err);
      }
    };
    syncCart();
    return () => { mounted = false };
  }, [isAuthenticated, replaceItemsFromServer]);

  if (items.length === 0) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <div className="pt-32 pb-xl px-6 max-w-container-max mx-auto text-center">
          <div className="floating-orb bg-primary w-96 h-96" style={{ top: '10%', left: '-5%' }} />
          <h1 className="font-h1 text-h1 mb-lg">Your Cart is Empty</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
            Add some fresh produce to get started.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <div className="floating-orb bg-primary w-96 h-96" style={{ top: '-10%', left: '-5%' }} />
      <div className="floating-orb bg-tertiary-container w-[500px] h-[500px]" style={{ bottom: '-10%', right: '-5%' }} />
      
      <Navbar />
      
      <main className="pt-32 pb-xl px-6 max-w-container-max mx-auto">
        <h1 className="font-h1 text-h1 mb-xl text-center">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={getProductId(item)} className="glass-panel bg-surface-container/60 rounded-xl p-4 flex gap-4">
                <img 
                  src={getImageSrc(item.image)}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-on-surface-variant text-sm">{item.category}</p>
                  <p className="text-primary font-bold mt-2">₹{item.price}/{item.unit}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button 
                    onClick={() => handleRemoveItem(item)}
                    className="text-error hover:bg-error/20 p-2 rounded-lg"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
                      className="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                      className="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel bg-surface-container/60 rounded-xl p-6 sticky top-32">
              <h2 className="font-h2 text-xl mb-lg">Order Summary</h2>
              
              <div className="space-y-4 mb-lg">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Delivery</span>
                  <span className="font-bold">₹50</span>
                </div>
                <div className="border-t border-outline-variant pt-4 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">₹{(cartTotal + 50).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-lg">
                <label className="block text-label-sm text-on-surface-variant mb-2">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => { setDeliveryAddress(e.target.value); setAddressError(''); }}
                  placeholder="Enter your delivery address..."
                  className="w-full bg-surface-variant text-on-surface rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                {addressError && <p className="text-error text-sm mt-1">{addressError}</p>}
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={!deliveryAddress}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticated ? 'Place Order' : 'Login to Order'}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
