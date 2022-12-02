import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  getIndicatorsByEmail,
  getRubricsById,
  updateRubrics
} from "../../services/survey";
import {
  AnswerContainer,
  DateText,
  NextButton,
  QuestionsText,
  SelectedAnswer
} from "./questions.style";

function Questions({ lang }) {
  const [currentSelected, setCurrentSelected] = useState(false);
  console.log(`📌 📁 ~ currentSelected`, currentSelected);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const [btn, setBtn] = useState(false);
  const [rubricData, setRubricData] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);

  const user = useLocation()?.state;

  const getSurvey = async () => {
    try {
      const res = await getIndicatorsByEmail(
        user?.schemaId,
        user?.email
      );
      setIndicatorData(res.response_body);
      const rubricRes = await getRubricsById(
        res?.response_body?.current_indicator?.id
      );
      setRubricData(rubricRes?.response_body);
    } catch (error) {
      console.log(`📌 📁 ~ error`, error?.response?.data);
    }
  };

  const handleNext = async () => {
    if (currentSelected) {
      try {
        setBtn(true);
        const res = await updateRubrics(
          user?.schemaId,
          user?.email,
          rubricData?.[0]?.id
        );

        setIndicatorData(res.response_body);
        const rubricRes = await getRubricsById(
          res?.response_body?.current_indicator?.id
        );

        setRubricData(rubricRes?.response_body);
        setCurrentSelected(false);

        setBtn(false);
      } catch (error) {
        console.log(`📌 📁 ~ error`, error);
      }
    } else {
      setSnack({
        ...snack,
        open: true,
        message: "Please Select One",
        type: "error"
      });
    }
  };

  useEffect(() => {
    getSurvey();
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      {indicatorData?.is_completed && (
        <DateText>
          <h1>Survey is Completed</h1>
          <h2>Your Score Is {indicatorData?.score}</h2>
        </DateText>
      )}

      {!indicatorData?.is_completed ? (
        <>
          <QuestionsText>
            <h1>
              {indicatorData?.current_indicator?.description_en}
            </h1>
          </QuestionsText>

          <AnswerContainer>
            {rubricData?.map(({ description_en, id }) => (
              <SelectedAnswer
                onClick={() => setCurrentSelected(id)}
                active={currentSelected === id}
                key={id}
              >
                {description_en}
              </SelectedAnswer>
            ))}

            {rubricData?.length ? (
              <NextButton disabled={btn} onClick={handleNext}>
                Next
              </NextButton>
            ) : null}
          </AnswerContainer>
        </>
      ) : null}
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default Questions;
