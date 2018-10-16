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

const convertDate = (date) => {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return `${year}-${month}-${day}`
}

const output = (obj) => {
  const { first_name, last_name, birthdate } = obj
  return `${first_name} ${last_name}, born '${convertDate(birthdate)}'`
}


knex.select().from('famous_people').asCallback((err, result) => {
  if(err) {
    return console.log(err)
  }
  result.forEach((person, i) => {
      console.log(`${i}: ${output(person)}`)
    });
  knex.destroy()
})