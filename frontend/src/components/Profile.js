import React, { useEffect } from 'react';
import { useSelector, useDispatch /*batch*/ } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Styledh2, StyledP } from './styling/StyledText';

// import { users } from '../reducers/users';
// import { recipe } from '../reducers/recipes';
// import { API_PROFILE } from '../utils/urls';

import CreateRecipe from './CreateRecipe.js';

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
	const navigate = useNavigate();

	const username = useSelector((store) => store.user.username);
	const accessToken = useSelector((store) => store.user.accessToken);

	//------------ Fetch Profile Info
	useEffect(() => {
		if (!accessToken) {
			navigate('/signin');
		}
	}, [accessToken, navigate]);

	// useEffect(() => {
	// 	const options = {
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: accessToken,
	// 		},
	// 	};

	// 	fetch(API_PROFILE(userId), options)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			if (data.success) {
	// 				batch(() => {
	// 					dispatch(users.actions.setUser(data.response));
	// 					dispatch(users.actions.setError(null));
	// 				});
	// 			} else {
	// 				batch(() => {
	// 					dispatch(users.actions.setUser(null));
	// 					dispatch(users.actions.setError(data.response));
	// 				});
	// 			}
	// 		});
	// }, [accessToken, dispatch, userId]);

	// const optionsUser = {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: accessToken,
	// 	},
	// };

	// const fetchUserRecipes = () => {
	// 	fetch(API_URL('/profile/:userId'), optionsUser)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			if (data.success) {
	// 				batch(() => {
	// 					dispatch(recipe.actions.setUserRecipes(data.response));
	// 					dispatch(recipe.actions.setError(null));
	// 					console.log(data.response);
	// 				});
	// 			} else {
	// 				batch(() => {
	// 					dispatch(recipe.actions.setUserRecipes(null));
	// 					dispatch(recipe.actions.setError(data.response));
	// 				});
	// 			}
	// 		});
	// };

	return (
		<ProfileWrapper>
			<WelcomeText>
				<Styledh2>Welcome {username}!</Styledh2>
				<StyledP>
					Make yourself at home while you reminisce over the amazing recipes
					you've uploaded!
				</StyledP>
			</WelcomeText>

			<CreateRecipe />
		</ProfileWrapper>
	);
};

export default Profile;
