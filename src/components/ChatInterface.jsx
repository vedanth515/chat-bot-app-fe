// import { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import Message from './Message'
// import './ChatInterface.css'

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [sessionId, setSessionId] = useState(null)
//   const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/api/chat/conversation', {
//           sessionId: sessionId
//         })
        
//         if (response.data.sessionId) {
//           setSessionId(response.data.sessionId)
//         }
        
//         if (response.data.messages) {
//           setMessages(response.data.messages)
//         }
//       } catch (error) {
//         console.error('Error initializing chat:', error)
//       }
//     }

//     initializeChat()
//   }, [])

//   const handleSendMessage = async (e) => {
//     e.preventDefault()
    
//     if (!inputMessage.trim() || isLoading) return
    
//     const userMessage = {
//       text: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     }
    
//     setMessages(prev => [...prev, userMessage])
//     setInputMessage('')
//     setIsLoading(true)
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/chat/message', {
//         sessionId,
//         message: inputMessage
//       })
      
//       const botMessage = {
//         text: response.data.response,
//         sender: 'bot',
//         timestamp: new Date(),
//         isFromFAQ: response.data.isFromFAQ
//       }
      
//       setMessages(prev => [...prev, botMessage])
//     } catch (error) {
//       console.error('Error sending message:', error)
      
//       const errorMessage = {
//         text: "Sorry, I'm having trouble connecting. Please try again later.",
//         sender: 'bot',
//         timestamp: new Date(),
//         isError: true
//       }
      
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="chat-interface">
//       <div className="chat-messages">
//         {messages.length === 0 ? (
//           <div className="welcome-message">
//             <h2>Welcome to Customer Support</h2>
//             <p>How can I help you today?</p>
//           </div>
//         ) : (
//           messages.map((message, index) => (
//             <Message 
//               key={index} 
//               message={message} 
//             />
//           ))
//         )}
        
//         {isLoading && (
//           <div className="message bot-message">
//             <div className="message-content">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <div ref={messagesEndRef} />
//       </div>
      
//       <form className="chat-input-form" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="Type your message here..."
//           disabled={isLoading}
//         />
//         <button type="submit" disabled={isLoading || !inputMessage.trim()}>
//           Send
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ChatInterface




import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from './Message'
import FileUpload from './FileUpload'
import './ChatInterface.css'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/chat/conversation', {
          sessionId: sessionId
        })
        
        if (response.data.sessionId) {
          setSessionId(response.data.sessionId)
          fetchUploadedFiles(response.data.sessionId)
        }
        
        if (response.data.messages) {
          setMessages(response.data.messages)
        }
      } catch (error) {
        console.error('Error initializing chat:', error)
      }
    }

    initializeChat()
  }, [])

  const fetchUploadedFiles = async (sessionId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat/files/${sessionId}`)
      setUploadedFiles(response.data)
    } catch (error) {
      console.error('Error fetching uploaded files:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || isLoading) return
    
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    try {
      const response = await axios.post('http://localhost:5000/api/chat/message', {
        sessionId,
        message: inputMessage
      })
      
      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
        isFromFAQ: response.data.isFromFAQ
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = () => {
    fetchUploadedFiles(sessionId)
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Customer Support Chat</h2>
        <FileUpload sessionId={sessionId} onFileUpload={handleFileUpload} />
        {/* {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <span>Uploaded files: {uploadedFiles.length}</span>
          </div>
        )} */}
        {uploadedFiles.length > 0 && (
  <div className="uploaded-files">
    <span>Uploaded files: {uploadedFiles.length}</span>
    <ul>
      {uploadedFiles.map((file) => (
        <li key={file._id}>
          <a href={`http://localhost:5000/${file.filename}`} target="_blank" rel="noreferrer">{file.originalName}</a>
        </li>
      ))}
    </ul>
  </div>
)}

      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to Customer Support</h2>
            <p>How can I help you today? You can upload PDF or TXT files for context.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message 
              key={index} 
              message={message} 
            />
          ))
        )}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInterface;