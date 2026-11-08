import { useContext } from 'react'
import { ThemeContext } from './context/themeContext'
import { TodoContext } from './context/todoContext'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterButtons from './components/FilterButtons'
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

function App() {
  const { theme } = useContext(ThemeContext)
  const { todos, clearCompleted } = useContext(TodoContext)

  const todosCompleted = todos.filter((todo) => todo.completed).length

  // 🌚 = dark, 🌝 = light: turns the emoji into the class names
  const themeClass = theme === '🌚' ? '🌚' : '🌝'

  return (
    <>
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

        <TodoInput />

        <FilterButtons />

        <TodoList />

        <button
          type="button"
          onClick={clearCompleted}
          disabled={todosCompleted === 0}
        >
          Clear completed
        </button>
      </main>
    </>
  )
}

export default App
