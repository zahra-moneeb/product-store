import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../feature/cart/cartSlice'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'

function ProductCard({ product, view }) {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode)

  return (
    <div className={`group rounded-3xl border overflow-hidden shadow-[0_20px_70px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 ${
      view === 'list' 
        ? `flex gap-4 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`
        : theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    } ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
      {/* Product Image */}
      <div className={`${view === 'list' ? 'w-32 flex-shrink-0' : ''}`}>
        <Link to={`/product/${product.id}`}>
          <div className={`relative p-4 h-48 flex items-center justify-center ${
            theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'
          }`}>
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className={`p-4 ${view === 'list' ? 'flex-1' : ''}`}>
        {/* Brand/Category */}
        <div className={`text-xs uppercase tracking-wide mb-1 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
        }`}>
          {product.category || 'Product'}
        </div>
        
        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className={`text-base font-semibold hover:text-cyan-300 transition-colors line-clamp-2 h-10 mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {product.title}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className={`flex items-center gap-2 mb-3 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
        }`}>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < 4 ? 'text-amber-400 fill-current' : theme === 'dark' ? 'text-slate-700' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs">(4.5)</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>${product.price}</span>
          {product.price > 50 && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' 
                ? 'text-cyan-100 bg-cyan-500/15' 
                : 'text-blue-800 bg-blue-100'
            }`}>Free Shipping</span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-cyan-500 text-slate-950 py-1 px-2 rounded-lg text-xs font-semibold hover:bg-cyan-400 transition duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="h-3 w-3" />
            Add to Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className={`flex-1 text-center py-1 px-2 rounded-lg text-xs font-medium transition duration-200 ${
              theme === 'dark'
                ? 'border border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-800'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard