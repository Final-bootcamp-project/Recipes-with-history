import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('user')
	? {
			id: JSON.parse(localStorage.getItem('user')).id,
			username: JSON.parse(localStorage.getItem('user')).username,
			name: JSON.parse(localStorage.getItem('user')).name,
			accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
			items: [],
			error: null,
			likedRecipes: [],
			userRecipes: [],
	  }
	: {
			id: null,
			username: null,
			name: null,
			accessToken: null,
			items: [],
			errors: null,
			likedRecipes: [],
			userRecipes: [],
	  };

//every state contains of three things: name, initialState(object/array), reducers (anonymous function)
export const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		//this is built as an object, so we construct its properties, inside

		addUser: (store, action) => {
			store.items = [...store.items, action.payload];
		},
		editUser: (store, action) => {
			store.items = action.payload;
		},
		deleteUser: (store, action) => {
			store.items.splice(action.payload, 1);
		},
		setUser: (store, action) => {
			store.items = action.payload;
		},
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setName: (store, action) => {
			store.name = action.payload;
		},
		setUsername: (store, action) => {
			store.username = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		setLike: (store, action) => {
			store.likedRecipes = action.payload;
		},
		setUserRecipes: (store, action) => {
			store.userRecipes = action.payload;
		},
	},
});
