const con = require("../dbconnection")
const express = require("express")
const route = express()

const AlunoRoutes = {
    ReadeEmp:route.get('/emprestimo/ReadEprestimo',async (req,res) => {
      const client = await con.connect();
      try {
          const result = await client.query('SELECT * FROM tb_emp');
          res.send(result.rows);
      } catch (error) {
          console.error('Erro ao obter alunos', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    AddEmp:route.post("/emprestimo/SignEmprestimo", async (req,res) => {
      const client = await con.connect();
      const client2 = await con.connect();

      console.log(req.body)
      try {
          const result = await client2.query(`SELECT id FROM tb_emp `);
          const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${req.body.livro}'`);
          if(result2.rows[0].estoque != 0){
            await client2.query(`update from tb_books Set estoque = ${result2.rows[0].estoque - 1} where titulo = '${req.body.livro}'`);
            await client.query(`INSERT INTO tb_emp Values ('${req.body.aluno}','${req.body.livro}','${reqBody.data}')` );
            res.send(result.rows[result.rows.length - 1]);
          } else {
            res.send({err:"Não foi possivel fazer o emprestimo"})
          }

      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
          client2.release();
      }
    }),
    RemoveEmp:route.post("/emprestimo/DeleteEmprestimo",async (req,res) => {
      const client = await con.connect();
      const reqBody = {
        id:req.body.id
      }
      console.log(req.body)
      try {
        const res2 = await client2.query(`SELECT livro from tb_emp where id = `+ reqBody.id)
        const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${res2.rows[0].livro}'`);
        await client2.query(`update from tb_books Set estoque = ${result2.rows[0].estoque + 1} where titulo = '${res2.rows[0].livro}'`);
        await client.query(`DELETE FROM tb_emp WHERE id = ${reqBody.id}`);
          res.send("Dados Deletados com sucesso");
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
      }
    }),

}

module.exports = AlunoRoutes;
