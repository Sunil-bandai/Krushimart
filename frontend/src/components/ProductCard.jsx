/**
 * ProductCard – reusable shop/landing card with tilt-hover effect
 * Props:
 *  - image: string (src URL)
 *  - name: string
 *  - price: string  (e.g. "₹450")
 *  - unit: string   (e.g. "/ 500g")
 *  - farmer: string
 *  - rating: number
 *  - badge: string  (e.g. "In Stock" | "Low Stock" | "Out of Stock")
 *  - outOfStock: bool
 *  - onAddToCart: function
 */
import { Link } from 'react-router-dom';
import { getImageSrc } from '../utils/imageUtils';

const ProductCard = ({
  id,
  image,
  name,
  price,
  unit,
  farmer,
  rating = 0,
  badge = 'In Stock',
  outOfStock = false,
  onAddToCart,
}) => {
  const displayPrice = typeof price === 'number' ? `₹${price}` : price;
  return (
    <div className="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden p-4">
        <img
          src={getImageSrc(image)}
          alt={name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute top-8 right-8 px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg ${
            outOfStock
              ? 'bg-error-container text-on-error-container'
              : 'bg-primary/90 text-on-primary-container'
          }`}
        >
          {badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
        <Link to={`/product/${id}`}>
          <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[#fbbf24] text-lg material-fill"
              >
                star
              </span>
              <span className="text-label-sm text-on-surface">{rating}</span>
            </div>
          )}
        </div>

        {farmer && (
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-sm">person</span>
            <span className="text-label-sm text-on-surface-variant">{typeof farmer === 'string' ? farmer : farmer.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-h2 font-h2 text-[#fbbf24]">{displayPrice}</span>
            <span className="text-label-sm text-on-surface-variant ml-1">{unit}</span>
          </div>

          {outOfStock ? (
            <button
              className="bg-surface-variant opacity-50 cursor-not-allowed px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              disabled
            >
              <span className="material-symbols-outlined text-base">notifications</span>
              Notify Me
            </button>
          ) : (
            <button
              onClick={onAddToCart}
              className="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
