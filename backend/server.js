import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';

import { signUp } from './endpoints/signup.js';
import { signIn } from './endpoints/signIn.js';
import { recipeList, allRecipes } from './endpoints/recipeList.js';
import { addRecipe } from './endpoints/addRecipe.js';
import { findRecipes } from './endpoints/findRecipes.js';
import { likeRecipe } from './endpoints/likeRecipe.js';
import { userRecipes } from './endpoints/userRecipes.js';

import authenticateUser from './utils/authentication.js';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/cookbook';
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//-----------------ENDPOINTS----------------------
// app.get('/', (req, res) => {
// 	res.send('Welcome to Jessica and Rebeccas recipe bank!');
// });

app.get('/', recipeList);

//----------- ALL POSSIBLE ROUTES
app.get('/endpoints', async (req, res) => {
	res.send(listEndpoints(app));
});

//---------- USER ENDPOINTS
app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/profile/:userId', authenticateUser, userRecipes); //authenticateUser

//---------- VIEW RANDOM RECIPES ENDPOINT, GET
app.get('/recipelist', recipeList); // 20 recipes for guest user

//---------- RECIPE ENDPOINTS, GET
app.get('/recipes', authenticateUser, findRecipes); //recipes per user
app.get('/recipes', authenticateUser, allRecipes);

//---------- RECIPE ENDPOINTS, POST
app.post('/recipes', authenticateUser, addRecipe);
app.post('/recipes/:recipeId/like', authenticateUser, likeRecipe);

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
