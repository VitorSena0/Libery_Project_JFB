const con = require("../dbconnection")
const express = require("express")
const route = express()

const AlunoRoutes = {
    ReadAluno:route.get('/aluno/ReadAluno',async (req,res) => {
      const client = await con.connect();
      try {
          const result = await client.query('SELECT * FROM tb_alunos');
          res.send(result.rows);
      } catch (error) {
          console.error('Erro ao obter alunos', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    AddAluno:route.post("/aluno/SignAluno", async (req,res) => {
      const client = await con.connect();
      const client2 = await con.connect();
      const reqBody = {
        nome:req.body.nome,
        tel:req.body.telefone,
        email:req.body.email,
        esc:req.body.escolaridade,
        turma:req.body.turma

      }
      console.log(reqBody)
      console.log(req.body)
      try {
          await client.query(`INSERT INTO tb_alunos (nome,tel,email,escolaridade,turma) Values ('${reqBody.nome}','${reqBody.tel}','${reqBody.email}','${reqBody.esc}','${reqBody.turma}')` );
          const result = await client2.query(`SELECT id FROM tb_alunos `);
          res.send(result.rows[result.rows.length - 1]);

      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
          client2.release();
      }
    }),
    RemoveAluno:route.post("/aluno/DeleteAluno",async (req,res) => {
      const client = await con.connect();
      const reqBody = {
        id:req.body.id
      }
      console.log(req.body)
      try {
          await client.query(`DELETE FROM tb_alunos WHERE id = ${reqBody.id}`);
          res.send("Dados Deletados com sucesso");
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    UpdateAluno:route.post("/aluno/UpdateAluno",async (req,res) => {
      const client = await con.connect();
      const reqBody = {
        nome:req.body.nome,
        tel:req.body.telefone,
        email:req.body.email,
        esc:req.body.escolaridade,
        turma:req.body.turma,
        id:req.body.id
      }
      console.log(req.body)
      try {
          await client.query(`UPDATE tb_alunos
                              SET nome = '${reqBody.nome}',
                                  tel = '${reqBody.tel}',
                                  email = '${reqBody.email}',
                                  escolaridade = '${reqBody.esc}',
                                  turma = '${reqBody.turma}'
                              WHERE id = ${reqBody.id}`);
          res.send("Dados alterados com sucesso");
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
      }
    })
}

module.exports = AlunoRoutes;
