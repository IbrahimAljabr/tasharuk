import styled from "styled-components";

export const TdDelete = styled.div`
  text-align: center;
  svg {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;

    path {
      fill: #f66b6b;
    }
  }
`;

export const TdEdit = styled.div`
  text-align: center;
  cursor: pointer;
  /* border-left: 1px solid rgba(224, 224, 224, 1); */

  svg {
    width: 1.2rem;
    height: 1.2rem;

    path {
      stroke: #67e970;
    }
  }
`;

export const TdError = styled.div`
  text-align: center;
  cursor: pointer;

  svg {
    width: 1.2rem;
    height: 1.2rem;

    path {
      stroke: red;
    }
  }
`;
