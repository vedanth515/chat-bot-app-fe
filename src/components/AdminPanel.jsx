import { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminPanel.css'

const AdminPanel = () => {
  const [faqs, setFaqs] = useState([])
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'General' })
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await axios.get('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs')
      setFaqs(response.data)
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    }
  }

  const handleAddFaq = async (e) => {
    e.preventDefault()
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/admin/faqs', newFaq)
      setFaqs([...faqs, response.data])
      setNewFaq({ question: '', answer: '', category: 'General' })
    } catch (error) {
      console.error('Error adding FAQ:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateFaq = async (id, updatedFaq) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`, updatedFaq)
      setFaqs(faqs.map(faq => faq._id === id ? response.data : faq))
      setEditingId(null)
    } catch (error) {
      console.error('Error updating FAQ:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return

    setIsLoading(true)
    try {
      await axios.delete(`https://chat-bot-app-qh2x.onrender.com/api/admin/faqs/${id}`)
      setFaqs(faqs.filter(faq => faq._id !== id))
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-panel">
      <h2>FAQ Management</h2>
      
      <form onSubmit={handleAddFaq} className="faq-form">
        <h3>Add New FAQ</h3>
        <input
          type="text"
          placeholder="Question"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          required
        />
        <textarea
          placeholder="Answer"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={newFaq.category}
          onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add FAQ'}
        </button>
      </form>

      <div className="faqs-list">
        <h3>Existing FAQs ({faqs.length})</h3>
        {faqs.length === 0 ? (
          <p>No FAQs yet. Add some above!</p>
        ) : (
          faqs.map(faq => (
            <div key={faq._id} className="faq-item">
              {editingId === faq._id ? (
                <div className="faq-edit">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => setFaqs(faqs.map(f => 
                      f._id === faq._id ? { ...f, question: e.target.value } : f
                    ))}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setFaqs(faqs.map(f => 
                      f._id === faq._id ? { ...f, answer: e.target.value } : f
                    ))}
                  />
                  <input
                    type="text"
                    value={faq.category}
                    onChange={(e) => setFaqs(faqs.map(f => 
                      f._id === faq._id ? { ...f, category: e.target.value } : f
                    ))}
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={() => handleUpdateFaq(faq._id, faq)}
                      disabled={isLoading}
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="faq-display">
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                  <span className="faq-category">{faq.category}</span>
                  <div className="faq-actions">
                    <button 
                      onClick={() => setEditingId(faq._id)}
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteFaq(faq._id)}
                      disabled={isLoading}
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
  )
}

export default AdminPanel