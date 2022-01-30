// Shown when signed in. Search recipe, add recipe, and show all recipes. 

import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';

import AddRecipe from './CreateRecipe';

const Recipes = () => {
  const [recipes, setRecipes] = useState("");
  

  const fetchRecipes = () => {
		fetch('http://localhost:8090/recipes')
		.then((res) => res.json())
		.then((data) => setRecipes(data))
	}
  
  return(
    <>
    <AddRecipe />
    </>
    )

};

export default Recipes;
