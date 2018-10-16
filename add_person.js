const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const data = process.argv.slice(2)


knex('famous_people').insert({first_name: data[0], last_name: data[1], birthdate: data[2]}).asCallback((err) => {
  if (err) {
    console.log(err)
  }
  console.log('Record inserted')
  knex.destroy()
})