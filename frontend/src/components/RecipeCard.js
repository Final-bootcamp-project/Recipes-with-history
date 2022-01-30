import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import LikeButton from './LikeButton';

const RecipeContainer = styled.div`
	width: 100%;
	padding: 20px;
`;

const RecipeWrapper = styled.article`
	width: 40%;
	height: 500px;
	margin: 15px auto;
  border: 3px solid hotpink;
`;

export const RecipeCard = ({ recipes, onLikesIncrease }) => {
	return (
		<RecipeContainer>
			{recipes.map((recipe) => (
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
