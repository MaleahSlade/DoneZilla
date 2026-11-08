import { useContext, useState } from 'react'
import { ThemeContext, type Theme } from './context/themeContext'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

// Child component: reads the theme from context
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === '🌝' ? '🌚' : '🌝'}
    </button>
  )
}

interface TODOHeroProps {
  todos_completed: number
  total_todos: number
}

function TODOHero({ todos_completed, total_todos }: TODOHeroProps) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div>
        <p>Completed Tasks</p>
      </div>

      <div
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid #cec8ef',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {todos_completed}/{total_todos}
      </div>
    </section>
  )
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [theme, setTheme] = useState<Theme>('🌚')
  const [todos, setTodos] = useState<Todo[]>([])

  function toggleTheme() {
    setTheme(theme === '🌝' ? '🌚' : '🌝')
  }

  function addTodo(text: string) {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function editTodo(id: number, text: string) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    )
  }

  const todosCompleted = todos.filter((todo) => todo.completed).length

  // 🌚 = dark, 🌝 = light: turns the emoji into the class names
  const themeClass = theme === '🌚' ? '🌚' : '🌝'

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <nav className={`nav-${themeClass}`}>
        <ThemeToggle />
      </nav>

      <main className={`content-${themeClass}`}>
        <h1>DoneZilla</h1>
        <h2> ⚡️ Obliterate Tasks Like a Kaiju ⚡️</h2>

                <TODOHero
          todos_completed={todosCompleted}
          total_todos={todos.length}
        />

        <TodoInput onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </main>
    </ThemeContext.Provider>
  )
}

export default App