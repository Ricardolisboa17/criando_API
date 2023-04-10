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

    if(nome == null || nome == "" ||  sobrenome == null  ||  sobrenome == "" || idade == null || idade == "" || cpf == null || cpf == ""){
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

routes.delete('/delete/:cpf',(req,res) =>{
    const {cpf}  = req.params;
    let conteudo = fs.readFileSync('arquivo.txt', 'utf8')
    let array = []

    if(conteudo != ""){
        let splitConteudo = conteudo.split("\n")
         for(let i = 0; i < splitConteudo.length; i++){
             if(splitConteudo[i] != ""){    
                 let json = JSON.parse(splitConteudo[i])
                 array.push(json)
             }
         }  
    }

    let index; 

    for(let i = 0; i < array.length; i++){
        
        if(array[i].document == cpf){
            index = i
        }
    }

    array.splice(index,1);

    fs.unlinkSync('arquivo.txt');

    for(let i = 0; i < array.length; i++){

        let obj = {
            name: array[i].name,
            surname: array[i].surname,
            age: array[i].age, 
            document: array[i].document
        }

        fs.appendFile('arquivo.txt', JSON.stringify(obj) + "\n", function (err) {
            if (err) throw err;
        });
    
    }

    return res.status(200).json({Response: "Usuário deletado com sucesso"})

})

module.exports = routes