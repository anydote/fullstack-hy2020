import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  )
  
  const selectRandom = () => setSelected(getRandomInt(anecdotes.length))
  const increasePoint = () => setPoints(
    function () {
      const copy = [...points]
      copy[selected] += 1
      return copy
    }
  )

  const indexOfMostVotes = argMax(points)

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={increasePoint} text='vote' />
      <Button handleClick={selectRandom} text='next anecdote' />
      <p>has {points[selected]} votes</p>
      <Header text="Anecdote with the most votes" />
      <p>{props.anecdotes[indexOfMostVotes]}</p>
      <p>has {points[indexOfMostVotes]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
