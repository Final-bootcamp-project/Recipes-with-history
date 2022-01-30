import styled from 'styled-components'

const Hamburger = styled.nav`
position: sticky;
top: 0;
z-index: 999;
height: 80px;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
display: flex;
justify-content: center;
align-items: center;`


export const NavBar = () => {
  return(
    <Hamburger>
      
      <li>
        <ul>Home</ul>
        <ul>Recipes</ul>
        <ul>Find Recipe</ul>
      </li>
    </Hamburger>

  )
}
