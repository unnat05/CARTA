import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  bestTime: string;
}

interface ShoppingState {
  products: Product[];
  comparisonItems: Product[];
  isLoading: boolean;
}

const initialState: ShoppingState = {
  products: [],
  comparisonItems: [],
  isLoading: false,
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToComparison: (state, action: PayloadAction<Product>) => {
      if (state.comparisonItems.length < 3) {
        state.comparisonItems.push(action.payload);
      }
    },
    removeFromComparison: (state, action: PayloadAction<string>) => {
      state.comparisonItems = state.comparisonItems.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, addToComparison, removeFromComparison, setLoading } = shoppingSlice.actions;
export default shoppingSlice.reducer;
