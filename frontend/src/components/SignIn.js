import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { StyledButton } from './styling/StyledButton.js';
import { StyledForm } from './styling/StyledForm.js';
import { StyledLabel } from './styling/StyledLabel.js';
import { StyledInput } from './styling/StyledInput.js';

import { users } from '../reducers/users.js';

import { API_URL } from '../utils/urls.js';

const SignIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = useSelector((store) => store.user.accessToken);

	useEffect(() => {
		if (accessToken) {
			navigate('/recipes');
		}
	}, [accessToken, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();
		login();
	};

	const login = () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		};
		fetch(API_URL('/signin'), options)
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					batch(() => {
						dispatch(users.actions.setUserId(json.response.userId));
						dispatch(users.actions.setUsername(json.response.username));
						dispatch(users.actions.setAccessToken(json.response.accessToken));
						dispatch(users.actions.setError(null));
					});
					localStorage.setItem('user', JSON.stringify({
            username: json.response.username,
            accessToken: json.response.accessToken,
            userId: json.response.userId
          }))
					// console.log(json.response);
					navigate('/profile/:userId'); 
				} else {
					dispatch(users.actions.setUserId(null));
					dispatch(users.actions.setUsername(null));
					dispatch(users.actions.setAccessToken(null));
					dispatch(users.actions.setError(json.response));
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		//loading === false && (
		<StyledForm onSubmit={(event) => handleSubmit(event)}>
			<StyledLabel htmlFor='usernameInput'>
				Username
				<StyledInput
					id='usernameInput'
					type='text'
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</StyledLabel>
			<StyledLabel htmlFor='passwordInput'>
				Password
				<StyledInput
					id='passwordInput'
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</StyledLabel>
			<StyledButton type='submit'>Sign in </StyledButton>
		</StyledForm>
	); //)
};

export default SignIn;
