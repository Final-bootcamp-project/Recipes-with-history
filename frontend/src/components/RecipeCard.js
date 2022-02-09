import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { recipe } from '../reducers/recipes';
import { users } from '../reducers/users';

import { API_URL } from '../utils/urls';

const LikeButton = styled.input`
	// display: inline-block;
	// border-radius: 50%;
	// width: 50px;
`;

const RecipeContainer = styled.div`
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const RecipeWrapper = styled.article`
	// width: 40%;
	// height: 300px;
	// margin: 15px;
	// padding: 10px 20px;
	// border: 3px solid hotpink;
	// height: auto;
	width: 80%;
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
	const [onLikesIncrease, setOnLikesIncrease] = useState('');

	const likeRecipe = (accessToken, userId, recipeId) => {
		return (dispatch) => {
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: accessToken,
				},
				body: JSON.stringify({
					// likes,
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
							dispatch(
								recipe.actions.toggleRecipe(accessToken, userId, recipeId)
							);
							dispatch(recipe.actions.setError(null));
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
		};
	};

	return (
		<RecipeContainer>
			{recipeprop.map((recipe) => (
				<RecipeWrapper key={recipe._id}>
					<h3>{recipe.title}</h3>
					<p>{recipe.ingredients}</p>
					<p>{recipe.cookingSteps}</p>
					<p>{recipe.uploadedBy}</p>
					{/* <p>{recipe.recipeCreator}</p> */}
					<p>{moment(recipe.createdAt).fromNow()}</p>

					{accessToken && (
						<div>
							<LikeButton
								type='checkbox'
								checked={recipe.isLiked}
								// onChange={() => likeRecipe(recipe._id)}
								// onLikesIncrease={onLikesIncrease}
								onChange={() => likeRecipe(recipe._id)}
								recipe={recipe._id}
							/>
							x &nbsp;
							{recipe.likes}
						</div>
					)}
				</RecipeWrapper>
			))}
		</RecipeContainer>
	);
};
