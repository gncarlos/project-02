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

  const filter = (gender = 'male', ageRange = '<25') => {
    let filteredData = data.filter((scoreData) => scoreData.gender === gender)
                           .filter((scoreData) => scoreData.ageRange === ageRange)
                           .map((scoreData) => {
                            return scoreData.cardio.map((times) => {
                              return <p>{scoreData.gender} {times.runTime} {times.Points}</p>
                            })
                           })
    return filteredData
  }

  return (<>
    Sandbox Component
    {filter()}
  </>)
}

export default Sandbox;

