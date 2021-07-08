import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { TextField, Typography, Radio, RadioGroup, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

const ScoreInput = (props) => {
  const [pushups, setPushups] = useState(0);
  const [situps, setSitups] = useState(0);
  const [runTime, setRunTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [runMin, setRunMin] = useState('')
  const [runSec, setRunSec] = useState('')

  const classes = useStyles()

  const handleSubmit = () => {
    let firstName = props.location.state.firstName
    let lastName = props.location.state.lastName
    let ageRange = props.location.state.ageRange
    let gender = props.location.state.gender
    let {score, time} = getRunScore()
    let pushupInput = getPushupsScore()
    let situpInput = getSitupsScore()
    let totalScore = Math.round((score + pushupInput + situpInput) * 100) / 100
    // console.log('this is the run time in hadle submit', runTime)

    let object = {
      first_name: firstName,
      last_name: lastName,
      age: ageRange,
      gender: gender,
      push_ups: pushups,
      push_ups_score: pushupInput,
      run_time: time,
      run_time_score: score,
      sit_ups: situps,
      sit_ups_score: situpInput,
      test_date: selectedDate,
      total_score: totalScore
    }
    console.log(object)
    fetch('http://localhost:3001/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(object) // body data type must match "Content-Type" header
    })    
    .catch(err => {
      console.error(err);
    })
  }

  function getRunScore() {
    let maxPoints = 60
    let maxRun = 9.12
    let forRunTime = [runMin, runSec].join(':')
    setRunTime(forRunTime)
    console.log('this is the run time in get run score', runTime)
    let runNum = parseFloat([runMin, runSec].join('.'))
    console.log("this is the runNum: ", runNum)
    console.log(typeof runNum)
    if (runNum < maxRun) {
      return 60
    } else {
      return {score: Math.round(((maxRun / runNum) * maxPoints) * 100) / 100, time: [runMin, runSec].join(':')}
    }
  }

  function getPushupsScore() {
    let maxPushups = 67
    let maxScore = 20
    if (pushups >= maxPushups) {
      return maxScore
    } else {
      return Math.round(((pushups / maxPushups) * maxScore) * 100) / 100
    }
  }

  function getSitupsScore() {
    let maxSitups = 58
    let maxScore = 20
    if (situps >= maxSitups) {
      return maxScore
    } else {
      return Math.round(((situps/ maxSitups) * maxScore) * 100) / 100
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString());
  }

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems='center'
        direction='column'
      >
        <Grid item>
          <Typography variant='h4'>
            Enter your score:
          </Typography>
        </Grid>

        {/* <form noValidate autoComplete='off' onSubmit={handleSubmit}> */}
          <Grid item>
            <TextField
              className={classes.field}
              label='Push-ups'
              type="number"
              onChange={(e) => setPushups(Number(e.target.value))}
            />
            <TextField
              className={classes.field}
              type="number"
              label='Sit-ups'
              onChange={(e) => setSitups(Number(e.target.value))}
            />
            <TextField
              className={classes.field}
              type="number"
              label='min'
              onChange={(e) => setRunMin(e.target.value)}
            />
            <TextField
              className={classes.field}
              type="number"
              label='sec'
              onChange={(e) => setRunSec(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.field}
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                label="Test Date:"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <br/>
            <Link to="./ViewScores">
            <Button
                type='submit'
                variant='contained'
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleSubmit}
                >Submit</Button>
            
            </Link>
            
          </Grid>
        {/* </form> */}
      </Grid>
    </div>
  )
}
export default ScoreInput;

// {first_name: "Jos", last_name: Hahn2,"age": 27, gender: "male",  push_ups: 79, push_ups_score: "30.0", run_time: "11:23", run_time_score: "40.0", sit_ups: 80, sit_ups_score: "30.0", test_date: "2019-11-01", total_score: "100.0"}


//   if (pushups >= 67){
  //     return 20
  //   } else if ( pushups < 67 && pushups > 48) {
  //     if (pushups === 55){
  //       return 17.7
  //     }else {
  //       if(pushups < 55) {
  //         let diff = maxPushups - pushups - 1
  //         return (maxScore - (diff * 0.2))
  //       } else {
  //         let diff = maxPushups - pushups
  //         return (maxScore - (diff * 0.2))
  //       }
  //     }
  //   } else if (pushups <= 48 && pushups > 32){
  //     if(pushups === 48 ||pushups === 46 ||pushups === 44 ||pushups === 43 ||pushups === 41 ||pushups === 40 ||pushups === 40 ||pushups === 38 ||pushups === 36 ||pushups === 34 ) {
  //     maxScore = 16.2
  //     maxPushups = 48
  //     let diff = maxPushups - pushups
  //     return (maxScore - (diff * 0.3))
  //     } else if (pushups === 47 || pushups === 45 || pushups === 43) {
  //      return ('in progress')
  //     } else {
  //     maxScore = 14.6
  //     maxPushups = 42
  //     let diff = maxPushups - pushups
  //     return (maxScore - (diff * 0.6))
  //     } 
  //   } else if (pushups === 32) {
  //     return (7)
  //   } else if (pushups === 31) {
  //     return (4)
  //   } else if (pushups === 30) {
  //     return (1)
  //   } else {
  //     return (0)
  //   }


//   <FormControl className={classes.field}>
//   <InputLabel id="label">Run Time</InputLabel>
//   <Select labelId="label" onChange={(e)=>setRunTime(e.target.value)} >
//     <MenuItem value={0}>Less than 9:12</MenuItem>
//     <MenuItem value={1}>9:13 - 9:34</MenuItem>
//     <MenuItem value={2}>9:35 - 9:45</MenuItem>
//     <MenuItem value={3}>9:46 - 9:58</MenuItem>
//     <MenuItem value={4}>9:59 - 10:10</MenuItem>
//     <MenuItem value={5}>10:11 - 10:23</MenuItem>
//     <MenuItem value={6}>10:24 - 10:37</MenuItem>
//     <MenuItem value={7}>10:38 - 10:51</MenuItem>
//     <MenuItem value={8}>10:52 - 11:06</MenuItem>
//     <MenuItem value={9}>11:07 - 11:22</MenuItem>
//     <MenuItem value={10}>11:23 - 11:38</MenuItem>
//     <MenuItem value={11}>11:39 - 11:56</MenuItem>
//     <MenuItem value={12}>11:57 - 12:14</MenuItem>
//     <MenuItem value={13}>12:15 - 12:33</MenuItem>
//     <MenuItem value={14}>12:34 - 12:53</MenuItem>
//     <MenuItem value={15}>12:54 - 13:14</MenuItem>
//     <MenuItem value={16}>13:15 - 13:36</MenuItem>
//     <MenuItem value={17}>13:37 - 14:00</MenuItem>
//     <MenuItem value={18}>14:01 - 14:25</MenuItem>
//     <MenuItem value={19}>14:26 - 14:52</MenuItem>
//     <MenuItem value={20}>14:53 - 15:20</MenuItem>
//     <MenuItem value={21}>15:21 - 15:50</MenuItem>
    
//   </Select>
// </FormControl>