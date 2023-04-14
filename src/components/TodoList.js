import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleDeleteTodo, handleCompleteTodo, handleEditTodoSave }) => {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCompleteTodo={handleCompleteTodo}
                    handleEditTodoSave={handleEditTodoSave}
                />
            ))}
        </ul>
    );
};

export default TodoList;
