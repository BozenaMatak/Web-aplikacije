import express from 'express';
import routes from './routes';
import moment from 'moment';
const app = express()
const port = 3000

let polje=[
    ["ime:Marija", "prezime:Maric", "jmbag:49860598", "godina_studija:3"],
    ["ime:Josipa", "prezime:Josic", "jmbag:24235466", "godina_studija:1"],
    ["ime:Ana", "prezime:Anic", "jmbag:98745679", "godina_studija:4"],
    ["ime:Iva", "prezime:Ivic", "jmbag:12345799", "godina_studija:1"],
    ["ime:Marko", "prezime:Markic", "jmbag:12965233", "godina_studija:5"]
];


app.get('/studenti', (req, res) => {
  res.json(polje)
    
})
app.get('/studenti/first', (req, res) => {
    res.json(polje[0])
    
})

app.get('/studenti/last', (req, res) => {
    res.json(polje[4])
})


app.listen(port, () => console.log(`Slušam na portu ${port}!`))