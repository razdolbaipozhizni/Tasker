import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { FaStar, FaCalendarAlt, FaList } from 'react-icons/fa';

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.50s linear;
  height: 100vh;
  position: fixed;
`;

const SidebarButton = styled.button`
  background: none;
  border: 2px solid #5D00A5;
  color: #5D00A5;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 349px;
  transform: translateY(-50%);
  font-size: 1.7rem;
  width: 40px;
  height: 80px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #5D00A5;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.buttonsBackground};
  color: ${({ theme }) => theme.buttonText};
  border: 3px solid #5D00A5;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.iconColor};
  }
`;

const Sidebar = ({ setFilter, theme }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleToggle = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <ThemeProvider theme={theme}>
      <SidebarContainer className={`sidebar ${openSidebar && "display-sidebar"}`}>
        <h1>Tasker</h1>
        <FilterButton onClick={() => setFilter('Важно')}>
          <FaStar /> Важно
        </FilterButton>
        {/* <FilterButton onClick={() => setFilter('Запланировано')}> */}
          {/* <FaCalendarAlt /> Запланировано */}
        {/* </FilterButton> */}
        <FilterButton onClick={() => setFilter('Все')}>
          <FaList /> Все
        </FilterButton>
        <FilterButton onClick={() => setFilter('Выполненные')}>
          <FaList /> Выполненные
        </FilterButton>
        <FilterButton onClick={() => setFilter('В процессе')}>
          <FaList /> В процессе
        </FilterButton>
        <SidebarButton onClick={handleToggle} className="toggle-sidebar">
          {openSidebar ? <BiChevronLeft /> : <BiChevronRight />}
        </SidebarButton>
      </SidebarContainer>
    </ThemeProvider>
  );
};

export default Sidebar;
