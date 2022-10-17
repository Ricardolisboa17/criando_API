const express = require('express')
const routes = express.Router()
const fs = require('fs');

const db = []
routes.get('/', (req,res) =>{
    return res.json(db)
    
})

routes.post('/add', (req,res) =>{
   const {nome, sobrenome, idade , cpf} = req.body

   const obj = {
        nome,
        sobrenome,
        idade, 
        cpf
    }

    if(nome == null || sobrenome == null  || idade == null || cpf == null){
        return res.status(400).json({Response: "insira todas as informaçoes"})
    }

    fs.appendFile('arquivo.txt', JSON.stringify(obj) + "\n", function (err) {
        if (err) throw err;
        console.log('Salvo com sucesso');
    });
    
    fs.readFile('arquivo.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
    });

    db.push(obj)
    return res.status(200).json(obj)
    
})

module.exports = routes