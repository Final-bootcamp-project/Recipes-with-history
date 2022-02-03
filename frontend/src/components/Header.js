import styled from 'styled-components'

import { StyledNavBar } from './styling/StyledNavBar';

const Header = styled.header`
display: flex;
justify-content: center;
align-items: space-between;
width: 100%;
height: 100px;
MARGIN-TOP: 0;
margin-bottom: 20px;
background-color: lightblue;
color: white;
`;



export const HeaderMenu = () => {
  return(
    <>
    <Header>
    <StyledNavBar />
    </Header>
  </>
  )
}