import './App.css';
import TodoList from './components/TodoList';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');

  // Lấy danh sách todo từ API khi load trang
  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodoList(data));
  }, []);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  // Thêm todo qua API
  const onAddBtnClick = useCallback(() => {
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: textInput, isCompleted: false })
    })
      .then(res => res.json())
      .then(newTodo => setTodoList(prev => [newTodo, ...prev]));
    setTextInput('');
  }, [textInput]);

  // Đánh dấu hoàn thành qua API
  const onCheckBtnClick = useCallback((id) => {
    const todo = todoList.find(t => t.id === id);
    if (!todo || todo.isCompleted) return;
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: true })
    })
      .then(res => res.json())
      .then(updatedTodo =>
        setTodoList(prev =>
          prev.map(t => t.id === id ? updatedTodo : t)
        )
      );
  }, [todoList]);

  // Xóa todo qua API
  const onDeleteBtnClick = useCallback((id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTodoList(prev => prev.filter(todo => todo.id !== id)));
  }, []);

  // Sửa tên todo qua API
  const onEditBtnClick = useCallback((id, newName) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })
      .then(res => res.json())
      .then(updatedTodo =>
        setTodoList(prev =>
          prev.map(todo => todo.id === id ? updatedTodo : todo)
        )
      );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button appearance="primary" isDisabled={!textInput} onClick={onAddBtnClick}>
            Thêm
          </Button>
        }
        css={{ padding: '2px 4px 2px' }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList
        todoList={todoList}
        onCheckBtnClick={onCheckBtnClick}
        onDeleteBtnClick={onDeleteBtnClick}
        onEditBtnClick={onEditBtnClick}
      />
    </>
  );
}

export default App;
