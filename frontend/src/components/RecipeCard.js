import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

//import LikeButton from './LikeButton';

const RecipeContainer = styled.div`
	width: 100%;
	padding: 20px;
`;

const RecipeWrapper = styled.article`
	width: 40%;
	height: 500px;
	margin: 15px;
	border: 3px solid hotpink;
`;

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
					</div> */}
					<p>{moment(recipe.createdAt).fromNow()}</p>
				</RecipeWrapper>
			))}
		</RecipeContainer>
	);
};
