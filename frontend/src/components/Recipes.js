// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import AddRecipe from './CreateRecipe';
import LoadingAnimation from './Loader';

import { API_URL } from '../utils/urls';

const Recipes = () => {
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	const loading = useSelector((store) => store.loading.loading);
	const recipes = useSelector((store) => store.recipes.items);

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
			})
	}, [accessToken]);

	return (
		loading === false && (
		<>
			<AddRecipe />

			{/* search function, filter on liked recipes 
      all recipes uploaded, desc */}
			{/*    <StyledButton onClick={() => logout()}>Log out</StyledButton> */}
		</>
	)
	);
};

export default Recipes;
