import styled from "styled-components";

export const QuestionsText = styled.div`
  margin: 3rem 0;
`;

export const DateText = styled.div`
  margin: 2rem 0;
`;

export const AnswerContainer = styled.div`
  margin: 2rem 0;

  &:last-child {
    align-items: flex-end;
  }
`;

export const NextButton = styled.div`
  margin: 2rem 0;
  padding: 1rem 2rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
  width: 5rem;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
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
