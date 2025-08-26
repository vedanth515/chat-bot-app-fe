// import { useState } from 'react'
// import ChatInterface from './components/ChatInterface'
// import AdminPanel from './components/AdminPanel'
// import './App.css'

// function App() {
//   const [isAdmin, setIsAdmin] = useState(false)

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>AI Customer Support</h1>
//         <button 
//           className="admin-toggle" 
//           onClick={() => setIsAdmin(!isAdmin)}
//         >
//           {isAdmin ? 'Back to Chat' : 'Admin Panel'}
//         </button>
//       </header>
      
//       <main className="app-main">
//         {isAdmin ? <AdminPanel /> : <ChatInterface />}
//       </main>
//     </div>
//   )
// }

// export default App;

import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import AdminPanel from './components/AdminPanel'
// import './App.css'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">AI Customer Support</h1>
          <button
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? 'Back to Chat' : 'Admin Panel'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {isAdmin ? <AdminPanel /> : <ChatInterface />}
      </main>
    </div>
  )
}

export default App
