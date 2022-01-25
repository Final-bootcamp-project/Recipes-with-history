import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import LogIn from './components/CreateRecipe';
import SignUp from './components/SignUp';
import CreateRecipe from './components/CreateRecipe';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import Profile from 'components/Profile';
import RecipeList from 'components/RecipeList';
import Recipes from './components/Recipes';

import users from './reducers/users';
import recipes from './reducers/recipes';

const reducer = combineReducers({
	user: users.reducer,
	recipes: recipes.reducer,
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

// const App = () => {
// 	return (
// 		<div className='App'>
// 			<header className='App-header'>
// 				<img src={logo} className='App-logo' alt='logo' />
// 				<p>
// 					Edit <code>src/App.js</code> and save to reload.
// 				</p>
// 				<a
// 					className='App-link'
// 					href='https://reactjs.org'
// 					target='_blank'
// 					rel='noopener noreferrer'>
// 					Learn React
// 				</a>
// 			</header>
// 		</div>
// 	);
// };
