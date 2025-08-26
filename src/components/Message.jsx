import './Message.css'

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`message ${message.sender}-message`}>
      <div className="message-content">
        <p>{message.text}</p>
        {message.isFromFAQ && (
          <span className="faq-badge">From FAQ</span>
        )}
        {message.isError && (
          <span className="error-badge">Error</span>
        )}
      </div>
      <span className="message-time">
        {formatTime(message.timestamp)}
      </span>
    </div>
  )
}

export default Message