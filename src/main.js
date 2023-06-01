const express = require("express")
const app = express()
const path = require('path')
const Book = require('./routes/book')
const Main = require("./routes/main")
const Aluno = require("./routes/aluno")
const con = require("./dbconnection")
const Emp = require("./routes/emprestimo")
const port = 3000;

app.use(express.json());
app.use('/public',express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs');

app.use('/',Main.main);
app.use(Main.AlunoMain);
app.use(Main.BookMain);
app.use(Main.Erro404);
app.use(Book.ReadBook);
app.use(Aluno.AddAluno);
app.use(Aluno.ReadAluno);
app.use(Aluno.UpdateAluno);
app.use(Main.EmprestimoMain);
app.get('/emprestimo/ReadEmprestimo',async (req,res) => {
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
app.post("/emprestimo/SignEmprestimo", async (req,res) => {
  const client = await con.connect();
  const client2 = await con.connect();
  let status = true
  console.log(req.body)
  try {
      const result = await client2.query(`SELECT id FROM tb_emp `);
      const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${req.body.livro}'`);
      const result3 = await client2.query(`SELECT emprestimos from tb_alunos where nome = '${req.body.aluno}'`)
      const result4 = await client2.query(`SELECT livro from tb_emp where aluno = '${req.body.aluno}'`)
      for(i = 0;i < result4.rows.length;i++){
            if(req.body.livro === result4.rows[i].livro){
                status = false;
                break;
            }
      }
      if(result2.rows[0].estoque != 0 && result3.rows[0].emprestimos < 5 && status){
        await client2.query(`UPDATE tb_books Set estoque = ${result2.rows[0].estoque - 1} where titulo = '${req.body.livro}'`);
        await client2.query(`UPDATE tb_alunos Set emprestimos = ${result3.rows[0].emprestimos + 1} where nome = '${req.body.aluno}'`)
        await client.query(`INSERT INTO tb_emp (aluno,livro,data) Values ('${req.body.aluno}','${req.body.livro}','${req.body.data}')` );
        res.send(result.rows[result.rows.length - 1]);
      } else {
        if(result3.rows[0].emprestimos + 1 > 5){
          res.send({err:"O aluno Selecionado Ultrapassou o limite de emprestimos"})
        } else {
          if(!status){
              res.send({err:"O aluno Selecionado Já possui o livro selecionado"})
          } else {
              res.send({err:"Não foi possivel fazer o emprestimo"})
          }
        }
      }

  } catch (error) {
      console.error('Erro ao inserir dados', error);
      throw error;
  } finally {
      client.release();
      client2.release();
  }
}),
app.post("/emprestimo/DeleteEmprestimo",async (req,res) => {
  const client = await con.connect();
  const client2 = await con.connect();
  const reqBody = {
    id:req.body.id
  }
  console.log(req.body)
  try {

    const res2 = await client2.query(`SELECT livro FROM tb_emp where id = `+ reqBody.id)
    const res3 = await client2.query(`SELECT aluno FROM tb_emp where id = `+ reqBody.id)
    const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${res2.rows[0].livro}'`);
    const result3 = await client2.query(`SELECT emprestimos from tb_alunos where nome = '${res3.rows[0].aluno}'`)
    console.log(result3.rows)
    await client2.query(`update tb_books Set estoque = ${result2.rows[0].estoque + 1} where titulo = '${res2.rows[0].livro}'`);
    await client2.query(`UPDATE tb_alunos Set emprestimos = ${result3.rows[0].emprestimos - 1} where nome = '${res3.rows[0].aluno}'`)
    console.log(result3.rows[0].emprestimos - 1)
    await client.query(`DELETE FROM tb_emp WHERE id = ${reqBody.id}`);
      res.send("Dados Deletados com sucesso");
  } catch (error) {
      console.error('Erro ao inserir dados', error);
      throw error;
  } finally {
      client.release();
  }
}),

app.get('*',(req,res) => {
    res.redirect("/404");
})

app.listen(port, () => {
    console.log("app listen in http://localhost:3000")
})
