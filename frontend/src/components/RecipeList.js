import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import AddRecipe from './CreateRecipe';

const RecipeList = () => {
	return (
		<>
			<AddRecipe />
			<div>
				<p>HEJ</p>
			</div>
		</>
	);
};

export default RecipeList;
