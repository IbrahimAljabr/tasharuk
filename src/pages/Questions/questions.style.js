import styled from "styled-components";

export const QuestionsText = styled.div`
  margin: 3rem 0;
`;

export const DateText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 25rem;
`;

export const AnswerContainer = styled.div`
  margin: 2rem 0;
`;

export const NextButton = styled.button`
  margin: 2rem 0;
  padding: 0.8rem 2rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
  font-size: 1.2rem;
  text-align: center;
  cursor: pointer;
  background-color: white;
`;

export const SelectedAnswer = styled.p`
  border: 1px solid lightgray;
  ${({ active }) => active && "border: 1px solid #77aafc"};
  ${({ active }) => active && "background-color:  #77aafc20"};

  border-radius: 0.5rem;
  padding: 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #77aafc20;
    border-color: #77aafc;
  }
`;
