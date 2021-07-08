import React from 'react';
import { useState, useEffect } from 'react';

const Sandbox = () => {
  const [data, setData] = useState([])
  
  const getData = () => {
    fetch('ScoringData.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((res) => {
      return res.json()
    })
    .then(setData)
  }
  useEffect(()=>{getData()},[])

  return (<>
  Sandbox Component
  
  {data.map((scoreData) => {
    return scoreData.cardio.map((times) => {
      return <p>{times.runTime}</p>
      })
    })}
  </>)
}

export default Sandbox;

