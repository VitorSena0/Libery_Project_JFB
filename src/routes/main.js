const express = require("express")
const route = express()
const AlunoRoutes = {
    main:route.get('/', (req,res) => {
        res.render("index")
    }),
    Erro404:route.get("/404",(req,res) => {
      res.send("Erro 404")
    }),
    AlunoMain:route.get('/aluno', (req,res) => {
        res.render("aluno")
    }),
    BookMain:route.get('/book', (req,res) => {
        res.render("book")
    }),
}
module.exports = AlunoRoutes;
