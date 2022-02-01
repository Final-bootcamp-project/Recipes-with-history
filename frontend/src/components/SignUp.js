import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { users } from '../reducers/users.js';
import { HeaderMenu } from './Header.js';
import { API_URL } from '../utils/urls.js';

import { StyledForm } from './styling/StyledForm.js';

const SignUp = () => {
	// ---------------- Rebeccas add
	// const [username, setUsername] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [userCreated, setUserCreated] = useState(false);
	// const [userData, setUserData] = useState({});

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	createUser();
	// };

	// const createUser = () => {
	// 	fetch(API_URL('/signup'), {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ username, password, email }),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((json) => {
	// 			setUserData(json.response);
	// 			setUserCreated(true);
	// 		});
	// };

	// return (
	// 	<>
	// 		{userCreated ? (
	// 			<StyledForm>
	// 				<p>User {userData.name} created!</p>
	// 				<p>
	// 					Click <Link to='/login'>here</Link> to login!
	// 				</p>
	// 			</StyledForm>
	// 		) : (
	// 			<div>
	// 				<StyledForm onSubmit={(event) => handleSubmit(event)}>
	// 					<label htmlFor='usernameInput'>username:</label>
	// 					<input
	// 						id='usernameInput'
	// 						type='text'
	// 						value={username}
	// 						onChange={(event) => setUsername(event.target.value)}
	// 					/>

	// 					<label htmlFor='emailInput'>email:</label>
	// 					<input
	// 						id='emailInput'
	// 						type='email'
	// 						value={email}
	// 						onChange={(event) => setEmail(event.target.value)}
	// 					/>

	// 					<label htmlFor='passwordInput'>password:</label>
	// 					<input
	// 						id='passwordInput'
	// 						type='password'
	// 						value={password}
	// 						onChange={(event) => setPassword(event.target.value)}
	// 					/>
	// 					<button type='submit'>Create user</button>
	// 				</StyledForm>
	// 			</div>
	// 		)}
	// 	</>
	// );

	return (
		<>
			<HeaderMenu />

			{/* Form to sign up
	    button to submit
	    footer
	*/}
		</>
	);
};

export default SignUp;
