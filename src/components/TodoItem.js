import React, { useState } from 'react';

const TodoItem = ({ todo, handleEditTodoSave, handleDeleteTodo, handleCompleteTodo }) => {
    const [editingTodoText, setEditingTodoText] = useState(todo.todo);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditTodoChange = (e) => {
        setEditingTodoText(e.target.value);
    };

    const handleEdit = (e) => {
        e.preventDefault()
        if (editingTodoText.trim() !== '') {
            handleEditTodoSave(todo.id, editingTodoText.trim());
            setIsEditing(false);
        }
    };

    const handleEditTodoCancel = () => {
        setEditingTodoText(todo.todo);
        setIsEditing(false);
    };

    return (
        <li className={todo.completed ? 'completed' : ''}>
            {isEditing ? (
                <form onSubmit={handleEdit}>
                    <input type="text" value={editingTodoText} onChange={handleEditTodoChange} />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleEditTodoCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <input type="checkbox" checked={todo.completed} onChange={() => handleCompleteTodo(todo.id)} />
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.todo}
          </span>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
