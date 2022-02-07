import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

import { users } from '../reducers/users';
import { API_PROFILE } from '../utils/urls';

import CreateRecipe from './CreateRecipe.js'

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	// border: 3px solid grey;
`;

const Span = styled.span`
font-weight: 650;
`


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
			<div>
				<h2>
					Welcome <Span>{username}</Span>, to your profile! Make yourself at home
					while you reminisce over the amazing recipes you've uploaded!
				</h2>
			</div>	

				<CreateRecipe />			
		</ProfileWrapper>
	);
};

export default Profile;
