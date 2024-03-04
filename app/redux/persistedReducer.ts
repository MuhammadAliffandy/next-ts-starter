// persistedReducer.js
import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import carReducer from './slices/carSlice'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, carReducer); 

export default persistedReducer;
