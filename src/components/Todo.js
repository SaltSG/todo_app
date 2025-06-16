import React, { useState } from 'react';
import Button from '@atlaskit/button';
import styled, {css} from 'styled-components'
import CheckIcon from '@atlaskit/icon/glyph/check'

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;
  
  &, &:hover {
    ${(p => p.isCompleted && css`
        text-decoration: line-through;
    `)}
  }

  &:hover {
    .check-icon {
        display: inline-block;
    }   
  }

  .check-icon {
    display: none;

    &:hover {
        background-color: #e2e2e2;
        border-radius: 3px;
        }
    }
`

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
            onClick={() => setIsEditing(true)}
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
