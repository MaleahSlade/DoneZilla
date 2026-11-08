import type { ReactNode } from 'react'
import { ThemeProvider } from './context/themeContext'
import { TodoProvider } from './context/todoContext'
import { FilterProvider } from './context/filterContext'

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>{children}</FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}
