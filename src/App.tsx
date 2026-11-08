import { useContext, useState } from 'react'
import { ThemeContext, type Theme } from './context/themeContext'
import TodoInput from './components/TodoInput'
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
    <section>
      <div>
        <p>Task Done</p>
        <p>Keep it up</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>('🌚')

  function toggleTheme() {
    setTheme(theme === '🌝' ? '🌚' : '🌝')
  }

  // 🌚 = dark, 🌝 = light: turns the emoji into the class names your CSS uses
  const themeClass = theme === '🌚' ? 'dark' : 'light'

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <nav className={`nav-${themeClass}`}>
        <ThemeToggle />
      </nav>

      <main className={`content-${themeClass}`}>
        <h1>DoneZilla</h1>
        <h2> ⚡️ Obliterate Tasks Like a Kaiju ⚡️</h2>

        <TODOHero todos_completed={0} total_todos={5} />

        <TodoInput />
      </main>
    </ThemeContext.Provider>
  )
}

export default App