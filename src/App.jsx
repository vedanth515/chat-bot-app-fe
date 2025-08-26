import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Customer Support</h1>
        <button 
          className="admin-toggle" 
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? 'Back to Chat' : 'Admin Panel'}
        </button>
      </header>
      
      <main className="app-main">
        {isAdmin ? <AdminPanel /> : <ChatInterface />}
      </main>
    </div>
  )
}

export default App;