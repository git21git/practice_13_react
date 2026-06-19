function TodoStats({ totalCount, activeCount, completedCount }) {
  return (
    <div className="todo-stats" aria-label="Статистика задач">
      <div>
        <span>{totalCount}</span>
        <p>Всего</p>
      </div>
      <div>
        <span>{activeCount}</span>
        <p>Осталось</p>
      </div>
      <div>
        <span>{completedCount}</span>
        <p>Выполнено</p>
      </div>
    </div>
  );
}

export default TodoStats;
