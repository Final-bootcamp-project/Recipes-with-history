import { Recipe } from '../models/Recipe.js';

	// get 10 random recipes
	export const recipeList = async (req, res)=> {
    const recipes = await Recipe.findRandom()
		.limit(10)
		.exec(function (err, recipes) {
			console.log('hello');
		});
	res.json(recipeList);
}