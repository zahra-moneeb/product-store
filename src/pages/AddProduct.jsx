import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct as addProductAction } from '../feature/product/productSlice'
import { addProduct } from '../services/productApi'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme.mode)

  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const newProduct = {
      id: Date.now(),
      title: e.target.title.value,
      price: Number(e.target.price.value),
      description: e.target.description.value,
      image: image,
    }

    try {
      await addProduct(newProduct)
    } catch {
      // Fake store API does not persist, so we continue with local state
    }

    dispatch(addProductAction(newProduct))
    navigate('/')
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={`rounded-[2rem] border p-8 shadow-[0_28px_80px_rgba(15,23,42,0.75)] ${
        theme === 'dark'
          ? 'border-slate-800 bg-slate-950/95'
          : 'border-gray-200 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.1)]'
      }`}>
        <div className="mb-8 space-y-3">
          <p className={`text-sm uppercase tracking-[0.3em] ${
            theme === 'dark' ? 'text-cyan-300/80' : 'text-blue-600/80'
          }`}>New Product</p>
          <h2 className={`text-3xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Add a product to your store</h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Create a polished product card that appears instantly in the store.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="title" className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-200' : 'text-gray-700'
            }`}>Product Title</label>
            <input id="title" name="title" placeholder="eg. Minimalist Lamp" required className={`rounded-3xl border px-4 py-3 shadow-sm outline-none transition focus:ring-2 ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500/20'
                : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
            }`} />
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_1fr] sm:gap-4">
            <label htmlFor="price" className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-200' : 'text-gray-700'
            }`}>Price</label>
            <input id="price" name="price" type="number" placeholder="99" required className={`rounded-3xl border px-4 py-3 shadow-sm outline-none transition focus:ring-2 ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500/20'
                : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
            }`} />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-200' : 'text-gray-700'
            }`}>Description</label>
            <textarea id="description" name="description" placeholder="Describe the product..." rows="5" className={`rounded-3xl border px-4 py-3 shadow-sm outline-none transition focus:ring-2 ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-500 focus:ring-cyan-500/20'
                : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
            }`} />
          </div>

          <div className="grid gap-2">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-200' : 'text-gray-700'
            }`}>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className={`rounded-3xl border px-4 py-3 shadow-sm outline-none ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-100'
                : 'border-gray-300 bg-white text-gray-900'
            }`} />
          </div>

          {image && (
            <div className={`overflow-hidden rounded-3xl border p-4 ${
              theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-gray-50'
            }`}>
              <img src={image} alt="preview" className="h-72 w-full object-contain" />
            </div>
          )}

          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
            Add Product
          </button>

          {error && <p className={`text-sm ${
            theme === 'dark' ? 'text-rose-400' : 'text-red-600'
          }`}>{error}</p>}
        </form>
      </div>
    </main>
  )
}

export default AddProduct