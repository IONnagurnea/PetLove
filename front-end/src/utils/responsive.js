import React from 'react';
import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};

export const laptop = (props) => {
  return css`
  @media only screen and (min-width: 768px) and (max-width: 1366px) {
    }
      ${props}
    }
  `;
};


