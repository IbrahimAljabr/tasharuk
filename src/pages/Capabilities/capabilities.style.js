import styled from "styled-components";
// import mq from "../../styles/media-query";
import Box from "@mui/material/Box";

export const Create = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  align-items: center;

  p {
    padding: 0 1rem;
    cursor: pointer;
  }

  svg {
    path {
      fill: #f7984d;
    }
  }
`;

export const GoBack = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 20rem;

  p {
    padding: 0 1rem;
    font-size: 1.8rem;
  }

  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;
`;

export const ModelContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  width: 50rem;
  min-height: 25rem;
  display: flex;
`;

export const ModelContainerUrl = styled(ModelContainer)`
  width: 30rem;
  min-height: 10rem;
  flex-direction: column;

  p {
    margin: 5rem;
    font-size: 1rem;
  }
`;

export const ModelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 0.2rem;

  p {
    white-space: nowrap;
  }

  svg {
    padding: 0.75rem 0.5rem 0 0;
    path {
      fill: #f7984d;
    }
  }
`;

export const ModelBody = styled(Box)`
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30rem;
    padding: 5rem 0;

    input {
      width: 100%;
      margin-bottom: 0.5rem;
      padding: 0.7rem 0.2rem;
    }
    div {
      width: 100%;
    }

    textarea {
      width: 100%;
      max-width: 100%;
      margin-bottom: 0.5rem;
      padding: 0.7rem 0.2rem;
      height: 4rem;
    }
  }
`;

export const ModelButton = styled.button`
  padding: 0.6rem 0;
  background-color: ${({ cancel }) =>
    cancel ? "#f94743" : "#81d0c7"};
  border-radius: 2rem;
  cursor: pointer;
  color: white;
  border: none;
  width: 14rem;
  text-align: center;
  margin-top: 2rem;
`;

export const ModelSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
