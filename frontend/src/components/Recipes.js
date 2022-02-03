// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import AddRecipe from './CreateRecipe';
import LoadingAnimation from './Loader';
// import { fetchRecipes } from '../reducers/recipes';
import { RecipeCard } from './RecipeCard';
import { recipe } from '../reducers/recipes';

import { API_URL } from '../utils/urls';

const Recipes = () => {
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	const loading = useSelector((store) => store.loading.loading);
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

	const fetchRecipes = (accessToken, userId) => {
	
		const options = {
			method: "GET",
			headers: {
				Authorization: accessToken,
			},
		};
		fetch(API_URL(`recipes/${userId}`), options) //denna behöver läggas till
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.success) {
						dispatch(recipes.actions.setItems(data.response));
						dispatch(recipes.actions.setError(null));
					} else {
						dispatch(recipes.actions.setItems([]));
						dispatch(recipes.actions.setError(data.response));
					}
				})
	

	return (
	loading === false && (
		<>
			<AddRecipe />
			<RecipeCard recipeprop={recipes} />

			{/* search function, filter on liked recipes 
      all recipes uploaded, desc */}
			{/*    <StyledButton onClick={() => logout()}>Log out</StyledButton> */}
		</>
	)
	);
};
}
export default Recipes;
