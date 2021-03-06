// Shown when signed in. Search recipe, add recipe, and show all recipes.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { StyledContainer } from './styling/StyledContainer';
import { Styledh1 } from './styling/StyledText';

import { RecipeCard } from './RecipeCard';
import { recipe } from '../reducers/recipes.js';

import { API_URL } from '../utils/urls';

const Recipes = () => {
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);
	const recipes = useSelector((store) => store.recipe.items);
	const dispatch = useDispatch();

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
		fetch(API_URL('recipes'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(recipe.actions.setRecipe(data.response));
					dispatch(recipe.actions.setError(null));
				} else {
					dispatch(recipe.actions.setRecipe(null));
					dispatch(recipe.actions.setError(data.response));
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [accessToken, dispatch]);

	return (
		<StyledContainer>
			<Styledh1>Här finns alla uppladdade recept att ta del av!</Styledh1>
			<RecipeCard recipeprop={recipes} />
		</StyledContainer>
	);
};
export default Recipes;
