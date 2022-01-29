import { Recipe } from '../models/Recipe.js';

export const addRecipe = async (req, res) => {
    const {
      title,
      ingredients,
      cookingSteps,
      category,
      uploadedBy,
      recipeCreator,
    } = req.body;
  
    try {
      const newRecipe = await new Recipe({
        title,
        ingredients,
        cookingSteps,
        category,
        uploadedBy,
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