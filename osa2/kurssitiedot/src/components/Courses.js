import React from 'react'

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Content = (props) => {
    const { parts } = props
    return (

        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}
const Total = (props) => {

    const total = props.parts.reduce((s, p) => {
        return s + p.exercises
    }, 0)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Course = (props) => {
    const course = props.course
    return (
        <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
export default Course