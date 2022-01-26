import mongoose from 'mongoose'


//-----------------TAGS & CATEGORY????-------------------------
//Schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.



// Mongoose schema of the recipe
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
	},
	cookingSteps: {
		type: String,
		required: true,
		trim: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	uploadedBy: {
		type: String,
		required: true,
	},
	recipeCreator: {
		type: String,
		required: true,
	},
});

// Mongoose model which includes the Recipe schema
const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;