import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
// import { Modal } from 'react-responsive-modal';

import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';
import { StyledInput } from './styling/StyledInput.js';
import { StyledButton } from './styling/StyledButton.js';

import { recipe } from '../reducers/recipes.js';
import { API_URL } from '../utils/urls.js';

const StyledSelect = styled.select`
	border: none;
	padding: 10px 15px;
	margin: 0 0 20px;
	height: 40px;
	display: block;
	border-radius: 5px;
	font-size: 18px;
	background-color: #d5f5f2;
	font-weight: 800;
	font-family: 'Patrick Hand', cursive;
	text-align: center;
`;

// ----------- ADD RECIPE TO

const CreateRecipe = () => {
	const [recipe, setRecipe] = useState({});
	const [title, setTitle] = useState('');
	const [cookingSteps, setCookingSteps] = useState('');
	const [ingredients, setIngredients] = useState('');
	// const [open, setOpen] = useState(false);
	// const [uploadedBy, setUploadedBy] = useState('');
	const [category, setCategory] = useState('');
	const [recipeCreator, setRecipeCreator] = useState('');

	// const onOpenModal = () => setOpen(true);
	// const onCloseModal = () => setOpen(false);

	// const loading = useSelector((store) => store.loading.loading);
	// const recipes = useSelector((store) => store.recipes.items);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);

	const dispatch = useDispatch();

	const addRecipe = (accessToken, userId, recipe) => {
		// return (dispatch) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: accessToken,
			},
			body: JSON.stringify({
				title,
				ingredients,
				cookingSteps,
				category,
				recipeCreator,
				user: userId,
			}),
		};
		fetch(API_URL('/recipes'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					// console.log('Nytt recept sparat!', data);
					batch(() => {
						dispatch(recipe.actions.addRecipe(accessToken, userId));
						dispatch(recipe.actions.setError(null));
						console.log(data);
					});
				} else {
					batch(() => {
						dispatch(recipe.actions.setRecipe([]));
						dispatch(recipe.actions.setError(data.response));
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
		// };
	};
	const onAddRecipe = (accessToken, userId, recipe) => {
		dispatch(addRecipe(accessToken, userId, recipe));
		setRecipe(''); // clears the input
	};

	return (
		<div>
			<StyledForm>
				<h2>Add new recipe </h2>
				<StyledSelect
					id='category'
					value={category}
					onChange={(event) => setCategory(event.target.value)}
					required>
					<option disabled value=''>
						Select Category:
					</option>
					<option value='Breakfast'>Breakfast</option>
					<option value='Warm meal'>Warm meal</option>
					<option value='Cold meal'>Cold meal</option>
					<option value='Snack'>Snack</option>
					<option value='Dessert'>Dessert</option>
					<option value='Drink'>Drink</option>
					<option value='Baking'>Baking</option>
				</StyledSelect>

				<StyledLabel htmlFor='title'>Recipe title </StyledLabel>
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
				<StyledLabel htmlFor='cookingSteps'>Cooking steps </StyledLabel>
				<StyledInput
					id='cookingSteps'
					type='text'
					value={cookingSteps}
					placeholder='Add cooking steps here..'
					onChange={(event) => setCookingSteps(event.target.value)}
					required
				/>

				<StyledLabel htmlFor='recipeCreator'>
					What does this recipe remind you of?{' '}
				</StyledLabel>
				<StyledInput
					id='recipeCreator'
					type='text'
					value={recipeCreator}
					onChange={(event) => setRecipeCreator(event.target.value)}
					placeholder='Memory'
					required
				/>

				<StyledLabel htmlFor='uploadedBy'>Uploaded by: </StyledLabel>
				<StyledInput id='uploadedBy' type='text' value={username} readOnly />

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
