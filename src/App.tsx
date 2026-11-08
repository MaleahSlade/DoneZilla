import { useState, useContext } from 'react'
import { ThemeContext, type Theme } from './context/themeContext'
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
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState<Theme>('🌚')

  function toggleTheme() {
    setTheme(theme === '🌝' ? '🌚' : '🌝')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <nav className={`nav-${theme}`}>
        <ThemeToggle />
      </nav>

      <main className={`content-${theme}`}>
        <h1>DoneZilla</h1>
        <h2> ⚡️ Obliterate Tasks Like a Kaiju ⚡️</h2>

        <TODOHero todos_completed={0} total_todos={5} />

        <fieldset id="center">
          {/* <button
            type="button"
            className="counter"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button> */}
        </fieldset>
      </main>
    </ThemeContext.Provider>
  )
}

export default App