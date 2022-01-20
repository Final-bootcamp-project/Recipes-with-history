// om vi ändrar namn på projektet, kom ihåg att ändra namn i package.json!!!!

// Ladda ner npm i mongoose-random

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/recipeBank';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

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
    required: true
  },
  recipeCreator: {
    type: String,
    required: true
  }
});
//-----------------PICTURE UPLOAD VIA MOLTER????---------------
//-----------------TAGS & CATEGORY????-------------------------
//Schema.plugin(random, { path: 'r' }); // by default `path` is `random`. It's used internally to store a random value on each doc.




// Mongoose model which includes the Recipe schema
const Recipe = mongoose.model('Recipe', RecipeSchema);

// Mongoose schema for user
const UserSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true
  },    
  username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
});

const User = mongoose.model('User', UserSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//A shield asking for accessToken
const authenticateUser = async (req, res, next) => {
	const accessToken = req.header('Authorization');
	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({ response: 'Please log in', success: false });
		}
	} catch (err) {
		res.status(400).json({ response: error, success: false });
	}
};

// Start defining your routes here
app.get('/', (req, res) => {
	res.send(
		'Welcome to Jessica and Rebeccas recipe bank!'
	);
});



//OK//--------------Sign up-------------- 
app.post('/signup', async (req, res) => {
	const { name, email, username, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		//a condition for creating a password
		if (password.length < 6 && username.length < 5) {
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
      response: { name: newUser.username, id: newUser._id },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false, message: 'New user could not be created' });
  }
});

//OK//--------------Recipes without signing in-------------- 
// Endpoint to return 10 random recipes
app.get('/recipeList', async (req, res) => {
	// get 10 random recipes
	const recipeList = await Recipe.findRandom()
		.limit(10)
    .exec(function (err, recipes) {
      console.log(recipes);
    });
	res.json(recipeList);
});

//--------------Authentication test--------------
app.get('/recipes', authenticateUser);
app.get('/recipes', async (req, res) => {
	const recipe = await Recipe.find({});
	res.status(201).json({ response: secrets, success: true });
});

//OK//--------------Post new recipe-------------- 
// Endpoint to post new recipe
app.post('/recipes', async (req, res) => {
	const { title, ingredients, cookingSteps, category, uploadedBy, recipeCreator } = req.body;

	try {
		const newRecipe = await new Recipe({ title, ingredients, cookingSteps, category, uploadedBy, recipeCreator }).save();

		//If successful, status code = successful:
		res.status(201).json({ response: newThought, success: true, message: 'New recipe was created' });
	} catch (error) {
		// If above code is unsuccessful, status code = bad request:
		res.status(400).json({ response: error, success: false, message: 'Recipe could not be created, please try again' });
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
		res.status(201).json({ response: addLike, success: true, message: 'Recipe was liked' });
	} catch (error) {
		// If above code is unsuccessful, this happens:
		res.status(400).json({ response: error, success: false, message: 'Oh, something went wrong. Could not send like...' });
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port}`);
});
