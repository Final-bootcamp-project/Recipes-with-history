import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

//import LikeButton from './LikeButton';

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
`;

// --------------------DON'T TOUCH!! IT WORKS WITH HOMEPAGE!
export const RecipeCard = ({ recipeprop }) => {
	return (
		<RecipeContainer>
			{recipeprop.map((recipe) => (
				<RecipeWrapper key={recipe._id}>
					<h3>{recipe.title}</h3>
					<p>{recipe.ingredients}</p>
					<p>{recipe.cookingSteps}</p>
					<p>{recipe.uploadedBy}</p>
					<p>{recipe.recipeCreator}</p>
					{/* <div>
						<LikeButton onLikesIncrease={onLikesIncrease} recipe={recipe} /> x{' '}
						{recipe.likes}
					</div>  */}
					<p>{moment(recipe.createdAt).fromNow()}</p>
				</RecipeWrapper>
			))}
			hello world
		</RecipeContainer>
	);
};
