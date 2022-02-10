import { Recipe } from '../models/Recipe.js';

// get all recipes in a list by userId
export const userRecipes = async (req, res) => {
	const { userId } = req.params;
	try {
		const recipe = await Recipe.findById(userId).sort({ createdAt: 'desc' });

		if (recipe) {
			return res.status(201).json({ response: recipe, success: true });
		} else {
			res.status(404).json({ message: 'No recipe added by user yet' });
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			success: false,
		});
	}
};
