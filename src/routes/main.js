const express = require("express")
const axios = require('axios')
const route = express()
const AlunoRoutes = {
    main:route.get('/', (req,res) => {
        res.render("index")
    }),
    Erro404:route.get("/404",(req,res) => {
      res.send("Erro 404")
    }),
    AlunoMain:route.get('/aluno', async (req,res) => {
      try {
        const response = await axios.get('http://localhost:3000/aluno/ReadAluno');
        const alunos = response.data; // Supondo que a resposta contenha os dados dos alunos

        res.render("aluno", { alunos });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send('Erro na requisição');
      }
    }),
    BookMain:route.get('/book', async (req,res) => {
      try {
        const response = await axios.get('http://localhost:3000/book/ReadBook');
        const books = response.data; // Supondo que a resposta contenha os dados dos alunos
        res.render("book", { books });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send('Erro na requisição');
      }
    }),
}
module.exports = AlunoRoutes;
