import { useContext } from 'react';
import { FilterContext } from '../context/filterContext';

const FILTERS = ['all', 'active', 'completed'];

function FilterButtons() {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0' }}>
      {FILTERS.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => setFilter(name)}
          aria-pressed={filter === name}
          style={{ fontWeight: filter === name ? 'bold' : 'normal' }}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
