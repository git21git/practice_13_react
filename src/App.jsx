import { useEffect, useMemo, useState } from 'react';
import TodoFilter from './components/TodoFilter.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';
import TodoStats from './components/TodoStats.jsx';

const STORAGE_KEY = 'practice_13_react_todos';

const defaultTodos = [
  {
    id: 1,
    text: 'Изучить компоненты React',
    completed: true,
  },
  {
    id: 2,
    text: 'Добавить сохранение задач',
    completed: false,
  },
];

function getSavedTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return defaultTodos;
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : defaultTodos;
  } catch {
    return defaultTodos;
  }
}

function App() {
  const [todos, setTodos] = useState(getSavedTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  function handleAddTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  }

  function handleToggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleDeleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  const isListEmpty = filteredTodos.length === 0;

  return (
    <main className="app">
      <section className="todo-panel" aria-labelledby="app-title">
        <div className="todo-header">
          <p className="eyebrow">Практическая работа 13</p>
          <h1 id="app-title">Менеджер задач</h1>
          <p className="subtitle">
            Добавляйте задачи, отмечайте выполненные и следите за оставшимися делами.
          </p>
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        <TodoStats
          totalCount={todos.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <TodoFilter currentFilter={filter} onChangeFilter={setFilter} />

        {isListEmpty ? (
          <div className="empty-state">
            <h2>Задач пока нет</h2>
            <p>
              Добавьте новую задачу или выберите другой фильтр, чтобы увидеть список.
            </p>
          </div>
        ) : (
          <ul className="todo-list" aria-label="Список задач">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
