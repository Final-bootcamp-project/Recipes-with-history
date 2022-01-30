import { Recipe } from "../models/Recipe.js";

export const likeRecipe = async (req, res) => {
const { recipeId } = req.params;

try {
  const addLike = await Recipe.findByIdAndUpdate(
    // ID of the message to be liked/updated
    recipeId,
    // Increases like by 1
    {
      $inc: { likes: 1 },
    },
    // Returns the modified document instead of the original
    { new: true }
  );
  res
    .status(201)
    .json({ response: addLike, success: true, message: 'Recipe was liked' });
} catch (error) {
  // If above code is unsuccessful, this happens:
  res.status(400).json({
    response: error,
    success: false,
    message: 'Oh, something went wrong. Could not send like...',
  });
}}