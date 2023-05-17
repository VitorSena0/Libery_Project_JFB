const express = require("express")
const route = express()
const AlunoRoutes = {
    main:route.get('/', (req,res) => {
        res.send("hello")
    }),
    Erro404:route.get("/404",(req,res) => {
      res.send("Erro 404")
    })
}
module.exports = AlunoRoutes;
