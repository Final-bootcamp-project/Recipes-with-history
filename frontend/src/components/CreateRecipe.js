import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import styled from "styled-components";

import { StyledContainer } from './styling/StyledContainer.js';
import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';

import { recipe, postRecipe } from '../reducers/recipes.js';

// ----------- ADD RECIPE TO

const AddRecipe = () => {
	const [recipe, setRecipe] = useState('');
	const [title, setTitle] = useState('');
	const [cookingSteps, setCookingSteps] = useState('');
	const [ingredients, setIngredients] = useState('');

	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);

	const dispatch = useDispatch();

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
						onChange={(event) => setTitle(event.target.value)}></input>
					<StyledLabel>Ingredients list </StyledLabel>
					<input
						id='ingredients'
						type='text'
						value={ingredients}
						placeholder='Add title here..'
						onChange={(event) => setIngredients(event.target.value)}></input>
					<StyledLabel>Cooking steps </StyledLabel>
					<input
						id='cookingSteps'
						type='text'
						value={cookingSteps}
						placeholder='Add title here..'
						onChange={(event) => setCookingSteps(event.target.value)}></input>
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

export default AddRecipe;
