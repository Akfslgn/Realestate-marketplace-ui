export async function fetchTodos(userId) {
  const response = await fetch(`/api/todos?user_id=${userId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function addTodo(todo) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  };
  const response = await fetch('/api/todos', options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function deleteTodo(todoId, userId) {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(
    `/api/todos/${todoId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
