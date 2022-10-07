import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: [],
    addNewUser: {}

}

const processUserInfo = (userInfo) => {
    userInfo && userInfo.forEach((user, index) => {
        user.name = `${user.first_name} ${user.last_name}`;
        delete user.first_name;
        delete user.last_name;
    })
    return userInfo;
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userInfo = processUserInfo(action.payload.data);
        },
        addNewUser: (state, action) => {
            state.addNewUser = action.payload
        }
    }
})

export default userSlice.reducer;
export const { setUserDetails, addNewUser } = userSlice.actions;