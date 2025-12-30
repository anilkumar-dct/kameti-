import { useState, useEffect } from 'react'
import type { Todo } from '@prisma/client'

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const data = await window.todo.getAll()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const created = await window.todo.create({ title: newTodo, completed: false })
      setTodos([created, ...todos])
      setNewTodo('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const updated = await window.todo.toggle(id, !completed)
      setTodos(todos.map(t => t.id === id ? updated : t))
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await window.todo.delete(id)
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <div className="todo-container" style={{
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      color: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 300, fontSize: '2rem' }}>Tasks</h2>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#007aff',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Add
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: 'center', opacity: 0.6 }}>Loading tasks...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              marginBottom: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.5 : 1,
                  fontSize: '1.1rem'
                }}>
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ff3b30',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '5px',
                  opacity: 0.6,
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
              >
                Delete
              </button>
            </li>
          ))}
          {!loading && todos.length === 0 && (
            <p style={{ textAlign: 'center', opacity: 0.4, marginTop: '40px' }}>No tasks found. Add one above!</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default TodoApp
