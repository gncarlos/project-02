var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development']);

router.get('/', function(req, res, next) {
    knex.select().table('tests')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send("There was an error"))
});

router.post('/', (req, res) => {
    if (Object.keys(req.body).length === 12) {
        knex('tests').insert(req.body)
            .then(response => {
            console.log(response)
            res.status(200).send("added test")
            })
            .catch(err => {
            console.log(err)
            res.status(404).send("There was an error")
            })
    } else {
      res.status(400).send("all fields must be filled out")
    }
});

router.put('/', (req, res) => {
    if (req.body.test_id && Object.keys(req.body).length > 1) {
      knex('tests')
        .where('test_id', '=', req.body.test_id)
        .update(req.body)
        .then(response => {
        console.log(response)
        res.status(200).send("updated test")
        })
        .catch(err => {
        console.log(err)
        res.status(404).send("There was an error")
        })
    } else {
      res.status(400).send("must have a test_id or some type of info")
    }
});

router.delete('/', (req, res) => {
  if (req.body.test_id) {
    knex('tests')
    .where('test_id', '=', req.body.test_id)
    .del()
    .then(() => res.status(200).send("Item deleted"))   
    .catch(err => res.status(404).send("There was error, maybe the test_id was invalid"))
  } else {
    res.status(400).send("must have a test_id")
  }
});

module.exports = router;


// order that we need
// "age", "first_name", "gender", "last_name", "push_ups", "push_ups_score", "run_time", 
// "run_time_score", "sit_ups", "sit_ups_score", "test_date", "total_score"

// order that we have
// {"first_name": "Joseph", "last_name": "Hahn", "gender": "male", "age": 24, 
// "push_ups": 79, "push_ups_score": 30.0, "sit_ups": 80, "sit_ups_score": 30.0, "run_time": "11:23", 
 // "run_time_score": 40.0, "total_score": 100.0, "test_date": "2019-11-01"}

 // {"age": 24, "first_name": "Joseph", "gender": "male", "last_name": "Hahn", "push_ups": 79, "push_ups_score": 30.0, "run_time": "11:23", "run_time_score": 
 // 40.0, "sit_ups": 80, "sit_ups_score": 30.0, "test_date": "2019-11-01", "total_score": 100.0}