import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../services/productApi'
import { initializeProducts, setLoading, setError, setCurrentPage, setItemsPerPage } from '../feature/product/productSlice'
import { Link } from 'react-router-dom'
import { Grid, List, Package } from 'lucide-react'

function Home() {
  const dispatch = useDispatch()
  const { items: products, status, error, currentPage, itemsPerPage } = useSelector((state) => state.products)
  const theme = useSelector((state) => state.theme.mode)
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to page 1 if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(1))
    }
  }, [currentPage, totalPages, dispatch])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading())
      try {
        const data = await fetchProducts()
        dispatch(initializeProducts(data))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }
    loadProducts()
  }, [dispatch])

  if (status === 'loading') return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className={`h-12 w-12 mx-auto mb-4 animate-pulse ${
            theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
          }`} />
          <p className={theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}>Loading products...</p>
        </div>
      </div>
    </div>
  )
  
  if (status === 'failed') return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className={`rounded-[2rem] border p-8 text-center shadow-[0_20px_60px_rgba(185,28,28,0.18)] ${
        theme === 'dark'
          ? 'border-rose-500/30 bg-rose-950/60'
          : 'border-red-200 bg-red-50'
      }`}>
        <p className={theme === 'dark' ? 'text-rose-300' : 'text-red-700'}>Error loading products: {error}</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.35)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Products</h1>
            <p className="text-slate-400">
              {filteredProducts.length > 0
                ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} products`
                : 'No products found'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/add" 
              className="bg-cyan-500 text-slate-950 px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Add Product
            </Link>
            
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
                className={`px-3 py-2 rounded-2xl text-sm border transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-300 focus:border-cyan-500'
                    : 'bg-white border-gray-300 text-gray-700 focus:border-blue-500'
                }`}
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
            
            <div className="flex items-center rounded-2xl bg-slate-900 p-1 border border-slate-800">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-2xl transition ${view === 'grid' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-2xl transition ${view === 'list' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar onSearch={setSearch} />
      </div>

      {/* Products Grid */}
      <ProductList products={paginatedProducts} view={view} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Home