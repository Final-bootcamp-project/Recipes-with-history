import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import styled from "styled-components";
// import { Modal } from 'react-responsive-modal';

import { StyledContainer } from './styling/StyledContainer.js';
import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';
import { StyledInput } from './styling/StyledInput.js';
import { StyledButton } from './styling/StyledButton.js';

import { recipe } from '../reducers/recipes.js';
import { API_URL } from '../utils/urls.js';

// ----------- ADD RECIPE TO

const CreateRecipe = () => {
	const [recipe, setRecipe] = useState('');
	const [title, setTitle] = useState('');
	const [cookingSteps, setCookingSteps] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [open, setOpen] = useState(false);
	const [uploadedBy, setUploadedBy] = useState('');
	const [createdBy, setCreatedBy] = useState('');

	const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

	//const loading = useSelector((store) => store.loading.loading);
	// const recipes = useSelector((store) => store.recipes.items);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);

	const dispatch = useDispatch();


	const addRecipe = (accessToken, userId, recipe) => {
		return (dispatch) => {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: accessToken,
				},
				body: JSON.stringify({ recipe, user: userId }),
			};
			fetch(API_URL("/recipes"), options)
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						console.log('Nytt recept sparat!', data);
						dispatch(addRecipe(accessToken, userId));
						dispatch(recipe.actions.setError(null));
					} else {
						dispatch(recipe.actions.setRecipe([]));
						dispatch(recipe.actions.setError(data.response));
						console.log('Inget recept sparat', data.response);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
	const onAddRecipe = (accessToken, userId, recipe) => {
		dispatch(addRecipe(accessToken, userId, recipe));
		setRecipe(''); // clears the input
	};

	
	return (
		// <StyledContainer>
		<div>
			{/* Dropdown for category */}
			
				<StyledForm>
					<StyledLabel htmlFor='title'>New recipe </StyledLabel>
					<StyledInput
						id='title'
						type='text'
						value={title}
						placeholder='Add title here..'
						onChange={(event) => setTitle(event.target.value)}
						required
						/>
					<StyledLabel htmlFor='ingredients'>Ingredients list </StyledLabel>
					<StyledInput
						id='ingredients'
						type='text'
						value={ingredients}
						placeholder='Add ingredients here..'
						onChange={(event) => setIngredients(event.target.value)}
						required
						/>
					<StyledLabel htmlFor="cookingSteps">Cooking steps </StyledLabel>
					<StyledInput
						id='cookingSteps'
						type='text'
						value={cookingSteps}
						placeholder='Add cooking steps here..'
						onChange={(event) => setCookingSteps(event.target.value)}
						required
						/>

					<StyledLabel htmlFor='createdBy'>Created by: </StyledLabel>
					<StyledInput
						id='createdBy'
						type='text'
						value={createdBy}
						onChange={(event) => setCreatedBy(event.target.value)}
						placeholder='Who created the recipe?'
						required
						/>

					<StyledLabel htmlFor='uploadedBy'>Uploaded by: </StyledLabel>
					<StyledInput
						id='uploadedBy'
						type='text'
						value={username}
						readOnly
						// onChange={(event) => setUploadedBy(event.target.value)}
						// required
						/>

					<StyledButton
						type='submit'
						onClick={() => onAddRecipe(accessToken, userId, recipe)}>
						New Recipe
					</StyledButton>
				</StyledForm>
	
		</div>

	);
};

export default CreateRecipe;
