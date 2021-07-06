import React from 'react';

const ScoreInput = () => {
  return (
  
    <div>
      <h1>Enter your information</h1>
      <form>
        <label for="pushups">Pushups: </label>
        <input type="text" id="pushUps"></input>
        <br></br>
        <label for='situps'>Sit-ups:</label>
        <input tupe="text" id="age"></input>
        <br></br>
        <label for='runtime'>1.5 mile run:</label>
        <input tupe="text" id="runtime"></input>
        
      <input type="submit" value="submit"></input>
    </form>

  </div>  

  )
}
export default ScoreInput;

// {first_name: "Jos", last_name: Hahn2,"age": 27, gender: "male",  push_ups: 79, push_ups_score: "30.0", run_time: "11:23", run_time_score: "40.0", sit_ups: 80, sit_ups_score: "30.0", test_date: "2019-11-01", total_score: "100.0"}