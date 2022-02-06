import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { users } from '../reducers/users';
import { API_PROFILE } from '../utils/urls';

const ProfileWrapper = styled.div`
	display: flex;
	width: 700px;
	height: 700px;
	border: 3px solid grey;
`;

const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();

	const user = useSelector((store) => store.user.items);
	const userID = useSelector((store) => store.user.userId);
	const username = useSelector((store) => store.user.username);
	const name = useSelector((store) => store.user.name);

	useEffect(() => {
		fetchProfileInfo();
	}, [userId]);

	const fetchProfileInfo = () => {
		fetch(API_PROFILE(userId))
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
				<button>Här kan vi länka, för att lägga upp recept</button>
				<p>Vi ska lägga till username och name</p>

				<p>
					Welcome, {name}/{username}, to your profile! Make yourself at home
					while you reminisce over the amazing recipes you've uploaded!
				</p>
			</div>
		</ProfileWrapper>
	);
};

export default Profile;
