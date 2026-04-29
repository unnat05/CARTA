import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isChatOpen: boolean;
  searchQuery: string;
  activeCategory: string;
}

const initialState: UiState = {
  isChatOpen: false,
  searchQuery: '',
  activeCategory: 'All',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { toggleChat, setSearchQuery, setActiveCategory } = uiSlice.actions;
export default uiSlice.reducer;
