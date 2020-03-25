import express from 'express';

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.get('/', (req, res) => res.send('Hello World'))

var a1 = ["aa", "b1", "b1", "ce", "aa", "ce", "b1", "z"]
let brojac = a1.reduce((s,e) => {
    if(e in s){
        s[e]++
    }
    else{
        s[e]=1
    }
    return s
}, {})


console.log(brojac)  // { aa: 2, b1: 3, ce: 2, z: 1}  

app.listen(port, () => console.log(`Slušam na portu ${port}!`))