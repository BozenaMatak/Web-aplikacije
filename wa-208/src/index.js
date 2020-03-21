import express from 'express';

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.get('/', (req, res) => res.send('Hello World'))

let lista = [  
    {    
      id: 10001,    
      createdBy: "nikola@tankovic.me"
    },  
    {    
      id: 10002,    
      createdBy: "marko@markovic.me"  
    },  
    {    
      id: 10003,    
      createdBy: "iva@ivkovic.me"  
    } 
  ]
  var max = lista[0].id;
  let vrijednost =() => {
    if(lista[0].id > lista[1].id){
      max = lista[0].id
    }
    else if (lista[2].id > lista[1].id){
      max = lista[2].id
    }
    else{
      max = lista[1].id
    }
    return max;
  }
  
  let inicijalna = 0
  let najveci = lista.reduce(vrijednost,inicijalna)
  console.log(najveci)

app.listen(port, () => console.log(`Slušam na portu ${port}!`))