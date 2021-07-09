import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    textDecoration:"none",
    color: "white",
    marginRight: "25px",
    marginLeft: "25px"
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar
}));

const Nav = () => {
  const classes = useStyles();

  return (<>
    <div>
      <AppBar position="static">
        <div className={classes.flex}>
        <Link to="/" className={classes.link}>
            <Typography variant="h6">Add Score</Typography>
          </Link>
          <Link to="/ViewScores" className={classes.link}>
            <Typography variant="h6">View Scores</Typography>
          </Link>
        </div>
      </AppBar>
    </div>
  </>)
}
export default Nav