import { createGlobalStyle } from 'styled-components';
import { CustomTheme } from '../types';
import {animationTime} from '../constants';

export const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      position: relative;
      height: 100%;
      min-height: 100vh;
      
      background-color: ${props => props.theme.colors.primaryBackground};
      color: ${props => props.theme.colors.text};
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      transition: background-color ${animationTime} ease-out, color ${animationTime} ease-out;
    }
    ul {
      list-style: none;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
`
