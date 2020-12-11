import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: black;
  position: relative;
`;
export const FullImage = styled.div`
  height: 514px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 375px) {
    max-height: 540px;
  }
`;
