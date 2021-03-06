import mongoose from 'mongoose';

//-------------- MONGOOSE SCHEMA FOR RECIPE----------
const RecipeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	ingredients: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: [
			'Breakfast',
			'Warm meal',
			'Cold meal',
			'Snack',
			'Dessert',
			'Drink',
			'Baking',
		],
	},
	cookingSteps: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
	uploadedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	recipeCreator: {
		type: String,
		required: true,
	},
});

// Mongoose model which includes the Recipe schema
export const Recipe = mongoose.model('Recipe', RecipeSchema);
