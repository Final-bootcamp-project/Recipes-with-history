import styled from 'styled-components'

import { NavBar } from './Hamburger';

const Header = styled.header`
display: flex;
justify-content: center;
align-items: space-between;
width: 100%;
height: 100px;
margin-bottom: 20px;
background-color: lightblue;
color: white;
`;

export const HeaderMenu = () => {
  return(
    <>
    <Header>
    <NavBar />
    </Header>
  </>
  )
}