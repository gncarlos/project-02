
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tests').del()
    .then(function () {
      // Inserts seed entries
      return knex('tests').insert([
        {test_id: 1, first_name: 'Joseph', last_name: 'Hahn', gender: 'male', age: 24, push_ups: 79, push_ups_score: 30.0, sit_ups: 80, sit_ups_score: 30.0, run_time: 11:23, run_time_score: 40.0, total_score: 100.0, test_date: 11/4/2019},
        {test_id: 2, first_name: 'Carlos'},
        {test_id: 3, first_name: 'Steven'},
      ]);
    });
};


// table.increments('test_id'); // adds an auto incrementing PK column
// table.string('first_name');
// table.string('last_name');
// table.string('gender');
// table.integer('age');
// table.integer('push_ups');
// table.float('push_ups_score');
// table.integer('sit_ups');
// table.float('sit_ups_score');
// table.time('run_time');
// table.float('run_time_score');
// table.float('total_score');
// table.date('test_date');
