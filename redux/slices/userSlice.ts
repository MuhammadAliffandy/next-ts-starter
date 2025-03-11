import { getCookie, setCookie } from '@//utils/helper';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: '',
    },
    reducers: {
        getUsersId: (state: any) => {
            state.value = getCookie('usersId');
        },
        setUsersId: (state , action) => {
            const userId = action.payload;
            setCookie('userId',userId,365);
            state.value = userId
        },
    },
});

export const { getUsersId, setUsersId } = userSlice.actions;
export default userSlice.reducer;
