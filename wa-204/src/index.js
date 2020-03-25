import express from 'express';

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.get('/', (req, res) => res.send('Hello World'))

let studenti = [  
    {oib: "12312349172", ime: "Hrvoje", prezime: "Horvat"},  
    {oib: "82723412342", ime: "Ivana", prezime: "Ivić"},  
    {oib: "97283742342", ime: "Stjepan", prezime: "Stjepanović"}, 
]
let rezultat = studenti.reduce((s,e) => s + e.ime.length, 0)
console.log(rezultat)

app.listen(port, () => console.log(`Slušam na portu ${port}!`))