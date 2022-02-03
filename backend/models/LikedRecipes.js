import mongoose from "mongoose";

const LikedRecipeSchema = new mongoose.Schema({
  checkedAt: {
    type: Date,
    default: () => Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

const LikedRecipe = mongoose.model("LikedRecipe", LikedRecipeSchema);

export default LikedRecipe;