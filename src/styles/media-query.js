import { css } from 'styled-components';
import breakpoints from './breakpoints';

/**
 * Helper for adding media queries
 *
 * Each media query assumes that the design is ONLY SCREEN
 * and with a MOBILE FIRST philosophy - `only screen and (min-width)`.
 *
 * ```
 *   import styled from 'styled-components';
 *
 *   const StyledComponent = styled.div`
 *     display: none;
 *
 *     ${mq.desktop`
 *       display: block;
 *     `}
 *   `;
 * ```
 *
 * The helper returns a styledComponent.css object, so you
 * can also use it to create CSS mixins.
 *
 * ```
 *   import styled from 'styled-components';
 *
 *   const cssMixin = mq.mobile`
 *     display: none;
 *   `;
 *
 *   const AnotherStyledComponent = styled.div`
 *     display: none;
 *
 *     ${cssMixin}
 *   `;
 * ```
 *
 * Choose any of the listed breakpoints from `Styles/breakpoints` and pass
 * in a template literal of CSS rules.
 */
const mq = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${breakpoints[label]}) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default mq;
