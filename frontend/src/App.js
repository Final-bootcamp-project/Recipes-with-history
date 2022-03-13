import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
	createStore,
	compose,
	combineReducers,
	applyMiddleware,
} from '@reduxjs/toolkit';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import NotFound from './components/NotFound.js';
import Profile from './components/Profile.js';
import HomePage from './components/HomePage.js';
import Recipes from './components/Recipes.js';
import { HeaderMenu } from './components/Header.js';
import Footer from './components/Footer.js';

import { users } from './reducers/users.js';
import { recipe } from './reducers/recipes.js';

const reducer = combineReducers({
	user: users.reducer,
	recipe: recipe.reducer,
});

const persistedStateJSON = localStorage.getItem('myAppReduxState');
const persistedState = persistedStateJSON ? JSON.parse(persistedStateJSON) : {};

const composedEnhancers =
	(process.env.NODE_ENV !== 'production' &&
		typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	reducer,
	persistedState,
	composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
	localStorage.setItem('myAppReduxState', JSON.stringify(store.getState()));
});

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<HeaderMenu />
				<Routes>
					<Route path='/' element={<HomePage />} exact />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/recipes' element={<Recipes />} />
					<Route path='/profile/:userId' element={<Profile />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</Provider>
	);
};
export default App;
