const express = require("express")
const con = require("../dbconnection")
const route = express()
<<<<<<< HEAD

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
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
const BookRoutes = {
    ReadBook:route.get('/book/ReadBook', async (req,res) => {
      const client = await con.connect();
      try {
          const result = await client.query('SELECT * FROM tb_books');
          res.send(result.rows);
      } catch (error) {
          console.error('Erro ao obter alunos', error);
<<<<<<< HEAD
          throw error;
=======
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      } finally {
          client.release();
      }
    }),
    AddBook:route.post("/book/SignBook",async (req,res) => {
      const client = await con.connect();
      const client2 = await con.connect();
<<<<<<< HEAD
=======
      let status = true
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      const reqBody = {
        titulo:req.body.titulo,
        autor:req.body.autor,
        editora:req.body.editora,
        genero:req.body.genero,
        estoque:req.body.estoque
      }
<<<<<<< HEAD
      console.log(reqBody)
      try {
          await client.query(`INSERT INTO tb_books (titulo,autor,editora,genero,estoque) Values ('${reqBody.titulo}','${reqBody.autor}','${reqBody.editora}','${reqBody.genero}','${reqBody.estoque}')` );
          const result = await client2.query(`SELECT titulo FROM tb_books `);
          res.send(result.rows[result.rows.length - 1]);

      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
=======
      try {
          const result = await client.query(`SELECT titulo from tb_books`)
          for(i = 0;i < result.rows.length;i++){
              if(reqBody.titulo === result.rows[i].titulo){
                  status = false;
                  break;
              }
          }
          if(status){
            await client.query(`INSERT INTO tb_books (titulo,autor,editora,genero,estoque) Values ('${reqBody.titulo}','${reqBody.autor}','${reqBody.editora}','${reqBody.genero}','${reqBody.estoque}')` );
            const result = await client2.query(`SELECT titulo FROM tb_books `);
            writeToLog(`Livro '${reqBody.titulo}' Adicionado com sucesso`, 'Book.log', 'INFO');
            res.send(result.rows[result.rows.length - 1]);
          } else {
            writeToLog(`Livro '${reqBody.titulo}' Já inserido no sistema`, 'Book.log', 'WARNING');
              res.send({err:"Erro , O livro inserido já está registrado"})
          }
      } catch (error) {
          writeToLog(`Erro Ao inserir livro '${reqBody.titulo}' Já inserido no sistema`, 'Book.log', 'ERROR');
          console.error('Erro ao inserir dados', error);
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      } finally {
          client.release();
          client2.release();
      }
    }),
    RemoveBook:route.post("/book/DeleteBook",async (req,res) => {
      const client = await con.connect();
      const reqBody = {
        titulo:req.body.titulo
      }
<<<<<<< HEAD
      console.log(req.body)
      try {
          await client.query(`DELETE FROM tb_books WHERE titulo = '${reqBody.titulo}'`);
          res.send("Dados Deletados com sucesso");
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
=======

      try {
        let res1 = await client.query(`select livro from tb_emp where livro = '${reqBody.titulo}'` )
        if(res1.rows[0]){
          res.send('N');
          writeToLog(`ERRO AO REMOVERO O LIVRO '${reqBody.titulo}' `, 'Book.log', 'ERROR');
        } else{

          await client.query(`DELETE FROM tb_books WHERE titulo = '${ reqBody.titulo}'`);
          writeToLog(`Livro '${reqBody.titulo}' REMOVIDO com sucesso`, 'Book.log', 'INFO');
          res.send('S');
        }
      } catch (error) {
          writeToLog(`ERRO AO REMOVERO O LIVRO '${reqBody.titulo}':${error} `, 'Book.log', 'ERROR');
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      } finally {
          client.release();
      }
    }),
    UpdateBook:route.post("/book/UpdateBook",async (req,res) => {
      const client = await con.connect();
<<<<<<< HEAD
=======
      let status = true
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      const reqBody = {
        oldTitle:req.body.oldTitle,
        titulo:req.body.titulo,
        autor:req.body.autor,
        editora:req.body.editora,
        genero:req.body.genero,
        estoque:req.body.estoque
      }
<<<<<<< HEAD
      console.log(req.body)
      try {
=======
      try {
        const result = await client.query(`select titulo from tb_books`)

        for(i = 0;i < result.rows.length;i++){
            if(reqBody.titulo === result.rows[i].titulo){
                status = false;
                break;
            }
        }
        let res1 = await client.query(`select livro from tb_emp where livro = '${reqBody.oldTitle}'` )
        if(res1.rows[0] || !status){
          writeToLog(`Erro ao Atualizar dados`, 'Book.log', 'ERROR');
          res.send('N');
        } else{
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
          await client.query(`UPDATE tb_books
                              SET titulo = '${req.body.titulo}',
                                  autor = '${req.body.autor}',
                                  editora = '${req.body.editora}',
                                  genero = '${req.body.genero}',
<<<<<<< HEAD
                                  estoque = '${req.body.estoque}'
                              WHERE titulo = '${req.body.oldTitle}'`);
          res.send("Dados alterados com sucesso");
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
=======
                                  estoque = ${req.body.estoque}
                              WHERE titulo = '${req.body.oldTitle}'`);
          writeToLog('Livro atualizado com sucesso', 'Book.log', 'INFO');
          res.send('S');

        }

      } catch (error) {
          writeToLog(`Erro ao Atualizar dados:${error}`, 'UpdateBook', 'ERROR');
>>>>>>> bf7733a416bbbbf921411be1d218bde765732c00
      } finally {
          client.release();
      }
    })
}

module.exports = BookRoutes;
