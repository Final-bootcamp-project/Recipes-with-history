import styled from 'styled-components';
import { useDispatch, batch } from 'react-redux';

import { StyledButton } from './StyledButton';
import { users } from '../../reducers/users';

const Hamburger = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;	
	position: sticky;
	height: 80px;
	top: 0;
	z-index: 999;	
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const StyledList = styled.ul`
style: none;
`



export const StyledNavBar = () => {

	const dispatch = useDispatch();

	const logout = () => {
		batch(() => {
			dispatch(users.actions.setUsername(null));
			dispatch(users.actions.setUserId(null));
			dispatch(users.actions.setAccessToken(null));
			dispatch(users.actions.setError(null));
		});
	}


	return (
		<Hamburger>
			<ul>
				<li>Home</li>
				<li>Recipes</li>
				<li>Find Recipe</li>
				<StyledButton onClick={() => logout()}>Log out</StyledButton> 
			</ul>
		</Hamburger>
	);
};
