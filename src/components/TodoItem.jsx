import { useContext, useState } from 'react';
import { TodoContext } from '../context/todoContext';

function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function save() {
    const text = draft.trim();
    if (text) {
      editTodo(todo.id, text);
    } else {
      setDraft(todo.text); // ignore an empty edit
    }
    setIsEditing(false);
  }

  function cancel() {
    setDraft(todo.text);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', listStyle: 'none' }}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') cancel();
          }}
          autoFocus
        />
        <button type="button" onClick={save}>Save</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </li>
    );
  }

  return (
    <li style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', listStyle: 'none' }}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.text}
      </label>
      <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
      <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
