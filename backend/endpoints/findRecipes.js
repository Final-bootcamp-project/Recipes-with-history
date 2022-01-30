import { Recipe } from '../models/Recipe.js';

export const findRecipes = async (req, res) => {
  const recipe = await Recipe.find({});
	res.status(201).json({ response: recipe, success: true });
}
