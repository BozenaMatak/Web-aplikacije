import express from 'express'; 
import storage from './memory_storage.js'
import cors from 'cors'
const app = express()  // instanciranje aplikacije 
const port = 3000  // port na kojem će web server slušati
app.use(cors())  // omogući CORS na svim rutama
app.get('/posts', (req, res) => {   
    let title = req.query.title
    let createdBy = req.query.createdBy
    
    let postovi = storage.posts

    if(title){
        postovi = postovi.filter(e =>{
            return e.title.indexOf(title) >= 0
        })
    }
    if(createdBy){
        postovi = postovi.filter(e =>{
            return e.createdBy.indexOf(createdBy) >= 0
        })
    }
    res.json(postovi) // vraćamo postove direktno koristeći `json` metodu 
});
app.listen(port, () => console.log(`Slušam na portu ${port}!`))
