import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { Modal } from 'react-responsive-modal';

import { users } from '../reducers/users';
import { recipe } from '../reducers/recipes';
import { API_PROFILE, API_URL } from '../utils/urls';

import CreateRecipe from './CreateRecipe.js';
// import { UserRecipeList } from './UserRecipeList';
import { RecipeCard } from './RecipeCard';

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const WelcomeText = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	margin: 10px auto;
	font-family: 'Patrick Hand', cursive;
`;


const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();

	const user = useSelector((store) => store.user.items);
	const userID = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);
	const name = useSelector((store) => store.user.name);
	const accessToken = useSelector((store) => store.user.accessToken);
	const userRecipes = useSelector((store) => store.user.userRecipes)

	//------------ Fetch Profile Info
	useEffect(() => {
		fetchProfileInfo();
		fetchUserRecipes();
	}, [userId]);

	const options = {
		method: 'GET',
		headers: {
			Authorization: accessToken,
		},
	};

	const fetchProfileInfo = () => {
		fetch(API_PROFILE(userId), options)
			.then((res) => res.json())
			.then((data) => {
				//console.log(data.response);
				if (data.success) {
					dispatch(users.actions.setUser(data.response));
					dispatch(users.actions.setError(null));
					console.log(data.response);
				} else {
					dispatch(users.actions.setUser(null));
					dispatch(users.actions.setError(data.response));
				}
			});
	};

	// -------- Fetch Recipes created by User
	// useEffect(() => {
	// 	fetchUserRecipes();
	// }, [userId]);

	const optionsUser = {
		method: 'GET',
		headers: {
			Authorization: accessToken,
		},
	};

	const fetchUserRecipes = () => {
		fetch(API_URL('/profile/:userId'), optionsUser)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					batch(() => {
					dispatch(recipe.actions.setUserRecipes(data.response));
					dispatch(recipe.actions.setError(null));
					console.log(data.response);
					})
				} else {
					batch(() => {
					dispatch(recipe.actions.setUserRecipes(null));
					dispatch(recipe.actions.setError(data.response));
					})
				}
			});
	};

	return (
		<ProfileWrapper>
			<WelcomeText>
				<h2>Welcome {username}!</h2>
				<p>
					Make yourself at home while you reminisce over the amazing recipes
					you've uploaded!
				</p>
			</WelcomeText>

			<CreateRecipe />


			{/* <RecipeCard recipeprop={userRecipes}/> */}
		</ProfileWrapper>
	);
};

export default Profile;
