import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const CourseHeader = ({ text }) => <h2>{text}</h2>

const Part = ({ name, count, id }) => <p key={id}>{name} {count}</p>

const Content = ({ parts }) => (
  parts.map(part => <Part name={part.name} count={part.exercises} id={part.id} />)
)

const Total = ({ parts }) => {
  const total = parts.reduce( (s, p) => s + p.exercises, 0)
  return <b>Total of {total} exercises</b>
}

const Course = ({ course }) => (
  <>
    <CourseHeader text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const Courses = ({ courses }) => (
  courses.map(course => <Course course={course} />)  
)

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text="Web development curriculum" />
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
