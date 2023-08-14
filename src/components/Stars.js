import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  const full = Math.floor(stars);
  const empty = 5 - Math.ceil(stars);
  const myStars = [];
  for (let i = 0; i < full; i++) {
    myStars.push(
      <span key={myStars.length + 1}>
        <BsStarFill />
      </span>
    );
  }
  if (full + empty < 5)
    myStars.push(
      <span key={myStars.length + 1}>
        <BsStarHalf />
      </span>
    );
  for (let i = 0; i < empty; i++)
    myStars.push(
      <span key={myStars.length + 1}>
        <BsStar />
      </span>
    );

  return (
    <Wrapper>
      <div className="stars">{[...myStars]}</div>

      <p className="reviews">{reviews} Customer reviews</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
