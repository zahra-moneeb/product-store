import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, Search, Settings, Moon, Sun } from 'lucide-react'
import { toggleTheme } from '../feature/theme/themeSlice'

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items)
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className={`border-b shadow-sm ${
      theme === 'dark'
        ? 'bg-slate-950 border-slate-800'
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-2xl ring-1 flex items-center justify-center text-xl font-bold ${
              theme === 'dark'
                ? 'bg-cyan-500/20 ring-cyan-400 text-cyan-300'
                : 'bg-blue-500/20 ring-blue-400 text-blue-600'
            }`}>P</div>
            <h1 className={`text-xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>ProductStore</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${
                  theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-2xl focus:outline-none focus:ring-1 ${
                  theme === 'dark'
                    ? 'border-slate-800 bg-slate-900 text-slate-200 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 transition-colors ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            
            <Link 
              to="/cart" 
              className={`relative p-2 transition-colors ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/settings" 
              className={`p-2 transition-colors ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar