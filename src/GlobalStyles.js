// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .theme-toggle {
    background-color: ${({ theme }) => theme.toggleBackground};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 30px;
    color: ${({ theme }) => theme.toggleColor};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 0;
    overflow: hidden;
    padding: 0.5rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 8rem;
  }
  .theme-toggle span {
    flex: 1;
    text-align: center;
  }
  .theme-toggle .active {
    color: ${({ theme }) => theme.active};
    font-weight: bold;
  }
`;
