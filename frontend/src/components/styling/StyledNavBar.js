import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Spin as Hamburger } from 'hamburger-react';

import { StyledButton } from './StyledButton';
import { users } from '../../reducers/users';

import { API_PROFILE } from '../../utils/urls';

// const Hamburger = styled.nav`
// 	display: flex;
// 	justify-content: flex-start;
// 	align-items: center;
// 	position: sticky;
// 	height: 80px;
// 	width: 100%;
// 	top: 0;
// 	z-index: 999;
// 	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
// `;

const StyledNav = styled.div`
	display: flex;
	flex.direction: column;
	margin: auto 10px;
	background: rgba(173, 216, 230, 0.5);
`;

const StyledList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
`;

const StyledLink = styled(Link)`
	font-weight: bold;
	text-decoration: none;
	color: white;
	margin-top: 10px; ;
`;

export const StyledNavBar = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const { userId } = useParams();
	const accessToken = useSelector((store) => store.user.accessToken);

	const logout = () => {
		batch(() => {
			dispatch(users.actions.setUsername(null));
			dispatch(users.actions.setUserId(null));
			dispatch(users.actions.setAccessToken(null));
			dispatch(users.actions.setError(null));
		});
	};

	// useEffect(() => {
	// 	fetchProfileInfo();
	// }, [userId]);

	// const fetchProfileInfo = () => {
	// 	fetch(API_PROFILE(userId))
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			//console.log(data.response);
	// 			if (data.success) {
	// 				dispatch(users.actions.setUser(data.response));
	// 				dispatch(users.actions.setError(null));
	// 				console.log(data.response);
	// 			} else {
	// 				dispatch(users.actions.setUser(null));
	// 				dispatch(users.actions.setError(data.response));
	// 			}
	// 		});
	// };

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
					<StyledLink to='/'>Home</StyledLink>
					{!accessToken && <StyledLink to='/signin'>Sign in</StyledLink>}
					{accessToken && (
						<> 
					<StyledLink to='/recipes'>Recipes</StyledLink>
					<StyledLink to='/profile/{userId}'>Profile?</StyledLink>
					<StyledButton onClick={() => logout()}>Log out</StyledButton>
					</>
					)}
				</StyledList>
			)}
		</StyledNav>
	);
};
