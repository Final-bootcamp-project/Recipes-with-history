// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { StyledContainer } from './styling/StyledContainer';
import { Styledh1 } from './styling/StyledText';

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
		<StyledContainer>
			<Styledh1>Här finns alla uppladdade recept att ta del av!</Styledh1>
			<RecipeCard recipeprop={recipes} />
		</StyledContainer>
	);
};
export default Recipes;
