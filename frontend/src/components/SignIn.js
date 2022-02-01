import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from './styling/Button.js'
import { Form } from './styling/Form.js';
import { Label } from './styling/Label.js';

import { users } from '../reducers/users.js';
 
import { API_URL } from '../utils/urls.js';

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    fetch(API_URL("signin"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          batch(() => {
            dispatch(users.actions.setUserId(json.response.userId));
            dispatch(users.actions.setUsername(json.response.username));
            dispatch(users.actions.setAccessToken(json.response.accessToken));
            dispatch(users.actions.setError(null));
          });
          navigate("/");
        } else {
          dispatch(users.actions.setUserId(null));
          dispatch(users.actions.setUsername(null));
          dispatch(users.actions.setAccessToken(null));
          dispatch(users.actions.setError(json.response));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

return (
  <Form onSubmit={(event) => handleSubmit(event)}>
    <Label>
      <input type="text" value={userName} onChange={(event)=>setUserName(event.target.value)}></input>
    </Label>
    <Label>
      <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
    </Label>
  <Button type="submit">Submit </Button>  
  </Form>
)};

export default SignIn;
