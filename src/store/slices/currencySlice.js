import { createSlice } from '@reduxjs/toolkit';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.12 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 151.37 },
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selected: JSON.parse(localStorage.getItem('currency')) || 'USD',
    currencies,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem('currency', JSON.stringify(action.payload));
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer; 