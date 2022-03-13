import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';
import { StyledInput } from './styling/StyledInput.js';
import { StyledButton } from './styling/StyledButton.js';
import { StyledSelect } from './styling/StyledSelect.js';

import { recipe } from '../reducers/recipes';
import { API_URL } from '../utils/urls.js';

// ----------- ADD RECIPE TO

const CreateRecipe = () => {
	const [newRecipe, setNewRecipe] = useState({});
	const [title, setTitle] = useState('');
	const [cookingSteps, setCookingSteps] = useState('');
	const [ingredients, setIngredients] = useState('');

	const [category, setCategory] = useState('');
	const [recipeCreator, setRecipeCreator] = useState('');

	const accessToken = useSelector((store) => store.user.accessToken);
	const userId = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);

	const dispatch = useDispatch();

	const addRecipe = (accessToken, userId) => {
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
					batch(() => {
						dispatch(recipe.actions.addRecipe(accessToken, userId()));
						dispatch(recipe.actions.setError(null()));
					});
					console.log(data, 'hejsan');
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
	};
	const onAddRecipe = (accessToken, userId) => {
		dispatch(addRecipe(accessToken, userId, newRecipe));
		setNewRecipe(''); // clears the input
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
