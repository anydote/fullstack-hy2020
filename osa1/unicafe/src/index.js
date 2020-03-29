import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>
const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setNeutral(neutral + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button 
        handleClick={increaseGood}
        text="good"
      />
      <Button 
        handleClick={increaseNeutral}
        text="neutral"
      />
      <Button 
        handleClick={increaseBad}
        text="bad"
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)