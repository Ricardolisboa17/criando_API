const express = require('express')
const routes = express.Router()
const fs = require('fs');

routes.get('/', (req,res) =>{
    fs.readFile('arquivo.txt', 'utf8', (err, conteudo) => {
        if (err) {
          console.error(err);
          return;
        }

        let array = []

        if(conteudo != ""){
           let splitConteudo = conteudo.split("\n")
            for(let i = 0; i < splitConteudo.length; i++){
                if(splitConteudo[i] != ""){    
                    let json = JSON.parse(splitConteudo[i])
                    array.push(json)
                }
            }
            return res.send(array)
        }else{
            return res.json(array)
        }
    });
})

routes.post('/add',(req,res) =>{
   const {nome, sobrenome, idade , cpf} = req.body

    if(nome == null || sobrenome == null  || idade == null || cpf == null){
        return res.status(400).json({Response: "insira todas as informaçoes"})
    }

   const obj = {
        name: nome,
        surname: sobrenome,
        age: idade, 
        document: cpf
    }

    var conteudo = fs.readFileSync('arquivo.txt', 'utf8')

    const splitConteudo = conteudo.split("\n")
  
    for(let i = 0; i < splitConteudo.length; i++){
        if(splitConteudo[i] != ""){
            let json = JSON.parse(splitConteudo[i])
        
            if(json.document == cpf){
                return res.status(400).json({Response: "CPF já cadastrado"})
            }
        }
    }

    fs.appendFile('arquivo.txt', JSON.stringify(obj) + "\n", function (err) {
        if (err) throw err;
    });

    return res.status(200).json({Response: "Usuario cadastrado com sucesso"})
})

module.exports = routes