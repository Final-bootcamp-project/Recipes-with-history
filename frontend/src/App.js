import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
//import CreateRecipe from './components/CreateRecipe';
//import Loader from 'components/Loader';
import NotFound from './components/NotFound.js';
import Profile from './components/Profile.js';
import HomePage from './components/HomePage.js';
import Recipes from './components/Recipes.js';

import { HeaderMenu } from './components/Header.js';

import { users } from './reducers/users.js';
import { recipe } from './reducers/recipes.js';
import { loading } from './reducers/loading.js';
import LoadingAnimation from './components/Loader.js';

const reducer = combineReducers({
	user: users.reducer,
	recipe: recipe.reducer,
	loading: loading.reducer
});

const store = configureStore({ reducer });

const App = () => {
	return (
		<Provider store={store}>
			{/*Provider can also be inside browser router*/}
			<BrowserRouter>
				{/* <LoadingAnimation /> */}
				<HeaderMenu />
				<Routes>
					{/*Works in similar way as switch*/}
					<Route path='/' element={<HomePage />} />
					<Route path='/signin' element={<SignIn />} />
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
