// store.js
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducer';

const store = configureStore({
    reducer: jobReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development mode
});

export default store;
