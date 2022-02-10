// Homepage, no sign in needed. Shows 20 latest recipes
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import { Styledh1 } from './styling/StyledText';
import { StyledContainer } from './styling/StyledContainer'
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
			<StyledContainer>
			{!accessToken ? (
			<>
				<Styledh1>Hej & välkommen! <br/>Här får du ta del av de senaste 20 recepten som lagts till i vår samling,<br/> för nya & gamla recept!</Styledh1>
				<RecipeCard recipeprop={recipes} />
			</>
			) : (
			<>
				<Styledh1>Home, <br/>Här finns alla uppladdade recept att ta del av!</Styledh1>
				<RecipeCard recipeprop={recipes} />
			</>
			)}
		</StyledContainer>
	);
};

export default HomePage;
