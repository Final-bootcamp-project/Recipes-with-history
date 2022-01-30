import React, { useState } from "react";
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";

import { Container } from "./styling/Section.js";
import { Form } from "./styling/Form.js";

import { recipe, postRecipe } from "../reducers/recipes.js";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState("");
  const [title, setTitle] = useState("");
  const [cookingSteps, setCookingSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");


  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  const dispatch = useDispatch;

  const onPostRecipe = (accessToken, userId, recipe) => {
    dispatch(postRecipe(accessToken, userId, recipe));
    setRecipe(""); // clears the input
  };
  return (
    <Container>
        <div>
          <Form>
            <Label>New recipe </Label>
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Add title here.."
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            <Label>Ingredients list </Label>
              <input
                id="ingredients"
                type="text"
                value={ingredients}
                placeholder="Add title here.."
                onChange={(event) => setIngredients(event.target.value)}
              ></input>
            <Label>Cooking steps </Label>
              <input
                id="cookingSteps"
                type="text"
                value={cookingSteps}
                placeholder="Add title here.."
                onChange={(event) => setCookingSteps(event.target.value)}
              ></input>
        <button
          type="submit"
          onClick={() => onPostRecipe(accessToken, userId, recipe)}
        >
          New Recipe
        </button>
      </Form>
      </div>
    </Container>
  );
};

export default AddRecipe;