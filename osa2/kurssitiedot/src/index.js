import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ name, count, id }) => <p key={id}>{name} {count}</p>

const Content = ({ parts }) => (
  parts.map(part => <Part name={part.name} count={part.exercises} id={part.id} />)
)

const Course = ({ course }) => (
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
