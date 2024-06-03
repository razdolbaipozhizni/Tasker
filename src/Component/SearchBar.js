// src/Component/SearchBar.js
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import '../style.css'; // Импортируем стили

const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  border: 3px solid #707070;
  border-radius: 10px;
  padding: 5px;
  max-height: 70px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  margin-left: 10px;
  width: 434px;
  line-height: 2;
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  background-color: ${props => props.theme === 'dark' ? '#000000' : '#fff'};
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  font-size: 1.7rem;
  padding-top: 6px;
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  transition: all 0.3s ease;
  &:hover {
    background: #B573FF;
    color: whitesmoke;
  }
`;

const SearchBar = ({ searchText, setSearchText, theme }) => {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchContainer>
      <Form>
        <Input 
          type="text" 
          value={searchText} 
          onChange={handleChange} 
          placeholder="Поиск задач..." 
          theme={theme} 
        />
        <Button theme={theme}>
          <BiSearch />
        </Button>
      </Form>
    </SearchContainer>
  );
};

export default SearchBar;
