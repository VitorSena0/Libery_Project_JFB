const connection = require("../dbconnection")
const express = require("express")
const route = express()

const AlunoRoutes = {
    ReadAluno:route.get('/aluno/ReadAluno', (req,res) => {
        //ToDo
    }),
    AddAluno:route.post("/aluno/SignAluno",(req,res) => {
      const client = await con.connect();
      const reqBody = {
        nome:req.body.nome,
        tel:req.body.tel,
        email:req.body.email,
        esc:req.body.esc,
        turma:req.body.turma

      }
      try {
          const result = await client.query(`INSERT INTO tb_alunos (nome,telefone,email,escolaridade,turma) Values ${req.body.}` );
          res.send(result.rows);
      } catch (error) {
          console.error('Erro ao obter alunos', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    RemoveAluno:route.post("/aluno/DeleteAluno",(req,res) => {
        //ToDo
    }),
    UpdateAluno:route.post("/aluno/UpdateAluno",(req,res) => {
        //ToDo
    })
}

module.exports = AlunoRoutes;
