const express = require("express");
const axios = require('axios');
const fs = require('fs'); // Adicionado para o uso do fs
const path = require('path'); // Adicionado para configurar o diretório de views
const route = express();

// Configuração do diretório de views
route.set('views', path.join(__dirname, '../views'));
route.set('view engine', 'ejs');

function writeToLog(message, name, type) {
  const logPath = '../logs/' + name;
  const formattedMessage = `[${new Date().toLocaleString()}] ${type} - ${message}\n`;

  // Escrever no arquivo de log
  fs.appendFile(logPath, formattedMessage, (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo de log:', err);
    }
  });

  // Exibir no console
  console.log(`[${new Date().toLocaleString()}] ${type} - ${message}`);
}

const AlunoRoutes = {
    main: route.get('/', (req, res) => {
        res.render("index");
    }),
    Erro404: route.get("/404", (req, res) => {
      res.render("404");
    }),
    AlunoMain: route.get('/aluno', async (req, res) => {
      try {
        const response = await axios.get('http://localhost:3000/aluno/ReadAluno');
        const alunos = response.data;

        res.render("aluno", { alunos });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send('Erro na requisição');
      }
    }),
    BookMain: route.get('/book', async (req, res) => {
      try {
        const response = await axios.get('http://localhost:3000/book/ReadBook');
        const books = response.data;
        res.render("book", { books });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send('Erro na requisição');
      }
    }),
    EmprestimoMain: route.get('/emprestimo',  async (req, res) => {
      try {
        const response1 = await axios.get('http://localhost:3000/aluno/ReadAluno');
        const response2 = await axios.get('http://localhost:3000/book/ReadBook');
        const response3 = await axios.get('http://localhost:3000/emprestimo/ReadEmprestimo');
        const emprestimos = response3.data;
        const alunos = response1.data;
        const livros = response2.data;
        res.render("emprestimos", { emprestimos, alunos, livros });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send('Erro na requisição');
      }
    })
}

module.exports = AlunoRoutes;
