import React, {useState, useEffect} from 'react';
import './styles/App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import Login from './components/Login';
import * as api from "./api"

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [editingTodoId, setEditingTodoId] = useState(null);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if(localStorageToken && localStorageToken.length > 0) {
            api.setAuthHeader(localStorageToken);
        }
    }, [])

    useEffect(() => {
        if(isLoggedIn) {
            api.getTodos()
                .then((data) => setTodos(data))
                .catch((err) => console.error(err));
        }

    }, [isLoggedIn]);

    const handleLogin = async (username, password) => {
        try {
            const res = await api.login(username, password);
            if (res.status === 200) {
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Invalid username or password');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddTodo = async (text) => {
        try {
            const newTodo = await api.addTodo(text);
            setTodos([...todos, newTodo]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await api.deleteTodo(id);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleCompleteTodo = async (id) => {
        try {
            const updatedTodo = await api.completeTodo(id);
            const updatedTodos = todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            );
            setTodos(updatedTodos);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditTodoSave = async (id, text) => {
        try {
            const updatedTodo = await api.updateTodo(id, text);
            const updatedTodos = todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            );
            setTodos(updatedTodos);
            setEditingTodoId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditTodoCancel = () => {
        setEditingTodoId(null);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin}/>;
    }

    return (
        <div className="App">
            <h1>Todo List</h1>
            <AddTodoForm setTodos={setTodos} handleAddTodo={handleAddTodo}/>
            <TodoList
                todos={todos}
                editingTodoId={editingTodoId}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
                handleEditTodoSave={handleEditTodoSave}
                handleEditTodoCancel={handleEditTodoCancel}
            />
        </div>
    );
};

export default App;
