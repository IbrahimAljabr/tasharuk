import { css } from "styled-components";
import breakpoints from "./breakpoints";

const mq = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${breakpoints[label]}) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default mq;
