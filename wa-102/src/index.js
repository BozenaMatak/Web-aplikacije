import express from 'express';
import routes from './routes';
import moment from 'moment';
const app = express()
const port = 3000
const staticMiddleware = express.static('public') // direktorij sa statičkim datotekama
let p1=[];
let p2;
let i=0;
app.use('/', staticMiddleware)
app.get('/dodaj', (req, res) => {
    p1.push(Math.floor(Math.random()*101));
    res.json(p1)
    
})
app.get('/dohvati', (req, res) => {
    while(i<=p1.length){
        i=i+1;
        res.json(p1[i])
    }
    i=0;
})
app.get('/', (req, res) => res.send('Prikaz datuma, vremena i vremenske prognoze<br><a href="http://localhost:3000/datum">Datum i vrijeme</a> <br><a href="http://localhost:3000/prognoza">Prognoza</a>'))
app.listen(port, () => console.log(`Slušam na portu ${port}!`))