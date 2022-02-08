import { Recipe } from '../models/Recipe.js';
import { User } from '../models/User.js';

export const addRecipe = async (req, res) => {
  const { user } = req.params;
    const {
      title,
      ingredients,
      cookingSteps,
      category,
      // uploadedBy,
      recipeCreator,
    } = req.body;
  
    try {
      // const queriedUser = await User.findById(user);
        
      const newRecipe = await new Recipe({
        title,
        ingredients,
        cookingSteps,
        category,
        // uploadedBy: queriedUser,
        recipeCreator,
      }).save();
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
    }
  }