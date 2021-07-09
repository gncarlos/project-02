import { TextField, Typography, Radio, RadioGroup, Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    minHeight: '75vh'
  },
  link: {
    textDecoration: 'none'
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
}));

const UserInput = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("")

  const classes = useStyles()
  
  return(
    <div>
      <Grid
        className={classes.grid}
        container spacing={2}
        justifyContent="center"
        alignItems='center'
        direction='column'
        >
        <Grid item>
          <Typography variant='h4'>
            Enter your information:
          </Typography>
          
          <TextField
            className={classes.field}
            label='First Name'
            id="first_name_field"
            fullWidth
            onChange={(e)=>setFirstName(e.target.value)}/>
            <TextField
            className={classes.field}
            label='Last Name'
            id="last_name_field"
            fullWidth
            onChange={(e)=>setLastName(e.target.value)}
            />
          <TextField
            className={classes.field}
            label='Age'
            type='number'
            id="age_field"
            data-testid="age_field"
            fullWidth
            onChange={(e)=>setAge(e.target.value)}
            />

          <FormControl className={classes.field}>
            <FormLabel>Gender:</FormLabel>
            <RadioGroup onChange={(e)=>setGender(e.target.value)} className="radio_field">
              <FormControlLabel value='male' control={<Radio color='primary'/>} label='Male' />
              <FormControlLabel value='female' control={<Radio color='primary'/>} label='Female' />
            </RadioGroup>
          </FormControl>

          <Link to={{
            pathname: "/ScoreInput",
            state: { firstName: firstName, lastName: lastName, age: age, gender: gender}
            }}
            className={classes.link}>
            <Button
              type='submit'
              variant='contained'
              endIcon={<KeyboardArrowRightIcon />}
              className={`continue_field ${classes.btn}`}
            >
              Continue
            </Button>
          </Link>
          </Grid>
        </Grid>
    </div>
  )
}

export default UserInput;