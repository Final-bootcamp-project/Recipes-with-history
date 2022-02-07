// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// import CreateRecipe from './CreateRecipe';
// import LoadingAnimation from './Loader';
import { RecipeCard } from './RecipeCard';
import { recipe } from '../reducers/recipes.js';
import { users } from '../reducers/users.js';

import { API_URL } from '../utils/urls';

const Recipes = () => {
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	// const loading = useSelector((store) => store.loading.loading);
	const recipes = useSelector((store) => store.recipe.items);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accessToken) {
			navigate('/signin');
			//  = if not signed in, redirects to /signin
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		fetchRecipes();
	}, [accessToken]);

	const fetchRecipes = () => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};
		fetch(API_URL('/recipes'), options)
			.then((res) => res.json())
			.then((data) => {
				console.log('hello', data);
				if (data.success) {
					dispatch(recipe.actions.setRecipe(data.response));
					dispatch(recipe.actions.setError(null));
					console.log('YES!');
				} else {
					dispatch(recipe.actions.setRecipe(null));
					dispatch(recipe.actions.setError(data.response));
					console.log('no...');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		//loading === false && (
		<div>
			{/* <CreateRecipe /> */}
			<RecipeCard recipeprop={recipes} />
			<p>hello!</p>
			{/* search function, filter on liked recipes 
      all recipes uploaded, desc */}
			{/*    <StyledButton onClick={() => logout()}>Log out</StyledButton> */}
		</div>
	);
	//);
};
export default Recipes;
