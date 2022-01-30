import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp.js';
//import CreateRecipe from './components/CreateRecipe';
//import Loader from 'components/Loader';
import NotFound from './components/NotFound.js';
import Profile from './components/Profile.js';
import RecipeList from './components/RecipeList.js';
import Recipes from './components/Recipes.js';

import { users } from './reducers/users.js';
import { recipe } from './reducers/recipes.js';

const reducer = combineReducers({
	user: users.reducer,
	recipe: recipe.reducer,
});

const store = configureStore({ reducer });

const App = () => {
	return (
		<Provider store={store}>
			{/*Provider can also be inside browser router*/}
			<BrowserRouter>
				<Routes>
					{/*Works in similar way as switch*/}
					<Route path='/' element={<RecipeList />} />
					<Route path='/signin' element={<LogIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/recipes' element={<Recipes />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
export default App;
