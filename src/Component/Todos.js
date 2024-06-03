// src/Component/Todos.js
import React, { useState } from 'react';
import { BiCheck, BiX, BiStar, BiUpArrow, BiDownArrow, BiPencil, BiSave, BiCalendar } from "react-icons/bi";
import styled from 'styled-components';
import { format } from 'date-fns';
import DatePicker from './DatePicker';

const Button = styled.button`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
`;

const ImportantButton = styled(Button)`
  color: ${props => props.important ? '#5D00A5' : (props.theme === 'dark' ? '#fff' : '#000')};
`;

const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DatePickerPopup = styled.div`
  position: absolute;
  top: -50px; 
  left: 340px ; 
  z-index: 1000; 
`;

const Todos = ({ text, date, todo, setCompleted, deleteHandle, theme, toggleImportant, moveTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newDate, setNewDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSave = () => {
    updateTask(todo.id, newText, newDate);
    setIsEditing(false);
  };

  return (
    <div>
      <li className="todos">
        <div className={`text ${todo.completed ? "completed" : ""}`}>
          {isEditing ? (
            <input 
              type="text" 
              value={newText} 
              onChange={(e) => setNewText(e.target.value)} 
              theme={theme}
            />
          ) : (
            <h3>{text}</h3>
          )}
        </div>
        <div className="meta">
          <p className="todo-date">
            {isEditing ? (newDate ? format(newDate, 'dd MMM yyyy') : date) : date}
          </p>
          <DatePickerContainer>
            {isEditing && (
              <Button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} theme={theme}>
                <BiCalendar />
              </Button>
            )}
            {isDatePickerOpen && isEditing && (
              <DatePickerPopup>
                <DatePicker date={newDate} setDate={setNewDate} />
              </DatePickerPopup>
            )}
          </DatePickerContainer>
          <ImportantButton onClick={() => toggleImportant(todo.id, todo.important)} important={todo.important} theme={theme}> <BiStar /> </ImportantButton>
          <Button onClick={() => moveTask(todo.id, 'up')} theme={theme}> <BiUpArrow /> </Button>
          <Button onClick={() => moveTask(todo.id, 'down')} theme={theme}> <BiDownArrow /> </Button>
          <Button onClick={() => setCompleted(todo.id, todo.completed)} theme={theme}> <BiCheck /> </Button>
          <Button onClick={() => deleteHandle(todo.id)} theme={theme}> <BiX /></Button>
          {isEditing ? (
            <Button onClick={handleSave} theme={theme}> <BiSave /> </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} theme={theme}> <BiPencil /> </Button>
          )}
        </div>
      </li>
    </div>
  );
};

export default Todos;
