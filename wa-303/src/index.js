import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json()) //ovaj dio treba kako bi mogli koristiti app.post
                        //dekodira json poruku i spremi je u javascript objekt


app.get("/power", (req, res) =>{
    let a = req.query.a
    let b = req.query.b

    let odgovor = {
        rezultat: a*b  //zbog mnozenja gore a i b su odma pretvoreni u number dok kod zbrajanja nije vec je a i b u tom slucaju njemu string 
    }

    res.json(odgovor)
})

app.get("/add", (req, res) =>{
    let a = Number(req.query.a)
    let b = Number(req.query.b)

    let odgovor = {
        rezultat: a+b  //ovdje a i b se moraju definirati kao number da prepozna da je broj a ne string kod zbrajanja samo
    }                  //razlog zasto treba bit ovo number je taj sto kod stringa postoji operacija plus a to je da spoji ta dva stringa ako je a+b onda dobijs rezultat ab

    res.json(odgovor)
})

app.get('/posts', (req, res) => {
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

    res.json(posts)
})



app.get('/postovi', (req, res) => {
    let posts = storage.posts
    let query = req.query
    
    if (query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if (query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }
    
    res.json(posts)
})





app.post('/posts', (req, res) => {
    //logika koja ce taj zahtjev spremiti u nasu memoriju

    let poruka = req.body

    storage.posts.push(poruka)

    console.log(poruka)


    res.json("ok")
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))
