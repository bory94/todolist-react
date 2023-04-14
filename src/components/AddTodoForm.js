import React, {useState, useRef, useEffect} from 'react';

const AddTodoForm = ({ handleAddTodo }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            handleAddTodo(inputValue.trim());
            setInputValue('');
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a todo item"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodoForm;
