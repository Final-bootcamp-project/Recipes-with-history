import React, { useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { users } from '../reducers/users.js';
import { API_URL } from '../utils/urls.js';

import { StyledForm } from './styling/StyledForm.js';
import { StyledInput } from './styling/StyledInput.js';
import { StyledButton } from './styling/StyledButton.js';

const SignUp = () => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		createUser();
	};

	const createUser = () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, username, password, email }),
		};

		fetch(API_URL('signup'), options)
			.then((response) => response.json())
			.then((json) => {
				if (json.success) {
					batch(() => {
						dispatch(users.actions.setUsername(json.response.username));
						dispatch(users.actions.setName(json.response.name));
						dispatch(users.actions.setAccessToken(json.response.accessToken));
						dispatch(users.actions.setError(null));
					});
					navigate('signin');
				} else {
					batch(() => {
						dispatch(users.actions.setUsername(null));
						dispatch(users.actions.setName(null));
						dispatch(users.actions.setAccessToken(null));
						dispatch(users.actions.setError(json.response));
					});
				}
			});
	};

	return (
		<div>
			<StyledForm onSubmit={(event) => handleSubmit(event)}>
				<label htmlFor='nameInput'>name:</label>
				<StyledInput
					id='nameInput'
					type='text'
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>

				<label htmlFor='usernameInput'>username:</label>
				<StyledInput
					id='usernameInput'
					type='text'
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>

				<label htmlFor='emailInput'>email:</label>
				<StyledInput
					id='emailInput'
					type='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>

				<label htmlFor='passwordInput'>password:</label>
				<StyledInput
					id='passwordInput'
					type='password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<StyledButton type='submit'>Create user</StyledButton>
			</StyledForm>
		</div>
	);
};

export default SignUp;
