import express from 'express';

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.get('/', (req, res) => res.send('Hello World'))

app.get('/add/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    var sum = (num1 + num2).toString()
    res.send(sum)
  })
  
  
  app.get('/subtract/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    var difference = (num1 - num2).toString()
    res.send(difference)
  })
  
  app.get('/multiply/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    var product = (num1 * num2).toString()
    res.send(product)
  })
  
  app.get('/divide/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1)
    var num2 = parseInt(req.params.num2)
    var quotient = (num1 / num2).toString()
    res.send(quotient)
  })
app.listen(port, () => console.log(`Slušam na portu ${port}!`))