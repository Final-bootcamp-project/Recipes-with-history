import { LikedRecipe } from "../models/Recipe.js";

export const likeRecipe = async (req, res) => {
const { recipeId } = req.params;


try {
  const addLike = await Recipe.findByIdAndUpdate(
    recipeId, 
  ).save();
  console.log('Here is the console')
  res.status(201).json({ response: addLike, success: true, message: 'Recipe was liked' });
} catch (error) {
  // If above code is unsuccessful, this happens:
  res.status(400).json({
    response: error,
    success: false,
    message: 'Oh, something went wrong. Could not send like...',
  });
}}