import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = taskText.trim();

    if (!trimmedText) {
      setError('Введите текст задачи');
      return;
    }

    onAddTodo(trimmedText);
    setTaskText('');
    setError('');
  }

  function handleInputChange(event) {
    setTaskText(event.target.value);

    if (error) {
      setError('');
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="todo-input">Новая задача</label>
        <input
          id="todo-input"
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Например: подготовить отчет"
          autoComplete="off"
        />
      </div>
      <button type="submit">Добавить</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default TodoForm;
