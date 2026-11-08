import { createContext, useMemo, useState, type ReactNode } from 'react'

export type Filter = 'all' | 'active' | 'completed'

interface FilterContextValue {
  filter: Filter
  setFilter: (filter: Filter) => void
}

export const FilterContext = createContext<FilterContextValue>({
  filter: 'all',
  setFilter: () => {},
})

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>('all')

  const value = useMemo(() => ({ filter, setFilter }), [filter])

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
