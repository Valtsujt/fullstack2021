import React from 'react';

interface HeaderProps {
  courseName: string;
}
const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

interface ContentProps {
  coursePart: CoursePart[]
}
const Content = (props: ContentProps) => {
  return (<div>
    {props.coursePart.map(c => {
      return (
        <div key={c.name}>
          <Part part={c} />
        </div>

      )
    })}
  </div>)
}
interface PartProps {
  part: CoursePart;
}
const Part = (props: PartProps) => {
  switch(props.part.type) {
    case "normal":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount} </b></p>
          <p><i>{props.part.description}</i></p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount} </b></p>
          <p><i>{props.part.description}</i></p>
          <p>sumbit to {props.part.exerciseSubmissionLink}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount} </b></p>
          <p>project exercises {props.part.groupProjectCount}</p>
        </div>
      )
      case "special":
        return (
          <div>
            <p><b>{props.part.name} {props.part.exerciseCount} </b></p>
            <p><i>{props.part.description}</i></p>
            <p>required skills: {props.part.requirements.toString()}</p>
          </div>
        )    
  }
  return null
}
const Total = (props: ContentProps) => {
  return (
    <p>
      number of exercies {" "}
      {props.coursePart.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseRequrementPart extends CourseDescription {
  type: "special";
  requirements: string[];
}
type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequrementPart;


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]


const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content coursePart={courseParts} />
      <Total coursePart={courseParts} />
    </div>
  );
};

export default App;