import { configureStore} from '@reduxjs/toolkit'
import { carSlice } from './slices'

export const Store = configureStore({
    reducer: {
        car: carSlice
    },
})