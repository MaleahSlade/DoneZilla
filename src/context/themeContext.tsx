// // Step 1: Create context

// import { createContext } from "react"

// // call the createContext to create the context object
// export const ThemeContext = createContext(null); // initial/default value would go here (if we have it)

import { createContext } from 'react'

export type Theme = '🌝' | '🌚'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: '🌚',
  toggleTheme: () => {},
})