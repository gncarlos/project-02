import { TextField, Typography, Radio, RadioGroup, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, Grid, Paper} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import {useState} from 'react'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    marging: '10px',
    minHeight: '75vh'
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
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
        container
        justifyContent="center"
        alignItems='center'
        direction='column'
        >
          <Grid item>
            {/* <Paper className={classes.paper}> */}
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
              }}>
              <Button
                type='submit'
                variant='contained'
                endIcon={<KeyboardArrowRightIcon />}
                className="continue_field"
              >Continue</Button>
              </Link>
            {/* </Paper> */}
          </Grid>
      </Grid>
    </div>
  )
}

export default UserInput;