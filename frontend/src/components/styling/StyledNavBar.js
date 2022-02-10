import styled from 'styled-components';
import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Spin as Hamburger } from 'hamburger-react';

import { StyledButton } from './StyledButton';
import { users } from '../../reducers/users';

const StyledNav = styled.div`
	display: flex;
	flex.direction: column;
	width: auto;
	height: auto;
	background: rgba(173, 216, 230, 0.8);
`;

const StyledList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 0 10px;
`;

const StyledLink = styled(Link)`
	font-weight: bold;
	text-decoration: none;
	color: black;
	margin-top: 10px; 
	font-family: 'Patrick Hand', cursive;
	font-size: 17px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
`;

export const StyledNavBar = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const accessToken = useSelector((store) => store.user.accessToken);
	const navigate= useNavigate();

	const logout = () => {
		batch(() => {
			dispatch(users.actions.setUsername(null));
			dispatch(users.actions.setUserId(null));
			dispatch(users.actions.setAccessToken(null));
			dispatch(users.actions.setError(null));
		})
		navigate('/');
	};

	return (
		<StyledNav>
			<Hamburger
				label='Show menu'
				toggled={isOpen}
				toggle={setIsOpen}
				rounded
			/>
			{isOpen && (
				<StyledList>
					<StyledLink to='/' onClick={() => setIsOpen(false)}>Home</StyledLink>
					{!accessToken && (
					<>
					<StyledLink to='/signin' onClick={() => setIsOpen(false)}>Sign in</StyledLink>
					<StyledLink to='/signup' onClick={() => setIsOpen(false)}>Sign up</StyledLink>
					</>
					)}
					{accessToken && (
						<> 
					<StyledLink to='/recipes' onClick={() => setIsOpen(false)}>All recipes</StyledLink>
					<StyledLink to='/profile/{userId}' onClick={() => setIsOpen(false)}>My profile</StyledLink>
					<StyledButton onClick={() => logout()}>Log out</StyledButton>
					</>
					)}
				</StyledList>
			)}
		</StyledNav>
	);
};
