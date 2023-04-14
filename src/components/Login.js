import React, {useState, useRef, useEffect} from 'react';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
    const inputLoginRef = useRef(null)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        inputLoginRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <img src="/logo.webp" alt="Logo" className="login-logo" />
                <div>
                <label htmlFor="username" className="login-label">Username </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    ref={inputLoginRef}
                />
                </div>
                <div>
                <label htmlFor="password" className="login-label">Password </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                </div>
                <a href="#" className="login-forgot">Forgot password?</a>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;