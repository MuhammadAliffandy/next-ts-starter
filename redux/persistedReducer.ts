import { persistReducer } from 'redux-persist';
import storage from './storage'; 
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import updateUserReducer from './slices/updateUserSlice'
import authUserReducer from './slices/authUserSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
    authUser: authUserReducer,
    updateUser: updateUserReducer,
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export default persistedReducer;
