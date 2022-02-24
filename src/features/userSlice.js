import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // userData: null,
    userData: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userInfo: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(state.userData))
        },
        logout: (state) => {
            state.userData = null;
            localStorage.setItem("userData", JSON.stringify(state.userData));
          },
    }
})

export default userSlice.reducer

export const { userInfo , logout } = userSlice.actions