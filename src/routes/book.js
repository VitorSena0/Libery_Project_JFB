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
    AddBook:route.post("/book/SignBook",async (req,res) => {
      const client = await con.connect();
      const client2 = await con.connect();
      let status = true
      const reqBody = {
        titulo:req.body.titulo,
        autor:req.body.autor,
        editora:req.body.editora,
        genero:req.body.genero,
        estoque:req.body.estoque
      }
      console.log(reqBody)
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
            res.send(result.rows[result.rows.length - 1]);
          } else {
              res.send({err:"Erro , O livro inserido já está registrado"})
          }
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
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
      console.log(req.body)
      try {
        let res1 = await client.query(`select livro from tb_emp where livro = '${reqBody.titulo}'` )
        console.log(reqBody.titulo)
        if(res1.rows[0]){
          res.send('N');
        } else{
          await client.query(`DELETE FROM tb_books WHERE titulo = '${ reqBody.titulo}'`);
          res.send('S');
        }
      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
      }
    }),
    UpdateBook:route.post("/book/UpdateBook",async (req,res) => {
      const client = await con.connect();
      let status = true
      const reqBody = {
        oldTitle:req.body.oldTitle,
        titulo:req.body.titulo,
        autor:req.body.autor,
        editora:req.body.editora,
        genero:req.body.genero,
        estoque:req.body.estoque
      }
      try {
        const result = await client.query(`select titulo from tb_books`)
        console.log(result.rows)
        for(i = 0;i < result.rows.length;i++){
            if(reqBody.titulo === result.rows[i].titulo){
                status = false;
                break;
            }
        }
        let res1 = await client.query(`select livro from tb_emp where livro = '${reqBody.oldTitle}'` )
        if(res1.rows[0] || !status){
          res.send('N');
        } else{
          await client.query(`UPDATE tb_books
                              SET titulo = '${req.body.titulo}',
                                  autor = '${req.body.autor}',
                                  editora = '${req.body.editora}',
                                  genero = '${req.body.genero}',
                                  estoque = ${req.body.estoque}
                              WHERE titulo = '${req.body.oldTitle}'`);
          res.send('S');
        }

      } catch (error) {
          console.error('Erro ao inserir dados', error);
          throw error;
      } finally {
          client.release();
      }
    })
}

module.exports = BookRoutes;
