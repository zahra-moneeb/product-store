import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Search } from 'lucide-react'

function SearchBar({ onSearch }) {
  const theme = useSelector((state) => state.theme.mode)
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const text = e.target.value
    setValue(text)
    onSearch(text)
  }

  return (
    <div className="relative max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${
            theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
          }`} />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={handleChange}
          className={`block w-full pl-10 pr-3 py-3 border rounded-2xl focus:outline-none focus:ring-1 ${
            theme === 'dark'
              ? 'border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      </div>
    </div>
  )
}

export default SearchBar