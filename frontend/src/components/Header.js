import styled from 'styled-components';
import React from 'react';

import { StyledNavBar } from './styling/StyledNavBar';
import { Styledh1 } from './styling/StyledText';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 150px;
	margin-top: 0;
	margin-bottom: 20px;
	background-color: lightblue;
	color: black;
	padding: 15px;
	font-family: 'Patrick Hand', cursive;
	letter-spacing: 2px;

	@media (max-width: 767px) {
		h1 {
			display: none;
		}
	}
`;

export const HeaderMenu = () => {
	return (
		<>
			<Header>
				<StyledNavBar />
				<Styledh1>Recipes with memories</Styledh1>
			</Header>
		</>
	);
};
