import { TextField, Typography, Radio, RadioGroup, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel, Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import {useState} from 'react'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

const UserInput = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [gender, setGender] = useState("")

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()

    return (
      props.history.push("/ScoreInput", { firstName: firstName, 
                                          lastName: lastName, 
                                          ageRange: ageRange, 
                                          gender: gender 
                                        })
    )
  }

  return(
    <div>
      <Grid
        container
        justify="center"
        alignItems='center'
        direction='column'
        >
        <form onSubmit={handleSubmit}>
          <Grid item>
            <Typography variant='h4'>
              Enter your information:
            </Typography>
          </Grid>
          <Grid item>
           
            <TextField
              className={classes.field}
              label='First Name'
              fullWidth
              onChange={(e)=>setFirstName(e.target.value)}/>

            <TextField
              label='Last Name'
              fullWidth
              onChange={(e)=>setLastName(e.target.value)}
              />
            
            <FormControl className={classes.field}>
              <InputLabel id="label">Age</InputLabel>
              <Select labelId="label" onChange={(e)=>setAgeRange(e.target.value)} >
                <MenuItem value={0}>Less than 25</MenuItem>
                <MenuItem value={1}>25-29</MenuItem>
                <MenuItem value={2}>30-34</MenuItem>
                <MenuItem value={3}>35-39</MenuItem>
                <MenuItem value={4}>40-44</MenuItem>
                <MenuItem value={5}>45-49</MenuItem>
                <MenuItem value={6}>50-54</MenuItem>
                <MenuItem value={7}>55-59</MenuItem>
                <MenuItem value={8}>60 or more</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.field}>
              <FormLabel>Gender:</FormLabel>
              <RadioGroup onChange={(e)=>setGender(e.target.value)}>
                <FormControlLabel value='male' control={<Radio/>} label='Male' />
                <FormControlLabel value='female' control={<Radio/>} label='Female' />
              </RadioGroup>
            </FormControl>
            <Button
              className=""
              type='submit'
              variant='contained'
              endIcon={<KeyboardArrowRightIcon />}
            >
            Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}
export default UserInput;