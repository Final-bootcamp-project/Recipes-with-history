import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { StyledButton } from './styling/StyledButton.js';
import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';

import { users } from '../reducers/users.js';

import { API_URL } from '../utils/urls.js';

const SignIn = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		if (accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();
		login();
	};

	const login = () => {
		fetch(API_URL('signin'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userName, password }),
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					batch(() => {
						dispatch(users.actions.setUserId(json.response.userId)); // Har vi ens den här?!
						dispatch(users.actions.setUsername(json.response.username));
						dispatch(users.actions.setAccessToken(json.response.accessToken));
						dispatch(users.actions.setError(null));
					});
					navigate('/');
				} else {
					dispatch(users.actions.setUserId(null)); // Se ovan!
					dispatch(users.actions.setUsername(null));
					dispatch(users.actions.setAccessToken(null));
					dispatch(users.actions.setError(json.response));
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<StyledForm onSubmit={(event) => handleSubmit(event)}>
			<StyledLabel>
				<input
					type='text'
					value={userName}
					onChange={(event) => setUserName(event.target.value)}></input>
			</StyledLabel>
			<StyledLabel>
				<input
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}></input>
			</StyledLabel>
			<StyledButton type='submit'>Submit </StyledButton>
		</StyledForm>
	);
};

export default SignIn;
