import React, { useState } from 'react'

const calculateaverage = (g, n ,b) => {
  return (g * 1 + b * -1) / (g + n + b)
}

const positive = (g, n ,b) => {
  return g /(g + n + b) + "%"
}

const Button = (props) => {
  return <button onClick={ () => props.f(props.v + 1)}>{props.vn}</button>
}

const StatisticLine = (props) => {
  return (
  <tr>
    <th style={{textAlign: "left"}}>{props.text} </th> 
    <th style={{textAlign: "left"}}>{props.value} </th>
  </tr>
  )
}
const Statistics = ({good, neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div> 
       <p> no feedback given </p>  
      </div>
    )
  }
  return (
    <div>
    <h1> statistics </h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>

          <StatisticLine text="average" value={calculateaverage(good, neutral, bad)}/>
          <StatisticLine text="positive" value={positive(good,neutral,bad)}/>
        </tbody>
      </table>  
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback</h1>
      <Button f={setGood} v={good} vn = {"good"}/>
      <Button f={setNeutral} v={neutral} vn = {"neutral"}/>
      <Button f={setBad} v={bad} vn = {"bad"}/>

      <Statistics  good = {good} neutral = {neutral} bad = {bad}   />
    </div>
  )
}

export default App