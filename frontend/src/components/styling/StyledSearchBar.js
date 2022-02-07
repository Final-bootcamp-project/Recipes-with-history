import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { StyledButton } from './StyledButton';
import { StyledInput } from './StyledInput';

import { recipe } from '../../reducers/recipes';

const AccessibleLabel = styled.span`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

export const StyledSearchBar = ({ searchQuery, setSearchQuery }) => {
	return (
		<form action='/' method='get'>
			<label htmlFor='header-search'>
				<AccessibleLabel>Search recipe</AccessibleLabel>
			</label>
			<StyledInput
				type='text'
				id='header-search'
				placeholder='Search recipe'
				name='s'
				value={searchQuery}
				onInput={(e) => setSearchQuery(e.target.value)}
			/>

			<StyledButton type='submit'>Search</StyledButton>
		</form>
	);
};
