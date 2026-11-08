import { useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import { FilterContext } from '../context/filterContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos } = useContext(TodoContext);
  const { filter } = useContext(FilterContext);

  // Only show the todos that match the current filter
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
