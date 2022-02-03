import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import styled from "styled-components";

import { StyledContainer } from './styling/StyledContainer.js';
import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';

import { recipe } from '../reducers/recipes.js';
import { API_URL } from '../utils/urls.js';

// ----------- ADD RECIPE TO

const CreateRecipe = () => {
	const [recipe, setRecipe] = useState('');
	const [title, setTitle] = useState('');
	const [cookingSteps, setCookingSteps] = useState('');
	const [ingredients, setIngredients] = useState('');

	const loading = useSelector((store) => store.loading.loading);
	// const recipes = useSelector((store) => store.recipes.items);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);

	const dispatch = useDispatch();


	const postRecipe = (accessToken, userId, recipe) => {
		return (dispatch) => {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: accessToken,
				},
				body: JSON.stringify({ recipe, user: userId }),
			};
			fetch(API_URL("/recipes/"), options)
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						console.log(data);
						dispatch(postRecipe(accessToken, userId));
						dispatch(recipe.actions.setError(null));
					} else {
						dispatch(recipe.actions.setItems([]));
						dispatch(recipe.actions.setError(data.response));
					}
				});
		};
	}
	const onPostRecipe = (accessToken, userId, recipe) => {
		dispatch(postRecipe(accessToken, userId, recipe));
		setRecipe(''); // clears the input
	};

	
	return (
		<StyledContainer>
			<div>
				<StyledForm>
					<StyledLabel>New recipe </StyledLabel>
					<input
						id='title'
						type='text'
						value={title}
						placeholder='Add title here..'
						onChange={(event) => setTitle(event.target.value)}/>
					<StyledLabel>Ingredients list </StyledLabel>
					<input
						id='ingredients'
						type='text'
						value={ingredients}
						placeholder='Add title here..'
						onChange={(event) => setIngredients(event.target.value)}/>
					<StyledLabel>Cooking steps </StyledLabel>
					<input
						id='cookingSteps'
						type='text'
						value={cookingSteps}
						placeholder='Add title here..'
						onChange={(event) => setCookingSteps(event.target.value)}/>
					<button
						type='submit'
						onClick={() => onPostRecipe(accessToken, userId, recipe)}>
						New Recipe
					</button>
				</StyledForm>
			</div>
		</StyledContainer>
	);
};

export default CreateRecipe;
