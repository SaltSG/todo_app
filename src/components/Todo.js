import React, { useState } from 'react';
import Button from '@atlaskit/button';

export default function Todo({ todo, onCheckBtnClick, onDeleteBtnClick, onEditBtnClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      {isEditing ? (
        <>
          <input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button
            appearance="primary"
            onClick={() => {
              onEditBtnClick(todo.id, editValue);
              setIsEditing(false);
            }}
            style={{ marginRight: 8 }}
          >
            Lưu
          </Button>
          <Button onClick={() => setIsEditing(false)}>Hủy</Button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              flex: 1,
              marginRight: 8,
            }}
          >
            {todo.name}
          </span>
          <Button
            isDisabled={todo.isCompleted}
            onClick={() => onCheckBtnClick(todo.id)}
            style={{ marginRight: 8 }}
          >
            Hoàn thành
          </Button>
          <Button
            appearance="warning"
            onClick={() => {
              setIsEditing(true);
              setEditValue(todo.name);
            }}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button
            appearance="danger"
            onClick={() => onDeleteBtnClick(todo.id)}
          >
            Xóa
          </Button>
        </>
      )}
    </div>
  );
}
