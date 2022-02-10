import styled from 'styled-components';

export const StyledButton = styled.button`
	width: 50px;
	background-color: #eadfeb;
	border-radius: 10px;
	padding: 5px 15px;
	width: auto;
	border: 3px solid black;
	font-family: 'Patrick Hand', cursive;
	font-size: 17px;
	text-transform: uppercase;
	`;

export const LikeButton = styled.button`
	display: inline-block;
	border-radius: 50%;
	width: 50px;
	height: 50px;

	:active {
		color: pink;
		border: 3px solid white;
	}
`;

