// store.js
import { configureStore } from '@reduxjs/toolkit'; 
import {thunk} from 'redux-thunk'; 
import authReducer from './authReducer/reducer';

const store = configureStore({
  reducer: authReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
});

export default store;
