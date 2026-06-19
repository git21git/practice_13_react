const filters = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
];

function TodoFilter({ currentFilter, onChangeFilter }) {
  return (
    <div className="todo-filter" aria-label="Фильтр задач">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={currentFilter === filter.id ? 'filter-button active' : 'filter-button'}
          type="button"
          onClick={() => onChangeFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
