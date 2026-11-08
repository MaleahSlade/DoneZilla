// // Step 1: Create context

// import { createContext } from "react"

// // call the createContext to create the context object
// export const ThemeContext = createContext(null); // initial/default value would go here (if we have it)

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = '🌝' | '🌚'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: '🌚',
  toggleTheme: () => {},
})

const STORAGE_KEY = 'donezilla-theme'

// Load the saved theme when the app starts (falls back to 🌚)
function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === '🌝' || saved === '🌚' ? saved : '🌚'
  } catch {
    return '🌚'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme)

  // Save the theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // storage unavailable: keep working without saving
    }
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === '🌝' ? '🌚' : '🌝')),
    []
  )

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
