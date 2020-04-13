import React from 'react'

const Notification = ({ message }) => {
  if (message.content === null) {
    return null
  }

  console.log(message)
  return (
    <div className={message.type}>
      {message.content}
    </div>
  )
}

export default Notification