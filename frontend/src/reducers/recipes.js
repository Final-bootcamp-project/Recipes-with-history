import { createSlice } from "@reduxjs/toolkit";
// Imported user reducer
// import { setUserId, setAccessToken } from './user';
import { API_URL } from "../utils/urls";

import { users } from './users.js'

export const recipe = createSlice({
  name: "recipe",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    toggleRecipe: (store, action) => { //this will display if the like is true or false
      const updatedRecipeLike = store.items.map((recipe) => {
        if (recipe.id === action.payload) {
          const updatedLike = {
            ...recipe, 
            isLiked: !recipe.isLiked,
          }
          return updatedLike;
        } else {
          return recipe;
        }
      })
      store.items = updatedRecipeLike;
    } 
  }
})

// Thunk fetchRecipes: getting users recipes
// Fetch user recipes for profile?????!!!! 

export const fetchRecipes = (accessToken, userId) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`recipes/${userId}`), options) //denna behöver läggas till
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(recipe.actions.setItems(data.response));
          dispatch(recipe.actions.setError(null));
        } else {
          dispatch(recipe.actions.setItems([]));
          dispatch(recipe.actions.setError(data.response));
        }
      });
  };
};

// Fetch all recipes. Same as above but just /recipes?
export const fetchGuestRecipes = () => {
  return (dispatch) => {

    fetch('http://localhost:8090') //denna behöver läggas till
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(recipe.actions.setItems(data.response));
          dispatch(recipe.actions.setError(null));
        } else {
          dispatch(recipe.actions.setItems([]));
          dispatch(recipe.actions.setError(data.response));
        }
      });
}};


// Post new recipe
export const postRecipe = (accessToken, userId, recipe) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ recipe, user: userId }),
    };
    fetch(API_URL("/recipes/"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          dispatch(fetchRecipes(accessToken, userId));
          dispatch(recipe.actions.setError(null));
        } else {
          dispatch(recipe.actions.setItems([]));
          dispatch(recipe.actions.setError(data.response));
        }
      });
  };
}
