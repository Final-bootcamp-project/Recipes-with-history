import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Styledh2, StyledP } from './styling/StyledText';

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
