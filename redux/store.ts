import { configureStore} from '@reduxjs/toolkit'
import { persistStore , FLUSH ,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist';
import persistedReducer from './persistedReducer';

export const Store = configureStore({
    reducer: persistedReducer,
    middleware :  (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }})
})

export type RootState = ReturnType<typeof Store.getState>
export const persistor = persistStore(Store);