import { Recipe } from '../models/Recipe.js';
import { User } from '../models/User.js';

export const addRecipe = async (req, res) => {
	const {
		title,
		ingredients,
		cookingSteps,
		category,
		uploadedBy,
		recipeCreator,
	} = req.body;

	console.log(req.body, 'första');
	try {
		const user = await User.findOne({
			accessToken: req.header('Authorization'),
		});

		const newRecipe = await new Recipe({
			title,
			ingredients,
			cookingSteps,
			category,
			uploadedBy: user,
			recipeCreator,
		}).save();
		console.log(newRecipe, 'andra');
		//If successful, status code = successful:
		res.status(201).json({
			response: newRecipe,
			success: true,
			message: 'New recipe was created',
		});
	} catch (error) {
		// If above code is unsuccessful, status code = bad request:
		res.status(400).json({
			response: error,
			success: false,
			message: 'Recipe could not be created, please try again',
		});
		console.log(error, 'tredje');
	}
};
