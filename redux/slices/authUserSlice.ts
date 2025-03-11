import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        setSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        resetUpdateState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
});

export const { setLoading, setSuccess, setError, resetUpdateState } = authUserSlice.actions;
export default authUserSlice.reducer;
