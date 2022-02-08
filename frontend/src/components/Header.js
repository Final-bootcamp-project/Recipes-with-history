import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { recipe } from '../reducers/recipes';

import { StyledNavBar } from './styling/StyledNavBar';
import { StyledSearchBar } from './styling/StyledSearchBar';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 150px;
	margin-top: 0;
	margin-bottom: 20px;
	background-color: lightblue;
	color: white;
	padding: 15px;
	font-family: 'Patrick Hand', cursive;
	letter-spacing: 2px;
`;

export const HeaderMenu = () => {
	//const recipes = useSelector((store) => store.recipe.items);
	const dispatch = useDispatch();

	//const { search } = window.location;
	//const query = new URLSearchParams(search).get('s');
	//const [searchQuery, setSearchQuery] = useState(query || '');

	//const filterRecipes = (recipes, query) => {
	// 	if (!query) {
	// 		return recipes;
	// 	}

	// 	return recipes.filter((recipe) => {
	// 		const recipeName = recipe.name;
	// 		return recipeName.includes(query);
	// 	});
	// };
	//const filteredRecipes = filterRecipes(recipes, searchQuery);

	// useEffect(() => {
	// 	fetchRecipes();
	// }, []);

	// const fetchRecipes = () => {
	// 	fetch('http://localhost:8090/recipelist')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			if (data.success) {
	// 				dispatch(recipe.actions.setRecipe(data.response));
	// 				dispatch(recipe.actions.setError(null));
	// 				console.log(data.response);
	// 			} else {
	// 				dispatch(recipe.actions.setRecipe(null));
	// 				dispatch(recipe.actions.setError(data.response));
	// 			}
	// 		});
	// };

	return (
		<>
			<Header>
				<StyledNavBar />
				<h1>Saved recipes</h1>
				{/* <StyledSearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/> */}
			</Header>
		</>
	);
};
