// // import { useState, useEffect, useRef } from 'react'
// // import axios from 'axios'
// // import Message from './Message'
// // import './ChatInterface.css'

// // const ChatInterface = () => {
// //   const [messages, setMessages] = useState([])
// //   const [inputMessage, setInputMessage] = useState('')
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [sessionId, setSessionId] = useState(null)
// //   const messagesEndRef = useRef(null)

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
// //   }

// //   useEffect(() => {
// //     scrollToBottom()
// //   }, [messages])

// //   useEffect(() => {
// //     const initializeChat = async () => {
// //       try {
// //         const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/conversation', {
// //           sessionId: sessionId
// //         })
        
// //         if (response.data.sessionId) {
// //           setSessionId(response.data.sessionId)
// //         }
        
// //         if (response.data.messages) {
// //           setMessages(response.data.messages)
// //         }
// //       } catch (error) {
// //         console.error('Error initializing chat:', error)
// //       }
// //     }

// //     initializeChat()
// //   }, [])

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault()
    
// //     if (!inputMessage.trim() || isLoading) return
    
// //     const userMessage = {
// //       text: inputMessage,
// //       sender: 'user',
// //       timestamp: new Date()
// //     }
    
// //     setMessages(prev => [...prev, userMessage])
// //     setInputMessage('')
// //     setIsLoading(true)
    
// //     try {
// //       const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/message', {
// //         sessionId,
// //         message: inputMessage
// //       })
      
// //       const botMessage = {
// //         text: response.data.response,
// //         sender: 'bot',
// //         timestamp: new Date(),
// //         isFromFAQ: response.data.isFromFAQ
// //       }
      
// //       setMessages(prev => [...prev, botMessage])
// //     } catch (error) {
// //       console.error('Error sending message:', error)
      
// //       const errorMessage = {
// //         text: "Sorry, I'm having trouble connecting. Please try again later.",
// //         sender: 'bot',
// //         timestamp: new Date(),
// //         isError: true
// //       }
      
// //       setMessages(prev => [...prev, errorMessage])
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="chat-interface">
// //       <div className="chat-messages">
// //         {messages.length === 0 ? (
// //           <div className="welcome-message">
// //             <h2>Welcome to Customer Support</h2>
// //             <p>How can I help you today?</p>
// //           </div>
// //         ) : (
// //           messages.map((message, index) => (
// //             <Message 
// //               key={index} 
// //               message={message} 
// //             />
// //           ))
// //         )}
        
// //         {isLoading && (
// //           <div className="message bot-message">
// //             <div className="message-content">
// //               <div className="typing-indicator">
// //                 <span></span>
// //                 <span></span>
// //                 <span></span>
// //               </div>
// //             </div>
// //           </div>
// //         )}
        
// //         <div ref={messagesEndRef} />
// //       </div>
      
// //       <form className="chat-input-form" onSubmit={handleSendMessage}>
// //         <input
// //           type="text"
// //           value={inputMessage}
// //           onChange={(e) => setInputMessage(e.target.value)}
// //           placeholder="Type your message here..."
// //           disabled={isLoading}
// //         />
// //         <button type="submit" disabled={isLoading || !inputMessage.trim()}>
// //           Send
// //         </button>
// //       </form>
// //     </div>
// //   )
// // }

// // export default ChatInterface




// import { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import Message from './Message'
// import FileUpload from './FileUpload'
// import './ChatInterface.css'

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [sessionId, setSessionId] = useState(null)
//   const [uploadedFiles, setUploadedFiles] = useState([])
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
//         const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/conversation', {
//           sessionId: sessionId
//         })
        
//         if (response.data.sessionId) {
//           setSessionId(response.data.sessionId)
//           fetchUploadedFiles(response.data.sessionId)
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

//   const fetchUploadedFiles = async (sessionId) => {
//     try {
//       const response = await axios.get(`https://chat-bot-app-qh2x.onrender.com/api/chat/files/${sessionId}`)
//       setUploadedFiles(response.data)
//     } catch (error) {
//       console.error('Error fetching uploaded files:', error)
//     }
//   }

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
//       const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/message', {
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

//   const handleFileUpload = () => {
//     fetchUploadedFiles(sessionId)
//   }

//   return (
//     <div className="chat-interface">
//       <div className="chat-header">
//         <h2>Customer Support Chat</h2>
//         <FileUpload sessionId={sessionId} onFileUpload={handleFileUpload} />
//         {/* {uploadedFiles.length > 0 && (
//           <div className="uploaded-files">
//             <span>Uploaded files: {uploadedFiles.length}</span>
//           </div>
//         )} */}
//         {uploadedFiles.length > 0 && (
//   <div className="uploaded-files">
//     <span>Uploaded files: {uploadedFiles.length}</span>
//     <ul>
//       {uploadedFiles.map((file) => (
//         <li key={file._id}>
//           <a href={`https://chat-bot-app-qh2x.onrender.com/${file.filename}`} target="_blank" rel="noreferrer">{file.originalName}</a>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//       </div>
      
//       <div className="chat-messages">
//         {messages.length === 0 ? (
//           <div className="welcome-message">
//             <h2>Welcome to Customer Support</h2>
//             <p>How can I help you today? You can upload PDF or TXT files for context.</p>
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

// export default ChatInterface;

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from './Message'
import FileUpload from './FileUpload'
// import './ChatInterface.css'

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
        const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/conversation', {
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
      const response = await axios.get(`https://chat-bot-app-qh2x.onrender.com/api/chat/files/${sessionId}`)
      setUploadedFiles(response.data)
    } catch (error) {
      console.error('Error fetching uploaded files:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return
    const userMessage = { text: inputMessage, sender: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    try {
      const response = await axios.post('https://chat-bot-app-qh2x.onrender.com/api/chat/message', {
        sessionId,
        message: userMessage.text
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
    <div className="flex h-[calc(100vh-4rem)] max-h-[100vh] flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Customer Support Chat</h2>
          <p className="text-xs text-gray-500">Ask questions, upload context files (PDF/TXT), and get instant replies.</p>
        </div>
        <FileUpload sessionId={sessionId} onFileUpload={handleFileUpload} />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mx-4 mt-3 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">
          <span className="text-xs font-medium text-indigo-700">Uploaded files: {uploadedFiles.length}</span>
          <ul className="mt-1 list-disc pl-5">
            {uploadedFiles.map((file) => (
              <li key={file._id} className="text-xs">
                <a
                  href={`https://chat-bot-app-qh2x.onrender.com/${file.filename}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {file.originalName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <h2 className="text-base font-semibold text-gray-900">Welcome to Customer Support</h2>
            <p className="mt-1 text-sm text-gray-600">How can help today? Upload PDF or TXT files for extra context.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}

        {isLoading && (
          <div className="mt-2 flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-gray-100 px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-300ms]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-150ms]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
        <div className="mx-auto flex max-w-4xl items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInterface
