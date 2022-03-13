import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Styledh2, Styledh3, Styledh4, StyledP } from './styling/StyledText.js';

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
`;
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

export const RecipeCard = ({ recipeprop }) => {
	// const accessToken = useSelector((store) => store.user.accessToken);

	// const likeRecipe = (accessToken, checkedAt, userId, recipeId) => {
	// 	return (dispatch) => {
	// 		const options = {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: accessToken,
	// 			},
	// 			body: JSON.stringify({
	// 				checkedAt,
	// 				user: userId,
	// 				recipe: recipeId,
	// 			}),
	// 		};
	// 		fetch(API_URL('/recipes/:recipeId/like'), options)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				console.log(data);
	// 				if (data.success) {
	// 					batch(() => {
	// 						dispatch(recipe.actions.setLike(accessToken, userId, recipeId));
	// 						dispatch(recipe.actions.setError(null));
	// 					});
	// 				} else {
	// 					batch(() => {
	// 						dispatch(recipe.actions.setLike([]));
	// 						dispatch(recipe.actions.setError(data.response));
	// 					});
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 			});
	// 	};
	// };

	return (
		<RecipeContainer>
			{recipeprop?.map((recipe) => (
				<RecipeWrapper key={recipe._id}>
					<Styledh2>{recipe.title}</Styledh2>
					<Styledh3>Ingredients: </Styledh3>
					<Styledh4>{recipe.ingredients}</Styledh4>
					<Styledh3>Cooking Steps: </Styledh3>
					<Styledh4>{recipe.cookingSteps}</Styledh4>
					<StyledP>{moment(recipe.createdAt).fromNow()}</StyledP>
				</RecipeWrapper>
			))}
		</RecipeContainer>
	);
};
