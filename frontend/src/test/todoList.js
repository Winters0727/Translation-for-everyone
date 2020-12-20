import React, { useState } from 'react';

const TodoList = function() {
    const [ context, setContext ] = useState('');
    const [ todoId, setTodoId ] = useState(1);
    const [ todoList, setTodoList ] = useState([]);
    
    const addTodo = function() {
        const todo = { id : todoId, context : context };
        setTodoId(todoId + 1);
        setTodoList([...todoList, todo]);
        setContext('');
    }

    const deleteTodo = function(e) {
        const deleteId = parseInt(e.target.dataset.id);
        const newTodoList = todoList.filter(todo => todo.id !== deleteId);
        setTodoList(newTodoList);
    }

    return (
        <React.Fragment>
          <h3>할일 목록</h3>
          <ul>
            {todoList.map(todo => {
                return (
                    <li key={todo.id}>
                      <span>{todo.context}</span>
                      <button data-id={todo.id} onClick={deleteTodo}>삭제</button>
                    </li>
                )
            })}
          </ul>
          <div>
            <input type="text" value={context} onChange={e => setContext(e.target.value)} />
            <button onClick={addTodo}>추가</button>
          </div>
        </React.Fragment>
    )
}

export default TodoList