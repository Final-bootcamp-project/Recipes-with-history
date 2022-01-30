import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'; // batch makes the wrapped dispatches to render only once
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components'

const ProfileWrapper = styled.div`
display: flex;
width: 700px;
height: 700px;
border: 3px solid grey;
`



const Profile = () => {
  const dispatch = useDispatch()

  return (
  <ProfileWrapper>
    <div>
      <button>Här kan vi länka, för att lägga upp recept</button>
      <p>Vi ska lägga till username och name</p>
    </div>
  </ProfileWrapper>
)};

export default Profile;
