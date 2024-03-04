import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'cookie-ts'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: '',
    },
    reducers: {
        getCarsId: (state: any) => {
            state.value = Cookies.get('token');
        },
        setCarsId: (state , action) => {
            const token = action.payload;
            Cookies.set(  'token' , token , 1);
            state.value = token
        },
    },
});

export const { getCarsId, setCarsId } = authSlice.actions;
export default authSlice.reducer;
