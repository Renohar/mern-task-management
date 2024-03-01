import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userID: null,
  };
  
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserID: (state,action) => {
            state.userID = action.payload
        }
    }

})


export const {setUserID} = userSlice.actions
export const selectUserID = (state) => state.user.userID;

export default userSlice.reducer;