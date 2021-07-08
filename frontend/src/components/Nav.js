import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ScoreInput from './ScoreInput.js';
import ViewScores from './ViewScores.js';
import UserInput from './UserInput.js';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration:"none",
    color: "white",
    marginRight: "10px",
  },
  toolbar: theme.mixins.toolbar
}));

const Nav = () => {
  const classes = useStyles();

  return (<>
    <div>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <Link to="/" className={classes.link}>
            <Typography variant="h6">Add Score</Typography>
          </Link>
          <Link to="/ViewScores" className={classes.link}>
            <Typography variant="h6">View Scores</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  </>)
}
export default Nav