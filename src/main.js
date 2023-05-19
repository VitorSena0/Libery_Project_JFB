const express = require("express")
const app = express()
const path = require('path')
const Book = require('./routes/book')
const Main = require("./routes/main")
const port = 3000;

app.use(express.json());
app.use('/public',express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs');

app.use('/',Main.main);
app.use(Main.AlunoMain);
app.use(Main.BookMain);
app.use(Main.Erro404);
app.use(Book.ReadBook);
app.get('*',(req,res) => {
    res.redirect("/404");
})


app.listen(port, () => {
    console.log("app listen in http://localhost:3000")
})
