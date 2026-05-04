import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Setting from './pages/Setting'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'

function App() {


  return (
   <BrowserRouter>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
