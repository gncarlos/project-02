import React from 'react';
import { useState } from 'react';
import { makeStyles, TextField, Typography,  Button, Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  grid: {
    width: '100%',
    minHeight: '75vh'
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  },
  btn: {
    marginLeft: 10,
    marginRight: 10
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ScoreInput = (props) => {
  const [pushups, setPushups] = useState(0);
  const [situps, setSitups] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [runMin, setRunMin] = useState('')
  const [runSec, setRunSec] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  const [displayScore, setdisplayScore] = useState(false)
  const [open, setOpen] = React.useState(false);

  const classes = useStyles()
  
  const handleClick = () => {
    let {score } = getRunScore()
    let pushupInput = getPushupsScore()
    let situpInput = getSitupsScore()
    let scoreTotal = Math.round((score + pushupInput + situpInput) * 100) / 100
    setTotalScore(scoreTotal)
    setdisplayScore(true)
  }

  const handleSubmit = () => {
    let firstName = props.location.state.firstName
    let lastName = props.location.state.lastName
    let age = props.location.state.age
    let gender = props.location.state.gender
    let {score, time} = getRunScore()
    let pushupInput = getPushupsScore()
    let situpInput = getSitupsScore()
    let scoreTotal = Math.round((score + pushupInput + situpInput) * 100) / 100
    setTotalScore(scoreTotal)
    let object = {
      first_name: firstName,
      last_name: lastName,
      age: age,
      gender: gender,
      push_ups: pushups,
      push_ups_score: pushupInput,
      run_time: time,
      run_time_score: score,
      sit_ups: situps,
      sit_ups_score: situpInput,
      test_date: selectedDate,
      total_score: scoreTotal
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
    .then(() => {
      setPushups(0)
      setSitups(0)
      setSelectedDate(new Date())
      setRunMin(0)
      setRunSec(0)
      setOpen(true);
    })   
    .catch(err => {
      console.error(err);
    })
  }
  
  function getRunScore() {
    let maxPoints = 60
    let maxRun = 9.12
    let time = [runMin, runSec].join(':')
    let runNum = parseFloat([runMin, runSec].join('.'))
    if (runNum < maxRun) {
      return {score: 60, time: time}
    } else {
      return {score: Math.round(((maxRun / runNum) * maxPoints) * 100) / 100, time: time}
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

  // const ageGroup = () => {
  //   let age = props.location.state.age

  //   if (age < 25) setAgeRange("<25")
  //   if (age >=25 && age <= 29) setAgeRange("25-29")
  //   if (age >=30 && age <= 34) setAgeRange("30-34")
  //   if (age >=35 && age <= 39) setAgeRange("35-39")
  //   if (age >=40 && age <= 44) setAgeRange("30-34")
  //   if (age >=45 && age <= 49) setAgeRange("35-39")
  //   if (age >=50 && age <= 54) setAgeRange("30-34")
  //   if (age >=55 && age <= 59) setAgeRange("35-39")
  //   if (age >= 60) setAgeRange("60>")
  // }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const displayResults = () => {
    if(displayScore === true) {
      console.log('display score', totalScore)
      let displayThis = `Your score is ${totalScore}`
      return (
        <Grid item md={6}>
          <p id="total_score_field">{displayThis}</p>
        </Grid>

      )
    }
    else {
      return <></>
    }
  }

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        justifyContent="center"
        alignItems='center'
        direction='column'
      >
          <Grid item >
            <Typography variant='h4'>
              Enter your score: 
            </Typography>
            <TextField
              id="pushUps_field"
              className={classes.field}
              label='Push-ups'
              type="number"
              fullWidth
              onChange={(e) => setPushups(Number(e.target.value))}
            />
            <TextField
              id="sitUps_field"
              className={classes.field}
              type="number"
              label='Sit-ups'
              fullWidth
              onChange={(e) => setSitups(Number(e.target.value))}
            />
            <TextField
              id="min_field"
              className={classes.field}
              type="number"
              label='min'
              fullWidth
              min="0"
              max="59"
              onChange={(e) => setRunMin(e.target.value)}
            />
            <TextField
              id="sec_field"
              className={classes.field}
              type="number"
              label='sec'
              fullWidth
              min="0"
              max="59"
              onChange={(e) => setRunSec(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.field}
                fullWidth
                id="calendar_field"
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                label="Test Date:"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <Button
                className={classes.btn}
                type='submit'
                variant='contained'
                color='primary'
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleSubmit}
                >Submit
            </Button>
            <Button className={`${classes.btn} calculate_field`}
                    variant='contained' 
                    color='secondary'
                    onClick={() => handleClick()}
                    >Calculate
            </Button>
          </Grid>
          {displayResults()}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              PT score has been successfully submitted!
            </Alert>
          </Snackbar>
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
