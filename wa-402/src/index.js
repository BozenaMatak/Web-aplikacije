import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'
import connect from './db.js'

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json()) // automatski dekodiraj JSON poruke

app.post('/posts', (req, res) => {
    let data = req.body

    // ovo inače radi baza (autoincrement ili sl.), ali čisto za primjer
    data.id = 1 + storage.posts.reduce((max, el) => Math.max(el.id, max), 0)

    // dodaj u našu bazu (lista u memoriji)
    storage.posts.push(data)

    // vrati ono što je spremljeno
    res.json(data) // vrati podatke za referencu
})

app.get('/posts', async (req, res) => {
    let db = await connect()
    //let query = req.query
    

    //let selekcija = {}

    //if(query.createdBy){
      //  selekcija.createdBy = new RegExp(query.createdBy)
    //}
    //console.log("Selekcija", selekcija)


    
    //let selekcija =  {}

    //if(query.title){
      //  selekcija.title = new RegExp(query.title)
    //}

    
    var d = new Date();
    var six=6*30*24*60*60*1000;
    var n = d.getTime() - six;
    console.log("vrijeme sest mjeseci u milisekundama: ", six)
    console.log("vrijeme sada oduzeto za 6 mjeseci u milisekundama: ", n)
    console.log("vrijeme sada u milisekundama: ", d.getTime())

    let cursor = await db.collection("posts").find({ postedAt: { $gte: n }})
    let results = await cursor.toArray()
    res.json(results)


    //if(query._any){
        //let pretraga = query._any
        //let terms = pretraga.split(" ")

        //let atributi = ["title", "createdBy", "source"]
     

        //selekcija = {
          //  $and: [],
        //};
        //terms.forEach(term => {
          //  console.log("Unutar petlje: ", term);
        //let or = {
        //$or: [] //, {createdBy: new RegExp(term)}],
        //};

        //atributi.forEach(atribut =>{
          //console.log("Unutar druge petlje", atribut)
          // or.$or.push({[atribut]: new RegExp(term)});
        //})

        //selekcija.$and.push(or);
      //  });
    //}

    //console.log("Selekcija", selekcija)

    //let cursor = await db.collection("posts").find(selekcija)
    //let results = await cursor.toArray()

    //console.log(results)

    //res.json(results)
})

app.get('/posts_memory', (req, res) => {
    let posts = storage.posts
    let query = req.query
    
    if (query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if (query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }
    
    if (query._any) {
        let terms = query._any.split(" ")
        posts = posts.filter(doc => {
            let info = doc.title + " " + doc.createdBy
            return terms.every(term => info.indexOf(term) >= 0)
        })
    }

    // sortiranje
    posts.sort((a, b) => (b.postedAt - a.postedAt))

    res.json(posts)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))