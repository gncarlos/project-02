import { Container, TextField, Typography, Radio, RadioGroup, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({

});

const handleSubmit = (e) => {
  e.preventDefault()
}

const marks = [
  {
    value: 0,
    label: '<25',
  },
  {
    value: 20,
    label: '25-29',
  },
  {
    value: 37,
    label: '30-34',
  },
  {
    value: 100,
    label: '35-39',
  },
];

function valuetext(value) {
  return `${value}°C`;
}
const UserInput = () => {
  const classes = useStyles()

  return(
    
    <div>
      <Container >
        <Typography
          variant='h4'
        >
          Enter your information:
        </Typography>
       
        <FormControl>
          <TextField
            label='Name'
            fullWidth />
          <br/>
          <div >
            <Typography id="discrete-slider-custom" gutterBottom>
              Age Group:
            </Typography>
            <Slider
              defaultValue={20}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
            />
    </div>
          <br/>
          {/* <InputLabel id="label">Age</InputLabel>
          <Select labelId="label" >
            <MenuItem value={1}>Less than 25</MenuItem>
            <MenuItem value={2}>25-29</MenuItem>
            <MenuItem value={3}>30-34</MenuItem>
            <MenuItem value={4}>35-39</MenuItem>
            <MenuItem value={5}>40-44</MenuItem>
            <MenuItem value={6}>45-49</MenuItem>
            <MenuItem value={7}>50-54</MenuItem>
            <MenuItem value={8}>55-59</MenuItem>
            <MenuItem value={9}>60 or more</MenuItem>
          </Select> */}
          <br/>
         
          <RadioGroup>
            <FormControlLabel value='male' control={<Radio/>} label='Male' />
            <FormControlLabel value='female' control={<Radio/>} label='Female' />
          </RadioGroup>
          <br/>
          <Button
          type='submit'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </FormControl>
      </Container>

    </div>

  )
}

export default UserInput;