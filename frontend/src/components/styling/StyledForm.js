// import React from 'react';
import styled from 'styled-components';

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 80%;
	height: auto;
	background-color: #ceb6ce;
	border: 2px solid purple;
	border-radius: 10px;
	padding: 20px 10px;
	margin: 20px auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	font-family: 'Patrick Hand', cursive;

	@media (min-width: 768px) {
		width: 60%;
	}
`;
