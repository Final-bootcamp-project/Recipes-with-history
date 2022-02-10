import { Recipe } from '../models/Recipe.js';

// get 20 latest recipes
export const recipeList = async (req, res) => {
	const recipe = await Recipe.find().sort({ createdAt: 'desc' }).limit(4);
	res.status(201).json({ response: recipe, success: true });
};

// get all recipes in a list
export const allRecipes = async (req, res) => {
	const recipe = await Recipe.find().sort({ createdAt: 'desc' });
	res.status(201).json({ response: recipe, success: true });
};
