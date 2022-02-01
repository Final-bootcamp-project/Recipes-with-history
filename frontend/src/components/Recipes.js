// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import AddRecipe from './CreateRecipe';

import { API_URL } from '../utils/urls';

const Recipes = () => {
	const [recipes, setRecipes] = useState('');

	// const fetchRecipes = () => {
	// 	fetch('http://localhost:8090/recipes')
	// 		.then((res) => res.json())
	// 		.then((data) => setRecipes(data));
	// };

	// ------------- Rebeccas add
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	// const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken) {
			navigate('/signin');
			//  = if not signed in, redirects to /signin
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(API_URL('/recipes'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setRecipes(data.response.recipe);
					// recipes = fetched data;
				}
			});
	}, [accessToken]);

	// Log out function. Clears all user details from store.
	// const logout = () => {
	// 	batch(() => {
	// 		dispatch(user.actions.setUsername(null));
	// 		dispatch(user.actions.setUserId(null));
	// 		dispatch(user.actions.setAccessToken(null));
	// 		dispatch(user.actions.setError(null));
	// 	});
	// };

	return (
		<>
			<AddRecipe />

			{/* search function, filter on liked recipes 
      all recipes uploaded, desc */}
			{/*    <StyledButton onClick={() => logout()}>Log out</StyledButton> */}
		</>
	);
};

export default Recipes;
