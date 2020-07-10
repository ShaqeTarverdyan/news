import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Dot = styled.div`
  background-color: #03bafc;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

class Loader extends Component {
  render() {
    return (
      <DotWrapper>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    )
  }
}
export default Loader;