// core stuff here
/* 
  1. initial state for the store of this feature,
  2. reducer functions 
  3. actions associated with reducer fns
*/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  userList: [],
  status: "idle",
};

// REST API URL: https://jsonplaceholder.typicode.com/users to get users
export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers", // action type prefix
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data; // this will be payload
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUser", // action type prefix
  async (formData) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      formData
    );
    return response.data; // this will be payload
  }
);

// Let's create slice
// What's slice?
// A fn that accepts an initial state,
// an object full of reducer functions,
// and a "slice name",
// and automatically generates action creators and action types
// that correspond to the reducers and state.

export const usersSlice = createSlice({
  name: "users",
  initialState,
  // Let's have an object full of reducer functions
  reducers: {
    // reducers here
    // if you want to update store locally without connecting to rest api
    // write the logic here - this is meant for sync calls
  },
  // extraReducers here
  extraReducers: (builder) => {
    // extraReducers: A callback that receives a builder object to
    // define case reducers
    // via calls to builder.addCase(actionCreatorOrType, reducer).
    // The extrareducers field lets the slice handle actions defined elsewhere
    // including actions dispatched from other slices

    // if you want to update the store by connecting to rest api
    // write logic here - this is meant for async calls
    builder
      .addCase(fetchUsersAsync.pending, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // show the loader
        state.isLoading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // hide the loader
        state.isLoading = false;
        // update the store with userList
        state.userList = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // hide the loader
        state.isLoading = false;
        // update the store with error
        state.isError = true;
      })
      .addCase(addUserAsync.pending, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // show the loader
        state.isLoading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // hide the loader
        state.isLoading = false;
        // update the store with userList
        state.userList.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        console.log(state);
        console.log(action);
        // here we can update the store
        // hide the loader
        state.isLoading = false;
        // update the store with error
        state.isError = true;
      });
  },
});

export default usersSlice.reducer; // reducer function
