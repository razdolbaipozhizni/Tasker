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
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';

const App = () => {
  const [date, setDate] = useState();
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [err, setErr] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [filterChecked, setFilterChecked] = useState('Все');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      todosData.sort((a, b) => a.order - b.order);
      setTodos(todosData);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let time = date && format(date, 'dd MMM yyyy', { locale: enGB });
    if (text === '') {
      setErr("Please enter a task");
      return;
    }
    if (time === undefined) {
      time = "today";
    }
    const newOrder = todos.length > 0 ? Math.max(...todos.map(todo => todo.order)) + 1 : 1;
    await addDoc(collection(db, 'todos'), {
      todo: text,
      date: time,
      completed: false,
      important: false,
      order: newOrder,
      createdAt: serverTimestamp()
    });
    setText('');
    setDate(null);
    setErr('');
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const toggleImportant = async (id, important) => {
    await updateDoc(doc(db, 'todos', id), {
      important: !important
    });
  };

  const completedHandle = async (id, completed) => {
    await updateDoc(doc(db, 'todos', id), {
      completed: !completed
    });
  };

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
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handInput = (e) => {
    setText(e.target.value);
  };

  const moveTask = async (id, direction) => {
    const index = todos.findIndex(todo => todo.id === id);
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

    // Обновление порядка задач в Firestore
    await Promise.all(newTodos.map((todo, idx) => {
      return updateDoc(doc(db, 'todos', todo.id), { order: idx + 1 });
    }));
  };

  const updateTask = async (id, newText, newDate) => {
    const todoRef = doc(db, 'todos', id);
    const todoDoc = await getDoc(todoRef);
    const currentData = todoDoc.data();

    await updateDoc(todoRef, {
      todo: newText,
      date: newDate ? format(newDate, 'dd MMM yyyy', { locale: enGB }) : currentData.date,
    });
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
                  key={todo.id}
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
