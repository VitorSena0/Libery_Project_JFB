const express = require("express")
const route = express()

const BookRoutes = {
    AlunoMain:route.get('/book', (req,res) => {
        //ToDo
    }),
    ReadAluno:route.get('/book/ReadBook', (req,res) => {
        //ToDo
    }),
    AddAluno:route.post("/book/SignBook",(req,res) => {
        //ToDo
    }),
    RemoveAluno:route.post("/book/DeleteBook",(req,res) => {
        //ToDo
    }),
    UpdateAluno:route.post("/book/UpdateBook",(req,res) => {
        //ToDo
    })
}

module.exports = BookRoutes;
