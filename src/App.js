import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import Addtodo from './Component/Addtodo';
import Todos from './Component/Todos';
import Sidebar from './Component/Sidebar';
import SearchBar from './Component/SearchBar';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import ThemeToggle from './Component/ThemeToggle';

const App = () => {
  const [date, setDate] = useState();
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [err, setErr] = useState('');
  const [theme, setTheme] = useState('light');
  const [filterChecked, setFilterChecked] = useState('Все');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalstorage();
  }, []);

  useEffect(() => {
    saveLs(todos);
  }, [todos]);

  const filterAndSearchTodos = useCallback(() => {
    let filtered = todos;
  
    switch (filterChecked) {
      case "Выполненные":
        filtered = todos.filter((todo) => todo.completed === true);
        break;
      case "В процессе":
        filtered = todos.filter((todo) => todo.completed === false);
        break;
      case "Важно":
        filtered = todos.filter((todo) => todo.important === true);
        break;
      case "Все":
        filtered = todos;
        break;
      default:
        filtered = todos;
        break;
    }
  
    const searched = filtered.filter(todo =>
      todo.todo.toLowerCase().includes(searchText.toLowerCase())
    );
  
    setFilteredTodos(searched);
  }, [todos, filterChecked, searchText]);

  useEffect(() => {
    filterAndSearchTodos();
  }, [todos, filterChecked, searchText, filterAndSearchTodos]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let time = date && format(date, 'dd MMM yyyy', { locale: enGB });
    const id = Math.random() * 2;
    if (text === '') {
      setErr("Please enter a task");
      return;
    }
    if (time === undefined) {
      time = "today";
    }
    setTodos([...todos, { todo: text, date: time, completed: false, key: id, important: false }]);
    setDate();
    setText('');
    setErr('');
  };

  const saveLs = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalstorage = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLs = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLs);
    }
  };

  const toggleImportant = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.key === id) {
        return {
          ...todo, important: !todo.important
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.key !== id));
  };

  const completedHandle = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.key === id) {
        return {
          ...todo, completed: !todo.completed
        };
      }
      return todo;
    }));
  };

  const moveTask = (id, direction) => {
    const index = todos.findIndex(todo => todo.key === id);
    if (index < 0) return;
  
    const newTodos = [...todos];
    const [task] = newTodos.splice(index, 1);
  
    if (direction === 'up' && index > 0) {
      newTodos.splice(index - 1, 0, task);
    } else if (direction === 'down' && index < newTodos.length) {
      newTodos.splice(index + 1, 0, task);
    } else {
      newTodos.splice(index, 0, task);
    }
  
    setTodos(newTodos);
  };

  const updateTask = (id, newText, newDate) => {
    setTodos(todos.map(todo => {
      if (todo.key === id) {
        return {
          ...todo,
          todo: newText,
          date: newDate ? format(newDate, 'dd MMM yyyy', { locale: enGB }) : todo.date,
        };
      }
      return todo;
    }));
  };

  const filterCheck = (filter) => {
    setFilterChecked(filter);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </header>
          <main>
            <SearchBar 
              searchText={searchText} 
              setSearchText={setSearchText} 
              theme={theme} 
            />
            <Addtodo
              submited={handleSubmit}
              handInput={handInput}
              setDate={setDate}
              date={date}
              text={text}
              theme={theme}
            />
            <p className="error">{err}</p>
            <ul className="todo-list">
              {filteredTodos.map((todo, index) => {
                return <Todos
                  key={todo.key}
                  text={todo.todo}
                  date={todo.date}
                  todo={todo}
                  setCompleted={completedHandle}
                  deleteHandle={deleteTodo}
                  theme={theme}
                  toggleImportant={toggleImportant}
                  moveTask={moveTask}
                  updateTask={updateTask}
                />
              })}
            </ul>
          </main>
          <aside>
            <Sidebar
              setFilter={filterCheck}
              theme={theme === 'light' ? lightTheme : darkTheme}
            />
          </aside>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
