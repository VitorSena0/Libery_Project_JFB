const express = require("express")
const con = require("../dbconnection")
const route = express()

const BookRoutes = {
    ReadBook:route.get('/book/ReadBook', async (req,res) => {
      const client = await con.connect();
      try {
          const result = await client.query('SELECT * FROM tb_books');
          res.send(result.rows);
      } catch (error) {
          console.error('Erro ao obter alunos', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    AddBook:route.post("/book/SignBook",(req,res) => {
        //ToDo
    }),
    RemoveBook:route.post("/book/DeleteBook",(req,res) => {
        //ToDo
    }),
    UpdateBook:route.post("/book/UpdateBook",(req,res) => {
        //ToDo
    })
}

module.exports = BookRoutes;
