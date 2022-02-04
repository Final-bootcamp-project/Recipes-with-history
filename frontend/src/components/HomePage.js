// Homepage, no sign in needed. Shows 20 latest recipes
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RecipeCard } from './RecipeCard.js';
//import LoadingAnimation from './Loader';
import { recipe } from '../reducers/recipes';

//import { API_URL } from '../utils/urls.js';

const HomePage = () => {

	const dispatch = useDispatch();
	const loading = useSelector((store) => store.loading.loading);
	const recipes = useSelector((store) => store.recipe.items.length);

	useEffect(() => {
		fetchGuestRecipes();
	}, []);

	const fetchGuestRecipes = () => {
    fetch("http://localhost:8090/recipelist") 
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.success) {
          dispatch(recipe.actions.setRecipe(data.response));
          dispatch(recipe.actions.setError(null));
					//console.log(data.response)
        } else {
          dispatch(recipe.actions.setRecipe([]));
          dispatch(recipe.actions.setError(data.response));
        }
      });
	}
	return (
		//loading === false && (
			<div>
				{/* intro/welcome text */}
				<RecipeCard recipeprop={recipes} />
				<p>HERE WE WANT TO DISPLAY 20 RECIPES, FOR GUESTS</p>
			</div>
	//)
	);
};

export default HomePage;
