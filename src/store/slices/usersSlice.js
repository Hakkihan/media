import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice ({
    name: 'users100',
    initialState: {
        ourUsersData: [],
        contentIsLoading: false,
        error1: null
    },
    reducers: {},
    extraReducers(builder) {
        //start of fetching users
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.contentIsLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.contentIsLoading = false;
            state.ourUsersData = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.contentIsLoading = false;
            state.error1 = action.error;            
        });
        //end of fetching users
        //start of adding users
        builder.addCase(addUser.pending, (state, action) => {
            state.contentIsLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.contentIsLoading = false;
            state.ourUsersData.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.contentIsLoading = false;
            state.error1 = action.error;
        });
        //end of adding users
        //start of removeUsers
        builder.addCase(removeUser.pending, (state, action) => {
            state.contentIsLoading = true;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.contentIsLoading = false;
            // state.ourUsersData fix needed
            // console.log(action);
            state.ourUsersData = state.ourUsersData.filter( user => {
                return user.id !== action.payload.id;
            });
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.contentIsLoading = false;
            state.error1 = action.error;
        });
    }
});


export const usersReducer2 = usersSlice.reducer;