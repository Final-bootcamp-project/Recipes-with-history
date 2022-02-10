import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyledNavBar } from './styling/StyledNavBar';
import { Styledh1 } from './styling/StyledText';
//import { StyledSearchBar } from './styling/StyledSearchBar';
//import { recipe } from '../reducers/recipes';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 150px;
	margin-top: 0;
	margin-bottom: 20px;
	background-color: lightblue;
	color: black;
	padding: 15px;
	font-family: 'Patrick Hand', cursive;
	letter-spacing: 2px;

	@media (max-width: 767px) {
		h1 {
			display: none;
		}
	}
`;

export const HeaderMenu = () => {
	// const dispatch = useDispatch();
	//const recipes = useSelector((store) => store.recipe.items);
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
				<Styledh1>Recipes with memories</Styledh1>
				{/* <StyledSearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/> */}
			</Header>
		</>
	);
};
