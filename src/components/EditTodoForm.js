import React, { useState } from 'react';

const EditTodoForm = ({ todo, onSave, onCancel }) => {
    const [editingTodoText, setEditingTodoText] = useState(todo.todo);

    const handleEditTodoChange = (e) => {
        setEditingTodoText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(todo.id, editingTodoText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={editingTodoText}
                onChange={handleEditTodoChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default EditTodoForm;
