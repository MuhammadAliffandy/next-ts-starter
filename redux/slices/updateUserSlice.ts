import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateState {
    [key: string]: { loading: boolean; success: boolean; error: string | null };
}

const initialState: UpdateState = {};

const updateUserSlice = createSlice({
    name: "updateUser",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<string>) => {
            state[action.payload] = { loading: true, success: false, error: null };
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state[action.payload] = { loading: false, success: true, error: null };
        },
        setError: (state, action: PayloadAction<{ id: string; error: string }>) => {
            state[action.payload.id] = { loading: false, success: false, error: action.payload.error };
        },
        resetUpdateState: (state, action: PayloadAction<string>) => {
            delete state[action.payload]; 
        },
    },
});

export const { setLoading, setSuccess, setError, resetUpdateState } = updateUserSlice.actions;
export default updateUserSlice.reducer;
