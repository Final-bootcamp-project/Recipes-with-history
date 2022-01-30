import { createSlice } from "@reduxjs/toolkit";

//every state contains of three things: name, initialState(object/array), reducers (anonymous function)
export const users = createSlice ({
    name: 'users',
    initialState: {
      userId: null,
      username: null,
      email: null,
      accessToken: null,
    },
    reducers: {//this is built as an object, so we construct its properties, inside
        addUser: (store, action) => {//we need to pass data about "what to do"
          store.items = [...store.items, action.payload]; // this makes it immutable, by making a new array
        },
        editUser: (store, action) => {
          store.items = action.payload;
        },
        deleteUser: (store, action) => {
          store.items.splice(action.payload, 1);
        },
    },
});