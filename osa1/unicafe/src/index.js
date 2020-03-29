import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>
const StatisticLine = ({ text, value }) => <div>{text} {value}</div>
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
  const increaseBad = () => setBad(bad + 1)
  
  let feedbackCount = good + bad + neutral
  let feedbackPoints = good * 1 + bad * (-1) + neutral * 0
  let average = feedbackPoints / feedbackCount

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
      <Header text="statistics" />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={feedbackCount} />
      <StatisticLine text="average" value={average} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)