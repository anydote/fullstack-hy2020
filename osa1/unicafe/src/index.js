import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let feedbackCount = good + neutral + bad
  let feedbackPoints = good * 1 + neutral * 0 + bad * (-1)
  let average = parseFloat(feedbackPoints / feedbackCount).toFixed(2)
  let positiveShare = parseFloat(good / feedbackCount).toFixed(2) + " %"

  if (feedbackCount > 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={feedbackCount} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positiveShare} />
      </table>  
    )
  } else {
    return <div><p>No feedback given</p></div>
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)