const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// Date Function
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


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach((person, i) => {
      console.log(`${i}: ${output(person)}`)
    }); //output: 1
    client.end();
  });
});