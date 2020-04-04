import React from 'react'
import Course from './components/Course'

const Header = ({ text } ) => <h1>{text}</h1>

const Courses = ({ courses }) => (
    courses.map(course => <Course course={course} />)  
  )
  
  const App = ({ courses }) => {
    return (
      <div>
        <Header text="Web development curriculum" />
        <Courses courses={courses} />
      </div>
    )
  }

  export default App