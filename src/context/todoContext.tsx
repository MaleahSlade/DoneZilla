import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

export interface Todo {
  id: string | number
  text: string
  completed: boolean
}

type TodoAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: Todo['id'] }
  | { type: 'delete'; id: Todo['id'] }
  | { type: 'edit'; id: Todo['id']; text: string }
  | { type: 'clearCompleted' }

interface TodoContextValue {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: Todo['id']) => void
  deleteTodo: (id: Todo['id']) => void
  editTodo: (id: Todo['id'], newText: string) => void
  clearCompleted: () => void
}

export const TodoContext = createContext<TodoContextValue>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
})

const STORAGE_KEY = 'donezilla-todos'

// Load saved todos when the app starts (falls back to an empty list)
function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Todo[]) : []
  } catch {
    return []
  }
}

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, action.todo]
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case 'delete':
      return state.filter((todo) => todo.id !== action.id)
    case 'edit':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      )
    case 'clearCompleted':
      return state.filter((todo) => !todo.completed)
    default:
      return state
  }
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, undefined, loadTodos)

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // storage unavailable or full: keep working without saving
    }
  }, [todos])

  const addTodo = useCallback((text: string) => {
    const todo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      completed: false,
    }
    dispatch({ type: 'add', todo })
  }, [])

  const toggleTodo = useCallback(
    (id: Todo['id']) => dispatch({ type: 'toggle', id }),
    []
  )
  const deleteTodo = useCallback(
    (id: Todo['id']) => dispatch({ type: 'delete', id }),
    []
  )
  const editTodo = useCallback(
    (id: Todo['id'], newText: string) =>
      dispatch({ type: 'edit', id, text: newText }),
    []
  )
  const clearCompleted = useCallback(
    () => dispatch({ type: 'clearCompleted' }),
    []
  )

  const value = useMemo(
    () => ({ todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }),
    [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
