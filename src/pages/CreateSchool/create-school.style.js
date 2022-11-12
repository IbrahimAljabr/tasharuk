import styled from "styled-components";

export const SubContainer = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const OutLineButton = styled.div`
  padding: 0.5rem 1.5rem;
  background-color: white;
  margin: 0 2rem 0 0;
  border: 1px solid gray;
  border-radius: 2rem;
  cursor: pointer;
  max-width: 8rem;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Form = styled.div`
  display: flex;
  justify-content: space-around;
  width: 35rem;
  background-color: #f8f8f8;
  flex-wrap: wrap;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  div {
    margin-bottom: 1rem;
  }
`;
