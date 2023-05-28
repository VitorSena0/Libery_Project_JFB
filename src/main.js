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

  console.log(req.body)
  try {
      const result = await client2.query(`SELECT id FROM tb_emp `);
      const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${req.body.livro}'`);
      if(result2.rows[0].estoque != 0){
        await client2.query(`UPDATE tb_books Set estoque = ${result2.rows[0].estoque - 1} where titulo = '${req.body.livro}'`);
        await client.query(`INSERT INTO tb_emp (aluno,livro,data) Values ('${req.body.aluno}','${req.body.livro}','${req.body.data}')` );
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
app.post("/emprestimo/DeleteEmprestimo",async (req,res) => {
  const client = await con.connect();
  const client2 = await con.connect();
  const reqBody = {
    id:req.body.id
  }
  console.log(req.body)
  try {
    const res2 = await client2.query(`SELECT livro FROM tb_emp where id = `+ reqBody.id)
    const result2 = await client2.query(`SELECT estoque FROM tb_books where titulo = '${res2.rows[0].livro}'`);
    await client2.query(`update tb_books Set estoque = ${result2.rows[0].estoque + 1} where titulo = '${res2.rows[0].livro}'`);
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
