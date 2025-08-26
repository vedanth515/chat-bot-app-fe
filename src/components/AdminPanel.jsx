// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './AdminPanel.css'

// const AdminPanel = () => {
//   const [faqs, setFaqs] = useState([])
//   const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' })
//   const [editingId, setEditingId] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     fetchFAQs()
//   }, [])

//   const fetchFAQs = async () => {
//     try {
//       const response = await axios.get('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs')
//       setFaqs(response.data)
//     } catch (error) {
//       console.error('Error fetching FAQs:', error)
//     }
//   }

//   const handleAddFaq = async (e) => {
//     e.preventDefault()
//     if (!newFaq.question.trim() || !newFaq.answer.trim()) return

//     setIsLoading(true)
//     try {
//       const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs', newFaq)
//       setFaqs([...faqs, response.data])
//       setNewFaq({ question: '', answer: '', category: 'General' })
//     } catch (error) {
//       console.error('Error adding FAQ:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleUpdateFaq = async (id, updatedFaq) => {
//     setIsLoading(true)
//     try {
//       const response = await axios.put(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`, updatedFaq)
//       setFaqs(faqs.map(faq => faq._id === id ? response.data : faq))
//       setEditingId(null)
//     } catch (error) {
//       console.error('Error updating FAQ:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDeleteFaq = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this FAQ?')) return

//     setIsLoading(true)
//     try {
//       await axios.delete(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`)
//       setFaqs(faqs.filter(faq => faq._id !== id))
//     } catch (error) {
//       console.error('Error deleting FAQ:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="admin-panel">
//       <h2>FAQ Management</h2>
      
//       <form onSubmit={handleAddFaq} className="faq-form">
//         <h3>Add New FAQ</h3>
//         <input
//           type="text"
//           placeholder="Question"
//           value={newFaq.question}
//           onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Answer"
//           value={newFaq.answer}
//           onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Category (optional)"
//           value={newFaq.category}
//           onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Adding...' : 'Add FAQ'}
//         </button>
//       </form>

//       <div className="faqs-list">
//         <h3>Existing FAQs ({faqs.length})</h3>
//         {faqs.length === 0 ? (
//           <p>No FAQs yet. Add some above!</p>
//         ) : (
//           faqs.map(faq => (
//             <div key={faq._id} className="faq-item">
//               {editingId === faq._id ? (
//                 <div className="faq-edit">
//                   <input
//                     type="text"
//                     value={faq.question}
//                     onChange={(e) => setFaqs(faqs.map(f => 
//                       f._id === faq._id ? { ...f, question: e.target.value } : f
//                     ))}
//                   />
//                   <textarea
//                     value={faq.answer}
//                     onChange={(e) => setFaqs(faqs.map(f => 
//                       f._id === faq._id ? { ...f, answer: e.target.value } : f
//                     ))}
//                   />
//                   <input
//                     type="text"
//                     value={faq.category}
//                     onChange={(e) => setFaqs(faqs.map(f => 
//                       f._id === faq._id ? { ...f, category: e.target.value } : f
//                     ))}
//                   />
//                   <div className="edit-actions">
//                     <button 
//                       onClick={() => handleUpdateFaq(faq._id, faq)}
//                       disabled={isLoading}
//                     >
//                       Save
//                     </button>
//                     <button 
//                       onClick={() => setEditingId(null)}
//                       disabled={isLoading}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="faq-display">
//                   <h4>{faq.question}</h4>
//                   <p>{faq.answer}</p>
//                   <span className="faq-category">{faq.category}</span>
//                   <div className="faq-actions">
//                     <button 
//                       onClick={() => setEditingId(faq._id)}
//                       disabled={isLoading}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteFaq(faq._id)}
//                       disabled={isLoading}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminPanel

import { useState, useEffect } from 'react'
import axios from 'axios'
// import './AdminPanel.css'

const AdminPanel = () => {
  const [faqs, setFaqs] = useState([])
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' })
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => { fetchFAQs() }, [])
  const fetchFAQs = async () => {
    try {
      const response = await axios.get('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs')
      setFaqs(response.data)
    } catch (error) { console.error('Error fetching FAQs:', error) }
  }

  const handleAddFaq = async (e) => {
    e.preventDefault()
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return
    setIsLoading(true)
    try {
      const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs', newFaq)
      setFaqs([...faqs, response.data])
      setNewFaq({ question: '', answer: '', category: 'General' })
    } catch (error) { console.error('Error adding FAQ:', error) }
    finally { setIsLoading(false) }
  }

  const handleUpdateFaq = async (id, updatedFaq) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`, updatedFaq)
      setFaqs(faqs.map(faq => faq._id === id ? response.data : faq))
      setEditingId(null)
    } catch (error) { console.error('Error updating FAQ:', error) }
    finally { setIsLoading(false) }
  }

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return
    setIsLoading(true)
    try {
      await axios.delete(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`)
      setFaqs(faqs.filter(faq => faq._id !== id))
    } catch (error) { console.error('Error deleting FAQ:', error) }
    finally { setIsLoading(false) }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">FAQ Management</h2>
          <p className="text-sm text-gray-600 mt-1">Create, edit, and delete FAQs for the chatbot.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-1">
            <form onSubmit={handleAddFaq} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New FAQ</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${isLoading ? 'bg-yellow-50 text-yellow-700 ring-yellow-200' : 'bg-emerald-50 text-emerald-700 ring-emerald-200'}`}>
                  {isLoading ? 'Working...' : 'Ready'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Question</label>
                  <input
                    type="text"
                    placeholder="e.g., How to reset password?"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Answer</label>
                  <textarea
                    placeholder="Provide a clear, concise answer..."
                    rows={5}
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    required
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Account, Billing"
                    value={newFaq.category}
                    onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Adding...' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </section>

          <section className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h3 className="text-lg font-semibold text-gray-900">Existing FAQs ({faqs.length})</h3>
                <div className="hidden text-sm text-gray-500 sm:flex sm:items-center sm:gap-2">
                  <span>Tip:</span>
                  <span>Click Edit to modify, Save to persist</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {faqs.length === 0 ? (
                  <div className="p-8 text-center text-gray-600">No FAQs yet. Add some above!</div>
                ) : (
                  faqs.map(faq => (
                    <div key={faq._id} className="p-5 transition-colors hover:bg-gray-50">
                      {editingId === faq._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Question</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => setFaqs(faqs.map(f => f._id === faq._id ? { ...f, question: e.target.value } : f))}
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Answer</label>
                            <textarea
                              rows={4}
                              value={faq.answer}
                              onChange={(e) => setFaqs(faqs.map(f => f._id === faq._id ? { ...f, answer: e.target.value } : f))}
                              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">Category</label>
                            <input
                              type="text"
                              value={faq.category}
                              onChange={(e) => setFaqs(faqs.map(f => f._id === faq._id ? { ...f, category: e.target.value } : f))}
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateFaq(faq._id, faq)}
                              disabled={isLoading}
                              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              disabled={isLoading}
                              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">{faq.question}</h4>
                            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{faq.answer}</p>
                            <span className="mt-2 inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                              {faq.category || 'Uncategorized'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 sm:self-start">
                            <button
                              onClick={() => setEditingId(faq._id)}
                              disabled={isLoading}
                              className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq._id)}
                              disabled={isLoading}
                              className="inline-flex items-center rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
