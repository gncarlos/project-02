import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, TextField, Typography, Radio, RadioGroup, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import { FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

const UserInput = () => {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState(0);
  const [gender, setGender] = useState('');

  const classes = useStyles()
  let x = ''

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      'Name:', name,
      'Age Group:', ageGroup,
      'Gender:', gender)
  }

  return(

    <div>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography
          variant='h4'
        >
          Enter your information:
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            label='Name'
            required
            onChange={(e) => setName(e.target.value)}
            />

          <FormControl className={classes.field}>
            <InputLabel id="label">Age</InputLabel>
            <Select labelId="label" onChange={(e) => setAgeGroup(e.target.value)}>
              <MenuItem value={1}>Less than 25</MenuItem>
              <MenuItem value={2}>25-29</MenuItem>
              <MenuItem value={3}>30-34</MenuItem>
              <MenuItem value={4}>35-39</MenuItem>
              <MenuItem value={5}>40-44</MenuItem>
              <MenuItem value={6}>45-49</MenuItem>
              <MenuItem value={7}>50-54</MenuItem>
              <MenuItem value={8}>55-59</MenuItem>
              <MenuItem value={9}>60 or more</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.field}>
            <FormLabel>Gender:</FormLabel>
            <RadioGroup onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value='male' control={<Radio/>} label='Male' />
              <FormControlLabel value='female' control={<Radio/>} label='Female' />
            </RadioGroup>
          </FormControl>

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

export default UserInput;