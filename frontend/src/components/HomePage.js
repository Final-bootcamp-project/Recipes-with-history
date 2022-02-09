// Homepage, no sign in needed. Shows 20 latest recipes
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import { RecipeCard } from './RecipeCard.js';
import { recipe } from '../reducers/recipes';

// import { API_URL } from '../utils/urls.js';

// --------------------DON'T TOUCH!! iT WORKS WITH RECIPECARD!
const HomePage = () => {

	const dispatch = useDispatch();
	const recipes = useSelector((store) => store.recipe.items);
	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		fetchGuestRecipes();
	}, []);

	const fetchGuestRecipes = () => {
		fetch('http://localhost:8090/recipelist')
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
					dispatch(recipe.actions.setRecipe(data.response));
					dispatch(recipe.actions.setError(null));
					console.log(data.response);
					})
				} else {
					batch(() => {
					dispatch(recipe.actions.setRecipe(null));
					dispatch(recipe.actions.setError(data.response));
					})
				}
			});
	};
	
	return (
			<div>
			{!accessToken ? (
				<>
				<h1>Hej och välkommen till vår sida för nya och gamla recept!</h1>
				<RecipeCard recipeprop={recipes} />
				</>
			) : (
			<>
			<RecipeCard recipeprop={recipes} />
			</>
			)}
		</div>
	);
};

export default HomePage;
