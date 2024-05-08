const con = require("../dbconnection")
const express = require("express")
const route = express()
<<<<<<< HEAD

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
=======
const fs = require('fs')
function writeToLog(message,name,type) {
  const logPath = '../logs/'+name;
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
  ReadAluno: route.get('/aluno/ReadAluno', async (req, res) => {
    const client = await con.connect();
    try {
      const result = await client.query('SELECT * FROM tb_alunos');
      res.send(result.rows);

      // Registra a informação nos logs

    } catch (error) {
      console.error('Erro ao obter alunos', error);

      // Registra o erro nos logs

    } finally {
      client.release();
    }
  }),

  AddAluno: route.post('/aluno/SignAluno', async (req, res) => {
    const client = await con.connect();
    const client2 = await con.connect();
    const reqBody = {
      nome: req.body.nome,
      tel: req.body.telefone,
      email: req.body.email,
      esc: req.body.escolaridade,
      turma: req.body.turma,
    };
    try {
      await client.query(`INSERT INTO tb_alunos (nome,tel,email,escolaridade,turma,emprestimos) Values ('${reqBody.nome}','${reqBody.tel}','${reqBody.email}','${reqBody.esc}','${reqBody.turma}',0)`);

      const result = await client2.query(`SELECT id FROM tb_alunos `);
      writeToLog('Aluno adicionado com sucesso', 'Aluno.log', 'INFO');
      res.send(result.rows[result.rows.length - 1]);

      // Registra a informação nos logs

    } catch (error) {
      console.error('Erro ao inserir dados', error);

      // Registra o erro nos logs
      writeToLog('Erro ao inserir dados', 'Aluno.log', 'ERROR');
    } finally {
      client.release();
      client2.release();
    }
  }),

  RemoveAluno: route.post('/aluno/DeleteAluno', async (req, res) => {
    const client = await con.connect();
    const reqBody = {
      id: req.body.id,
    };
    try {
      let res1 = await client.query(`select nome from tb_alunos where id = ${reqBody.id}`);
      let res2 = await client.query(`select aluno from tb_emp where aluno = '${res1.rows[0].nome}'`);

      if (res2.rows[0]) {
        res.send('N');
      } else {
        await client.query(`DELETE FROM tb_alunos WHERE id = ${reqBody.id}`);
        res.send('S');
      }

      // Registra a informação nos logs
      writeToLog('Aluno removido com sucesso', 'Aluno.log', 'INFO');
    } catch (error) {
      console.error('Erro ao remover aluno', error);

      // Registra o erro nos logs
      writeToLog('Erro ao remover aluno', 'Aluno.log', 'ERROR');
    } finally {
      client.release();
    }
  }),

  UpdateAluno: route.post('/aluno/UpdateAluno', async (req, res) => {
    const client = await con.connect();
    const reqBody = {
      nome: req.body.nome,
      tel: req.body.telefone,
      email: req.body.email,
      esc: req.body.escolaridade,
      turma: req.body.turma,
      id: req.body.id,
    };

    try {
      let res1 = await client.query(`select nome from tb_alunos where id = ${reqBody.id}`);
      let res2 = await client.query(`select aluno from tb_emp where aluno = '${res1.rows[0].nome}'`);

      if (res2.rows[0]) {
        res.send('N');
      } else {
        await client.query(`UPDATE tb_alunos
                            SET nome = '${reqBody.nome}',
                                tel = '${reqBody.tel}',
                                email = '${reqBody.email}',
                                escolaridade = '${reqBody.esc}',
                                turma = '${reqBody.turma}'
                            WHERE id = ${reqBody.id}`);
        res.send('S');
      }

      // Registra a informação nos logs
      writeToLog('Aluno  atualizado com sucesso', 'Aluno.log', 'INFO');
    } catch (error) {
      console.error('Erro ao atualizar aluno', error);

      // Registra o erro nos logs
      writeToLog('Erro ao atualizar aluno', 'Aluno.log', 'ERROR');
    } finally {
      client.release();
    }
  }),
};
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00

module.exports = AlunoRoutes;
