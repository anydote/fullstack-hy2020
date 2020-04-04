import React from 'react'

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

export default Course