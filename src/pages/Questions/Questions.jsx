import Container from "@mui/material/Container";
import React, { useState } from "react";
import {
  AnswerContainer,
  DateText,
  NextButton,
  QuestionsText,
  SelectedAnswer
} from "./questions.style";

function Questions({ lang }) {
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(false);

  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false }
      ]
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false }
      ]
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false }
      ]
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true }
      ]
    }
  ];

  const handleNext = () => {
    const nextQuestion = currentQuestions + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestions((c) => c + 1);
    }
  };

  return (
    <Container dir={lang === "arabic" && "rtl"}>
      <DateText>20:00</DateText>

      <QuestionsText>
        <h1>{questions[currentQuestions]?.questionText}</h1>
      </QuestionsText>

      <AnswerContainer>
        {questions[currentQuestions]?.answerOptions?.map((answer) => (
          <SelectedAnswer
            onClick={() => setCurrentSelected(answer.answerText)}
            active={currentSelected === answer.answerText && true}
          >
            {answer.answerText}
          </SelectedAnswer>
        ))}

        <NextButton onClick={handleNext}>Next</NextButton>
      </AnswerContainer>
    </Container>
  );
}

export default Questions;
