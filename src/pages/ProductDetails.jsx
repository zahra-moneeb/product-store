import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../services/productApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../feature/cart/cartSlice'

function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode)
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  })

  if (isLoading) return <p className={`mx-auto max-w-4xl px-4 py-10 text-center text-lg ${
    theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
  }`}>Loading product...</p>
  if (isError) return <p className={`mx-auto max-w-4xl px-4 py-10 text-center text-lg ${
    theme === 'dark' ? 'text-red-600' : 'text-red-600'
  }`}>Error loading product</p>

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={`grid gap-10 rounded-[2rem] border p-8 shadow-[0_28px_80px_rgba(15,23,42,0.8)] lg:grid-cols-[420px_1fr] ${
        theme === 'dark'
          ? 'border-slate-800 bg-slate-950/95'
          : 'border-gray-200 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.1)]'
      }`}>
        <div className={`overflow-hidden rounded-[1.75rem] p-8 ${
          theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
        }`}>
          <img src={product.image} alt={product.title} className="mx-auto h-80 w-full max-w-xs object-contain" />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className={`text-sm uppercase tracking-[0.3em] ${
              theme === 'dark' ? 'text-cyan-300/70' : 'text-blue-600/70'
            }`}>Product Detail</p>
            <h1 className={`text-4xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{product.title}</h1>
            <p className={theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}>{product.description}</p>
          </div>

          <div className="space-y-4">
            <p className={`text-3xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>${product.price}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className="rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              <Link
                to="/"
                className={`rounded-full px-6 py-3 text-base font-semibold text-center transition ${
                  theme === 'dark'
                    ? 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails