// Get all recipes uploaded by user
// ----------- NOT FINISHED!!!! WATCH Q&A MONDAY WEEK 1

import { Recipe } from "../models/Recipe.js";
import { User } from "../models/User.js";

// get all recipes in a list
export const userRecipes = async (req, res) => {
	const recipe = await Recipe.find().sort({ createdAt: 'desc' });
	res.status(201).json({ response: recipe, success: true });
}