import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../feature/cart/cartSlice'
import { Link } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react'

function Cart() {
  const items = useSelector((state) => state.cart.items)
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className={`mb-4 inline-flex items-center gap-2 text-sm transition-colors ${
            theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Shopping Cart</h1>
            <p className={`mt-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {items.length === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="text-right">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}>Total</p>
              <p className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>${totalPrice.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className={`rounded-3xl border p-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.45)] ${
          theme === 'dark'
            ? 'border-slate-800 bg-slate-950/90'
            : 'border-gray-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.1)]'
        }`}>
          <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'
          }`}>
            <ShoppingCart className={`h-10 w-10 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
            }`} />
          </div>
          <h2 className={`mb-2 text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Your cart is empty</h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Looks like you haven't added any products yet.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            <Plus className="h-4 w-4" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className={`group rounded-2xl border p-6 shadow-[0_20px_50px_rgba(15,23,42,0.3)] transition-all hover:shadow-[0_24px_60px_rgba(15,23,42,0.45)] ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-950'
                  : 'border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.15)]'
              }`}>
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'
                  }`}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{item.title}</h3>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                        }`}>${item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className={`flex items-center rounded-2xl border text-slate-200 ${
                          theme === 'dark'
                            ? 'border-slate-800 bg-slate-900'
                            : 'border-gray-300 bg-gray-50'
                        }`}>
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className={`flex h-8 w-8 items-center justify-center rounded-l-2xl transition-colors ${
                              theme === 'dark'
                                ? 'text-slate-300 hover:bg-slate-800'
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className={`w-12 text-center font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className={`flex h-8 w-8 items-center justify-center rounded-r-2xl transition-colors ${
                              theme === 'dark'
                                ? 'text-slate-300 hover:bg-slate-800'
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-rose-400 transition-colors hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-3 text-right">
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                      }`}>Subtotal</p>
                      <p className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <div className={`rounded-2xl border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.4)] ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-950/90'
                : 'border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
            }`}>
              <h2 className={`text-xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Subtotal ({totalItems} items)</span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Shipping</span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-cyan-300' : 'text-blue-600'
                  }`}>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Tax</span>
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className={`border-t pt-3 ${
                  theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
                }`}>
                  <div className="flex justify-between">
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Total</span>
                    <span className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 font-semibold text-slate-950 shadow-sm transition-all hover:shadow-md hover:scale-105">
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Proceed to Checkout
                </div>
              </button>
              
              <Link 
                to="/" 
                className={`mt-4 block w-full rounded-xl px-6 py-3 text-center font-medium transition ${
                  theme === 'dark'
                    ? 'border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Cart