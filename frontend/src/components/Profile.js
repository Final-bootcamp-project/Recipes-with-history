import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { Modal } from 'react-responsive-modal';

import { users } from '../reducers/users';
import { API_PROFILE } from '../utils/urls';

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

// const Span = styled.span`
// 	color: #a6f69d;
// `;

const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();

	const user = useSelector((store) => store.user.items);
	const userID = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);
	const name = useSelector((store) => store.user.name);
	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		fetchProfileInfo();
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
		</ProfileWrapper>
	);
};

export default Profile;
