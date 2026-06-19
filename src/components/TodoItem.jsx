function TodoItem({ todo, onToggle, onDelete }) {
  const itemClassName = todo.completed ? 'todo-item todo-item-done' : 'todo-item';

  return (
    <li className={itemClassName}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить задачу: ${todo.text}`}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;
