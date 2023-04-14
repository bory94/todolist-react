import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/v1';
const PUBLIC_API_BASE_URL = 'http://localhost:8080/public/api/v1';

export const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const login = async (username, password) => {
    try {
        const res = await axios.post(`${PUBLIC_API_BASE_URL}/login`, {username: username, password: password});
        if (res.status === 200) {
            setAuthHeader(res.data.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', res.data.token);
        }
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getTodos = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/todos`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const addTodo = async (text) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/todos`, {
            todo: text,
            completed: false
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/todos/${id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const completeTodo = async (id) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/todos/${id}/toggle`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateTodo = async (id, text) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/todos/${id}`, {
            id: id, todo: text
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
