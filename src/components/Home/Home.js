import React from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="headerBackground">
      <h1>Hello! Welcome to Book My Movie.</h1>
      <div>
        This is BookMyMovie a one stop location for all the latest movie in
        stockholm.
      </div>
      <Button
        type="submit"
        onClick={() => {
          navigate("./landingPage");
        }}
      >
        Browse the latest movies
      </Button>
    </div>
  );
}
