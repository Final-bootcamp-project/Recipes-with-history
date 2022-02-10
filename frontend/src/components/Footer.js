import React from 'react';
import styled from 'styled-components';

import { StyledP } from './styling/StyledText';

const StyledFooter = styled.footer`
	display: flex;
	position: sticky;
	bottom: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 60px;
	background-color: lightblue;
	font-family: 'Patrick Hand', cursive;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<StyledP>© Rebecca Blixt & Jessica Nordahl</StyledP>
		</StyledFooter>
	);
};
export default Footer;
