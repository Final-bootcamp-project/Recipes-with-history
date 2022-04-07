import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

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
			store.items = [...store.items, newRecipe];
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
			const updatedRecipeLike = store.items.map((recipe) => {
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
			store.items = updatedRecipeLike;
		},
	},
});
