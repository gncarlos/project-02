import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function ViewScores() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [testData, setTestData] = useState([]);
  const [updatedFlag, setUpdatedFlag] = useState(false);
  const [updateField, setUpdateField] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [pushups, setPushups] = useState(null);
  const [situps, setSitups] = useState(null);
  const [runTime, setRunTime] = useState(null);
  const [tmpRowValues, setTmpRowValues] = useState([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, testData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    fetch('http://localhost:3001/tests', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({test_id: id}) // body data type must match "Content-Type" header
    })
    .then(() => setUpdatedFlag(!updatedFlag))//fetch chain      
    .catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    fetch('http://localhost:3001/tests')
      .then((response) => {
        return response.json();
      })
      .then(setTestData)
      .catch(err => {
        console.error(err);
      });//fetch
  }, [updatedFlag]);//useEffect initial API call

  function getSitupsScore() {
    let maxSitups = 58
    let maxScore = 20
    
    if (situps >= maxSitups) {
      return maxScore
    } else {
      return (situps/ maxSitups) * maxScore
    }
  }

  function getPushupsScore() {
    let maxPushups = 67
    let maxScore = 20
    
    if (pushups >= maxPushups) {
      return maxScore
    } else {
      return (pushups/ maxPushups) * maxScore
    }
  }

  function onUpdate() {
    let pushupScore = getPushupsScore()
    let situpsScore= getSitupsScore()
    console.log('onUpdate tmpRowValue', tmpRowValues);

  }

  function captureUserInputs(inputs, id) {
    let tmp = testData.filter(test => test.test_id === id)[0];
    ({...tmp} = inputs);
    setTmpRowValues(inputs);
    console.log('captureUserInputs tmp: ', tmp);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Push-ups</TableCell>
            <TableCell>Push-up score</TableCell>
            <TableCell>Run time</TableCell>
            <TableCell>Run time score</TableCell>
            <TableCell>Sit-ups</TableCell>
            <TableCell>Sit-up score</TableCell>
            <TableCell>Test Date</TableCell>
            <TableCell>Total score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 && testData
            ? testData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : testData
          ).map((testData) => (
            <TableRow key={testData.test_id}>
              <TableCell onClick={() => {
                handleDelete(testData.test_id)}
                } component="th" scope="row">
                 <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
              </TableCell>
             
              {updateField === false || clickedId !== testData.test_id ?  
              <>
               <TableCell component="th" scope="row">
                <Button onClick={() => {
                  setClickedId(testData.test_id)
                  setUpdateField(!updateField)}}>Update</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {testData.first_name}
              </TableCell> 
                    <TableCell component="th" scope="row">
                    {testData.last_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.age}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.gender}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.push_ups}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.push_ups_score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.run_time.slice(0,5)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.run_time_score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.sit_ups}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.sit_ups_score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.test_date.slice(0,10)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {testData.total_score}
                  </TableCell>
                  </>
              :
              <>
                <TableCell component="th" scope="row">
                <Button onClick={() => {
                  setClickedId(testData.test_id)
                  setUpdateField(!updateField)}}>Cancel</Button>
                  <Button onClick={() => onUpdate()}>Submit</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                <TextField id="standard-basic" label="First Name" defaultValue={testData.first_name}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" label="Last Name" defaultValue={testData.last_name}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" label="Age" defaultValue={testData.age}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" label="Gender" defaultValue={testData.gender}/>
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" type="number" label="Push Ups" defaultValue={testData.push_ups} onChange={(event) => {
                setPushups(event.target.value)
                captureUserInputs({push_ups: event.target.value}, testData.test_id)
              }
            }/>
              </TableCell>
              <TableCell component="th" scope="row">
              {testData.push_ups_score}
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" label="Run Time" defaultValue={testData.run_time} onChange={(event) => setRunTime(event.target.value)}/>
              </TableCell>
              <TableCell component="th" scope="row">
                    {testData.run_time_score}
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" type="number" label="Sit Ups" defaultValue={testData.sit_ups} onChange={(event) => setSitups(event.target.value)}/>
              </TableCell>
              <TableCell component="th" scope="row">
                    {testData.sit_ups_score}
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField id="standard-basic" type="date" label="Test Date" defaultValue={testData.test_date.slice(0,10)}/>
              </TableCell>
              <TableCell component="th" scope="row">
                    {testData.total_score}
              </TableCell>
              </>
              }
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={testData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}