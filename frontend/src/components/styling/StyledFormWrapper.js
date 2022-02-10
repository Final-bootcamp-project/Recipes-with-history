import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding-top: 100px;
	background-color: transparent;

	@media (min-width: 768px) {
		padding-top: 250px;
	}

	@media (min-width: 1024px) {
		padding-top: 200px;
		margin-bottom: 100px;
	}
`;
