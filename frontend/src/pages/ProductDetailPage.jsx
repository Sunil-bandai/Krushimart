import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useUIStore from '../store/uiStore';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getImageSrc } from '../utils/imageUtils';

const TABS = ['Description', 'Specifications', 'Reviews', "Farmer's Story"];

const ProductDetailPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);

  const [activeTab, setActiveTab] = useState('Description');
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [submitError, setSubmitError] = useState('');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
    queryKey: ['productReviews', id],
    queryFn: async () => {
      const response = await api.get(`/reviews/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  const addReviewMutation = useMutation({
    mutationFn: async ({ rating, comment, images }) => {
      const formData = new FormData();
      formData.append('productId', id);
      formData.append('rating', rating);
      formData.append('comment', comment);
      images.forEach((file) => formData.append('images', file));

      return api.post('/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      setComment('');
      setRating(5);
      setImages([]);
      setSubmitError('');
      queryClient.invalidateQueries({ queryKey: ['productReviews', id] });
    },
    onError: (error) => {
      setSubmitError(error.response?.data?.message || 'Could not submit review.');
    },
  });

  const handleAddToCart = () => {
    if (!product) return;
    const doAdd = async () => {
      try {
        if (isAuthenticated) {
          const resp = await api.post('/cart', { productId: product._id, quantity: qty });
          if (resp.data?.data && useCartStore.getState().replaceItemsFromServer) {
            useCartStore.getState().replaceItemsFromServer(resp.data.data);
          }
        } else {
          addItem({ ...product, id: product._id, quantity: qty, image: product.image });
        }

        useUIStore.getState().showNotification('Added to cart', 'success');
        useUIStore.getState().showConfirm({
          title: 'Added to Cart',
          message: `${product.name} was added to your cart. Go to cart now?`,
          confirmText: 'Go to Cart',
          cancelText: 'Continue Shopping',
          onConfirm: () => navigate('/cart'),
        });
      } catch (err) {
        console.error('Add to cart failed', err);
        addItem({ ...product, id: product._id, quantity: qty, image: product.image });
        useUIStore.getState().showNotification('Added to cart (offline)', 'info');
        useUIStore.getState().showConfirm({
          title: 'Added to Cart',
          message: `${product.name} was added locally to your cart. Go to cart now?`,
          confirmText: 'Go to Cart',
          cancelText: 'Continue Shopping',
          onConfirm: () => navigate('/cart'),
        });
      }
    };

    doAdd();
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []).slice(0, 3);
    setImages(files);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    setSubmitError('');

    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!comment.trim()) {
      setSubmitError('Please write your review before submitting.');
      return;
    }

    addReviewMutation.mutate({ rating, comment, images });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Loading Product...</div>;
  if (error || !product) return <div className="min-h-screen flex items-center justify-center bg-background text-error">Error loading product details</div>;

  const productImages = product.image ? [product.image] : [];
  const ratingValue = product.rating || 0;
  const reviewCount = product.numReviews || reviews.length;

  return (
    <div className="bg-background text-on-surface overflow-x-hidden relative">
      <div className="floating-orb bg-primary w-[500px] h-[500px] -top-20 -left-20" />
      <div className="floating-orb bg-tertiary-container w-[400px] h-[400px] top-1/2 -right-20" />

      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 perspective-container">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-[20px] overflow-hidden product-tilt aspect-[4/3] group relative">
              <img
                src={getImageSrc(productImages[activeThumbnail])}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-primary font-bold text-sm">
                {product.category || 'Fresh Produce'}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setActiveThumbnail(index)}
                  className={`glass-panel rounded-xl overflow-hidden transition-colors ${index === activeThumbnail ? 'border-2 border-primary' : 'hover:border-white/40'}`}
                >
                  <img src={getImageSrc(src)} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-label-sm uppercase tracking-widest text-sm">{product.farmer?.name || 'Trusted Farmer'}</span>
              <h1 className="font-h1 text-h1 text-on-surface leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-primary font-h2 text-h2">₹{product.price}</span>
                <span className="text-on-surface-variant font-body-lg text-body-lg">/ {product.unit}</span>
                <span className="bg-primary/20 text-primary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">star</span>
                <span>{ratingValue.toFixed(1)} • {reviewCount} review{reviewCount === 1 ? '' : 's'}</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors group">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                <img
                  src={getImageSrc(product.farmer?.avatar, 'https://via.placeholder.com/64')}
                  alt={product.farmer?.name || 'Farmer'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-on-surface font-bold text-lg">{product.farmer?.name || 'Harvest Partner'}</p>
                <p className="text-on-surface-variant text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {product.farmer?.address || 'Origin location available at checkout'}
                </p>
                <p className="text-on-surface-variant text-xs mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">info</span>
                  Contact details available after order placement
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="font-bold text-on-surface">Quantity</span>
                <div className="flex items-center glass-panel rounded-lg overflow-hidden h-12">
                  <button
                    className="px-4 hover:bg-white/10 transition-colors"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-12 text-center font-bold text-on-surface">{String(qty).padStart(2, '0')}</span>
                  <button
                    className="px-4 hover:bg-white/10 transition-colors"
                    onClick={() => setQty(qty + 1)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-primary-container text-on-primary-container py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">shopping_basket</span>
                  Add to Cart
                </button>
                <button
                  onClick={async () => {
                    if (!product) return;
                    try {
                      if (isAuthenticated) {
                        const resp = await api.post('/cart', { productId: product._id, quantity: qty });
                        if (resp.data?.data && useCartStore.getState().replaceItemsFromServer) {
                          useCartStore.getState().replaceItemsFromServer(resp.data.data);
                        }
                      } else {
                        addItem({ ...product, id: product._id, quantity: qty, image: product.image });
                      }
                      navigate('/cart');
                    } catch (err) {
                      addItem({ ...product, id: product._id, quantity: qty, image: product.image });
                      navigate('/cart');
                    }
                  }}
                  className="border border-primary text-primary py-4 rounded-xl font-bold hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <span className="ml-2">Buy Now</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-3 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-bold">Delivery</p>
                  <p className="text-sm font-semibold">2-3 Days</p>
                </div>
              </div>
              <div className="glass-panel p-3 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">assignment_return</span>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-bold">Returns</p>
                  <p className="text-sm font-semibold">48h Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex gap-12 border-b border-white/10 mb-12 overflow-x-auto whitespace-nowrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-bold text-lg transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'Description' && (
                <>
                  <h3 className="font-h3 text-h3 text-on-surface">Product Description</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md">
                    {product.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">info</span>
                      <span>Category: {product.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">inventory_2</span>
                      <span>Stock: {product.stock}</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Specifications' && (
                <div className="glass-panel p-6 rounded-3xl bg-surface-container-highest">
                  <h3 className="font-h3 text-h3 text-on-surface mb-6">Specifications</h3>
                  <ul className="space-y-4 text-on-surface-variant">
                    <li className="flex justify-between border-b border-white/10 pb-4">
                      <span>Product Name</span>
                      <span className="font-bold text-on-surface">{product.name}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-4">
                      <span>Weight Unit</span>
                      <span className="font-bold text-on-surface">{product.unit}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-4">
                      <span>Farmer</span>
                      <span className="font-bold text-on-surface">{product.farmer?.name || 'Local Farm'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Approval</span>
                      <span className="font-bold text-on-surface">{product.isApproved ? 'Approved' : 'Pending'}</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-h3 text-h3 text-on-surface">Customer Reviews</h3>
                    {isReviewsLoading ? (
                      <p className="text-on-surface-variant">Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                      <p className="text-on-surface-variant">No reviews yet. Be the first to review this product.</p>
                    ) : (
                      reviews.map((review) => (
                        <div key={review._id} className="glass-panel p-5 rounded-xl space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <img
                                src={review.consumerId?.avatar || 'https://via.placeholder.com/40'}
                                alt={review.consumerId?.name || 'Customer'}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-bold text-sm">{review.consumerId?.name || 'Anonymous'}</p>
                                <div className="flex text-[#fbbf24] text-xs">
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <span
                                      key={index}
                                      className={`material-symbols-outlined text-[12px] ${index < review.rating ? 'material-fill' : ''}`}
                                    >
                                      star
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] text-on-surface-variant uppercase font-bold">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-on-surface-variant italic">{review.comment}</p>
                          {review.images?.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                              {review.images.map((src, idx) => (
                                <img key={idx} src={getImageSrc(src)} alt={`Review ${idx + 1}`} className="w-full h-28 object-cover rounded-xl" />
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="glass-panel p-6 rounded-3xl bg-surface-container-highest">
                    <h4 className="font-h3 text-h3 text-on-surface mb-4">Write a Review</h4>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-label-sm text-on-surface-variant">Rating</span>
                          <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full bg-surface-variant border border-outline-variant/30 rounded-xl py-3 px-4 text-on-surface outline-none focus:border-primary"
                          >
                            {[5, 4, 3, 2, 1].map((value) => (
                              <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </label>
                        <label className="space-y-2">
                          <span className="text-label-sm text-on-surface-variant">Upload Photos</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                            onChange={handleImageChange}
                            className="w-full text-on-surface bg-surface-variant rounded-xl p-3"
                          />
                          <p className="text-xs text-on-surface-variant">Up to 3 photos.</p>
                        </label>
                      </div>

                      <label className="space-y-2">
                        <span className="text-label-sm text-on-surface-variant">Review</span>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={5}
                          placeholder="Write your experience with this product..."
                          className="w-full bg-surface-variant border border-outline-variant/30 rounded-3xl p-4 text-on-surface outline-none focus:border-primary"
                        />
                      </label>

                      {submitError && <p className="text-error text-sm">{submitError}</p>}

                      <button
                        type="submit"
                        className="bg-primary text-on-primary py-4 px-6 rounded-3xl font-bold hover:bg-primary/90 transition-colors"
                        disabled={addReviewMutation.isPending}
                      >
                        {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "Farmer's Story" && (
                <div className="space-y-6">
                  <h3 className="font-h3 text-h3 text-on-surface">Farmer's Story</h3>
                  <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md">
                    The fruit you buy here is grown with care by farmers in the Konkan and Maharashtra regions. Each harvest is hand-selected, packed, and shipped using responsible practices that preserve quality and reduce waste.
                  </p>
                  <p className="text-on-surface-variant leading-relaxed font-body-md text-body-md">
                    We partner directly with farmers to ensure fair pricing, and we celebrate every stage of the journey from seed to kitchen.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;