// Homepage. Shows 20 latest recipes
import React, { useState, useEffect } from 'react';

import { RecipeCard } from './RecipeCard.js'

const RecipeList = ({ recipe }) => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		fetchRecipes();
	}, []);

	const fetchRecipes = () => {
		//setLoading(true)
		fetch('http://localhost:8090/recipelist')
		.then((res) => res.json())
		.then((data) => setRecipes(data))
		//.finally //setLoading(true)
	}
	return (
			<div>
				<RecipeCard recipes={recipes} />
				<p>HERE WE WANT TO DISPLAY 20 RECIPES, FOR GUESTS</p>
			</div>
	);
};

export default RecipeList;
