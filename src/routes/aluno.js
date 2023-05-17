const express = require("express")
const route = express()

const AlunoRoutes = {
    AlunoMain:route.get('/aluno', (req,res) => {
        //ToDo
    }),
    ReadAluno:route.get('/aluno/ReadAluno', (req,res) => {
        //ToDo
    }),
    AddAluno:route.post("/aluno/SignAluno",(req,res) => {
        //ToDo
    }),
    RemoveAluno:route.post("/aluno/DeleteAluno",(req,res) => {
        //ToDo
    }),
    UpdateAluno:route.post("/aluno/UpdateAluno",(req,res) => {
        //ToDo
    })
}

module.exports = AlunoRoutes;
