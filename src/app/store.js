import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../feature/cart/cartSlice'
import productReducer from '../feature/product/productSlice'
import themeReducer from '../feature/theme/themeSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    theme: themeReducer,
  },
})

export default store