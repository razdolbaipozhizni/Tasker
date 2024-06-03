// src/components/ThemeToggle.js
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  background: ${({ theme }) => theme.toggleBackground};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 8rem;
`;

const ToggleButton = styled.span`
  cursor: pointer;
  flex: 1;
  text-align: center;
  color: ${({ theme, active }) => (active ? '#5D00A5' : theme.toggleColor)}; 
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer>
      <ToggleButton active={theme === 'dark'} onClick={() => toggleTheme('dark')}>
        Dark
      </ToggleButton>
      <ToggleButton active={theme === 'light'} onClick={() => toggleTheme('light')}>
        Light
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
