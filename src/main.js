const express = require("express")
const app = express()
const path = require('path')
const Main = require("./routes/main")
//const { Pool } = require('pg');
const port = 3000;

/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'biblioteca',
  password: 'sua_senha_do_postgresql',
  port: 5432,
});*/

app.use(express.json());
app.use('/',Main.main)

app.listen(port, () => {
    console.log("app listen in http://localhost:3000")
})
