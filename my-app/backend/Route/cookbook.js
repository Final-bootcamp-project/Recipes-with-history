import express from 'express';
import listEndPoints from 'express-list-endpoints'; // for listing all routes
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//-------------importing models----------------//
import User from '../models/users';
import Recipe from '../models/recipes';
import authenticateUser from '../utils/authentication';

const app = express.Router();

//---------------------database ---------------------------//

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/cookbook';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, //vad är det här?
});
mongoose.Promise = Promise;

//-----------------ENDPOINTS----------------------
app.get('/', (req, res) => {
	res.send('Welcome to Jessica and Rebeccas recipe bank!');
});

//OK//--------------Sign up--------------
app.post('/signup', async (req, res) => {
	const { name, email, username, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		console.log('hello');
		// a condition for creating a password
		if (password.length < 6 && username.length < 5) {
			console.log('hello');
			//redirecting to catch
			throw 'Password must be at least 6 characters long and username must be longer than 5 characters';
		}
		const newUser = await new User({
			name,
			username,
			email,
			password: bcrypt.hashSync(password, salt),
		}).save();
		res.status(201).json({
			response: { username: newUser.username, id: newUser._id },
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: {
				error, 
				message: 'No user could be created' },
			success: false,

		});
	}
});

//OK//-------------- Log in--------------
app.post('/signin', async (req, res) => {
	const { username, password } = req.body; //object destructuring
	try {
		const user = await User.findOne({ username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				response: {
					userId: user._id,
					username: user.username,
					accessToken: user.accessToken,
				},
				success: true,
			});
		} else {
			res.status(404).json({
				response: 'User not found or password does not match',
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			success: false,
		});
	}
});

//OK//--------------Recipes without signing in--------------
// Endpoint to return 10 random recipes
app.get('/recipeList', async (req, res) => {
	// get 10 random recipes
	const recipeList = await Recipe.findRandom()
		.limit(10)
		.exec(function (err, recipes) {
			console.log('hello');
		});
	res.json(recipeList);
});

//--------------Authentication test--------------
app.get('/recipes', authenticateUser);
app.get('/recipes', async (req, res) => {
	const recipe = await Recipe.find({});
	res.status(201).json({ response: recipe, success: true });
});

//OK//--------------Post new recipe--------------
// Endpoint to post new recipe
app.post('/recipes', async (req, res) => {
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
});

//OK//--------------Like recipe--------------
// Endpoint to like message
app.post('/recipes/:recipeId/like', async (req, res) => {
	const { recipeId } = req.params;

	try {
		const addLike = await Recipe.findByIdAndUpdate(
			// ID of the message to be liked/updated. MANDATORY parameter, what ID the object has!
			recipeId,
			// Increases hearts by 1. MANDATORY parameter, how to update the object!
			{
				$inc: { likes: 1 },
			},
			// Returns the modified document instead of the original. OPTIONAL parameter!
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
	}
});

export default app;
