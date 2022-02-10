import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { Styledh3, Styledh4, StyledP } from './styling/StyledText.js'
import { LikeButton } from './styling/StyledButton.js';

import { recipe } from '../reducers/recipes';
import { users } from '../reducers/users';

import { API_URL } from '../utils/urls';

const RecipeContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
width: 100%;

@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

@media (min-width: 1228px) {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
}
`

const RecipeWrapper = styled.article`
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-self: center;
	margin: 15px;
	padding: 10px 20px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	font-family: 'Patrick Hand', cursive;
	letter-spacing: 0.8px;		
	`;

// --------------------DON'T TOUCH!! IT WORKS WITH HOMEPAGE!
export const RecipeCard = ({ recipeprop }) => {
	// const dispatch = useDispatch();

	const accessToken = useSelector((store) => store.user.accessToken);
	// const [onLikesIncrease, setOnLikesIncrease] = useState('');

	const likeRecipe = (accessToken, checkedAt, userId, recipeId) => {
		return (dispatch) => {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: accessToken,
				},
				body: JSON.stringify({
					checkedAt, 
					user: userId,
					recipe: recipeId,
				}),
			};
			fetch(API_URL('/recipes/:recipeId/like'), options)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.success) {
						// console.log('Nytt recept sparat!', data);
						batch(() => {
							dispatch(recipe.actions.setLike(accessToken, userId, recipeId));
							dispatch(recipe.actions.setError(null));
						});
					} else {
						batch(() => {
							dispatch(recipe.actions.setLike([]));
							dispatch(recipe.actions.setError(data.response));
						});
					}
				})
				.catch((error) => {
					console.error(error);
				});
		};
	};

	return (
		<RecipeContainer>
			{recipeprop.map((recipe) => (
				<RecipeWrapper key={recipe._id}>
					<Styledh3>{recipe.title}</Styledh3>
					<Styledh4>Ingredients: <br/>{recipe.ingredients}</Styledh4>
					<Styledh4>Cooking Steps: <br/>{recipe.cookingSteps}</Styledh4>
					<StyledP>{recipe.uploadedBy}</StyledP>
					{/* <p>{recipe.recipeCreator}</p> */}
					<StyledP>{moment(recipe.createdAt).fromNow()}</StyledP>

					{accessToken && (
						<div>
							<LikeButton
								// type='checkbox'
								// onChange={() => likeRecipe(recipe._id)}
								// onLikesIncrease={onLikesIncrease}
								onClick={() => likeRecipe(recipe._id)}
								recipe={recipe._id}
							/>
						</div>
					)}
				</RecipeWrapper>
			))}
		</RecipeContainer>
	);
};
