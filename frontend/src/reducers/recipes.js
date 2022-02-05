import { createSlice } from '@reduxjs/toolkit';
// import { useDispatch } from "react-redux";
import uniqid from 'uniqid';
// Imported user reducer
// import { setUserId, setAccessToken } from './user';
// import { API_URL } from "../utils/urls";

// import { users } from './users.js'

export const recipe = createSlice({
	name: 'recipe',
	initialState: {
		items: [],
		title: null,
		ingredients: null,
		category: null,
		cookingSteps: null,
		isLiked: false,
		createdAt: null,
		uploadedBy: null,
		recipeCreator: null,
		error: null,
	},
	reducers: {
		addRecipe: (store, action) => {
			const data = action.payload;

			const newRecipe = {
				id: uniqid(),
				text: data,
				isLiked: false,
			};
			//store.items = [...store.items, newRecipe];
		},
		setRecipe: (store, action) => {
			store.items = action.payload;
		},
		setTitle: (store, action) => {
			store.title = action.payload;
		},
		setIngredients: (store, action) => {
			store.ingredients = action.payload;
		},
		setCategory: (store, action) => {
			store.category = action.payload;
		},
		setCookingSteps: (store, action) => {
			store.cookingSteps = action.payload;
		},
		setCreatedAt: (store, action) => {
			store.createdAt = action.payload;
		},
		setUploadedBy: (store, action) => {
			store.uploadedBy = action.payload;
		},
		setRecipeCreator: (store, action) => {
			store.recipeCreator = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		toggleRecipe: (store, action) => {
			//this will display if the like is true or false
			const updatedRecipeLike = store.isLiked.map((recipe) => {
				if (recipe.id === action.payload) {
					const updatedLike = {
						...recipe,
						isLiked: !recipe.isLiked,
					};
					return updatedLike;
				} else {
					return recipe;
				}
			});
			//store.items = updatedRecipeLike;
		},
	},
});

// Thunk fetchRecipes: getting users recipes
// Fetch user recipes for profile?????!!!!

// export const fetchRecipes = (accessToken, userId) => {
//   const dispatch = useDispatch();
//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: accessToken,
//     },
//   };

//     fetch(API_URL(`recipes/${userId}`), options) //denna behöver läggas till
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           dispatch(recipe.actions.setItems(data.response));
//           dispatch(recipe.actions.setError(null));
//         } else {
//           dispatch(recipe.actions.setItems([]));
//           dispatch(recipe.actions.setError(data.response));
//         }
//       })

// };

// // Fetch all recipes. Same as above but just /recipes?
// export const fetchGuestRecipes = () => {

//   const dispatch = useDispatch();
//   return (
//     fetch('http://localhost:8090') //denna behöver läggas till
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           dispatch(recipe.actions.setItems(data.response));
//           dispatch(recipe.actions.setError(null));
//         } else {
//           dispatch(recipe.actions.setItems([]));
//           dispatch(recipe.actions.setError(data.response));
//         }
//       })
//   )
// };

// // Post new recipe
// export const postRecipe = (accessToken, userId, recipe) => {
//   return (dispatch) => {
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: accessToken,
//       },
//       body: JSON.stringify({ recipe, user: userId }),
//     };
//     fetch(API_URL("/recipes/"), options)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           console.log(data);
//           dispatch(fetchRecipes(accessToken, userId));
//           dispatch(recipe.actions.setError(null));
//         } else {
//           dispatch(recipe.actions.setItems([]));
//           dispatch(recipe.actions.setError(data.response));
//         }
//       });
//   };
// }
