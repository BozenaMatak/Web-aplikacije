import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'

import connect from './db.js'

const app = express() 
const port = 3000 

app.use(cors())
app.use(express.json()) 

app.post('/posts', (req, res) => {
    //let data = req.body
    //data.id = 1 + storage.posts.reduce((max, el) => Math.max(el.id, max), 0)

    //storage.posts.push(data)
    //res.json(data) 
})

//404.zadatak

    app.get('/posts', async (req, res) => {

        let db = await connect()
        let rezultat = await dohvati(db, 1, 3)
        
        res.json(rezultat)
    })

    async function dohvati(db, stranica, velicina){
        let paginacija = velicina * (stranica)
        let cursor = await db.collection('posts').find().skip(paginacija).limit(velicina)
        let results = await cursor.toArray()
        console.log(results)
        return results;
    }

app.listen(port, () => console.log(`Slušam na portu ${port}!`))