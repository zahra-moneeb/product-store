import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    initializeProducts: (state, action) => {
      // Only set products if the store is empty (first load)
      if (state.items.length === 0) {
        state.items = action.payload;
        state.totalItems = action.payload.length;
      }
      state.status = 'succeeded';
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.totalItems += 1;
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    },
  },
});

export const { setProducts, initializeProducts, addProduct, setLoading, setError, setCurrentPage, setItemsPerPage } = productSlice.actions;
export default productSlice.reducer;