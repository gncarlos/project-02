import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

const ScoreInput = () => {
  const [pushups, setPushups] = useState(0);
  const [situps, setSitups] = useState(0);
  const [runTime, setRunTime] = useState('');

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      'Push-ups:', pushups,
      'Sit-ups:', situps,
      'RunTime:', runTime)
  }
  return (

    <div>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography variant='h4'>
          Enter your score:
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            label='Push-ups'
            onChange={(e) => setPushups(e.target.value)}
          />
          <TextField
            className={classes.field}
            label='Sit-ups'
            onChange={(e) => setSitups(e.target.value)}
          />
          <TextField
            className={classes.field}
            label='1.5 Mile Run Time'
            onChange={(e) => setRunTime(e.target.value)}
          />
          <Button
              type='submit'
              variant='contained'
              endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>

  )
}
export default ScoreInput;

// {first_name: "Jos", last_name: Hahn2,"age": 27, gender: "male",  push_ups: 79, push_ups_score: "30.0", run_time: "11:23", run_time_score: "40.0", sit_ups: 80, sit_ups_score: "30.0", test_date: "2019-11-01", total_score: "100.0"}