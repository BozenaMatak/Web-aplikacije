import express from 'express';
import storage from './memory_storage.js';
import cors from 'cors';
import connect from './db.js';
import mongo from 'mongodb';

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json()); // automatski dekodiraj JSON poruke

let checkAttributes = (data) =>{
    if(!data.title || !data.source){ 
        return false;
    }
    return true
}
app.patch('/posts/:id', async (req, res)=>{ 
    let id = req.params.id 
    let data = req.body;
    delete data._id;

    let db = await connect(); //nema smisla spajati se na bazu prije

    let result = await db.collection("posts").updateOne(
        {_id: mongo.ObjectId(id)}, 
        {
            $set:data
        });

   if(result && result.modifiedCount == 1){
    let doc = await db.collection("posts").findOne({_id: mongo.ObjectId(id)});
       res.json(doc);
    }
    else{
        res.json({
            status: 'fail',
        });
    }  
});
app.put('/posts/:id', async (req, res)=>{ 
    let id = req.params.id 
    let data = req.body;
    data.postedAt = new Date().getTime();

    delete data._id;

    let check = checkAttributes(data)

    if(!check){
        res.json({
            status: 'fail',
            reason: 'incomplete post',
        });
        return;
    }


    let db = await connect(); //nema smisla spajati se na bazu prije

    let result = await db.collection("posts").replaceOne(
        {_id: mongo.ObjectId(id)}, data);

   if(result && result.modifiedCount ==1){
       let returnData = result.ops[0]
       returnData._id = id
       res.json(returnData);
    }
    else{
        res.json({
            status: 'fail',
        });
    }  
});
app.post('/posts', async (req, res) => {
    let data = req.body;
    //postovi datum i vrijeme posta
    data.postedAt = new Date().getTime();


    delete data._id;
    let check = checkAttributes(data)
    if(!check){
            res.json({
            status: 'fail',
           reason: 'incomplete post',
        });
        return;
    }
    //503   
   function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    if(!validateEmail(data['createdBy'])){
        return res.json("Email not valid")
    }
    let db = await connect();

    let result = await db.collection("posts").insertOne(data);

    if(result && result.insertedCount ==1){
       res.json(result.ops[0]);
    }
    else{
        res.json({
            status: 'fail',
        });
    }
});
app.get('/posts/:id', async (req, res)=>{ //dinamicka ruta
    let id = req.params.id //dohvat jednog dokumenta sa tocnim id-em
    let db = await connect();

    let doc = await db.collection("posts").findOne({_id: mongo.ObjectId(id)});
    console.log(doc)
    res.json(doc)
});

app.get('/posts', async (req, res) => {
    let db = await connect();
    let query = req.query;

    let selekcija = {};

    if (query._any) {
        // za upit: /posts?_all=pojam1 pojam2
        let pretraga = query._any;
        let terms = pretraga.split(' ');

        let atributi = ['title', 'createdBy'];

        selekcija = {
            $and: [],
        };

        terms.forEach((term) => {
            let or = {
                $or: [],
            };

            atributi.forEach((atribut) => {
                or.$or.push({ [atribut]: new RegExp(term) });
            });

            selekcija.$and.push(or);
        });
    }

    console.log('Selekcija', selekcija);

    let cursor = await db.collection('posts').find(selekcija);
    let results = await cursor.toArray();

    res.json(results);
});



app.get('/posts_memory', (req, res) => {
    let posts = storage.posts;
    let query = req.query;

    if (query.title) {
        posts = posts.filter((e) => e.title.indexOf(query.title) >= 0);
    }

    if (query.createdBy) {
        posts = posts.filter((e) => e.createdBy.indexOf(query.createdBy) >= 0);
    }

    if (query._any) {
        let terms = query._any.split(' ');
        posts = posts.filter((doc) => {
            let info = doc.title + ' ' + doc.createdBy;
            return terms.every((term) => info.indexOf(term) >= 0);
        });
    }

    // sortiranje
    posts.sort((a, b) => b.postedAt - a.postedAt);

    res.json(posts);
});


//wa 501 pocetak

app.get('/random', async (req, res)=>{ 
    let query = req.query; 
    let db = await connect();

    let cursor = db.collection("posts").aggregate([{ $sample: { size: 1 } }])
    let result = await cursor.toArray()

    res.json(result)

    //s findOne
    //let db = await connect();
    //db.collection("posts").count(function(err, brojac){
      // db.collection("posts").distinct("_id", function(err, rezultat){
        //    if(err){
          //      res.send(err)
           // }
           // var randomId = rezultat [Math.floor(Math.random() * (brojac-1))]
            //db.collection("posts").findOne({_id: randomId}, function(err, rezultat){
              //  if(err){
                //   res.send(err)
               // }
              // console.log(rezultat)
               // res.json(rezultat)
            //})
        //})
   // })
});

//zavrsetak Wa 501

//504
app.post('/todo', async (req, res) => {
    let data = req.body;
 
    let db = await connect();

    let result = await db.collection("todo").insertOne(data);

    if(result && result.insertedCount ==1){
       res.json(result.ops[0]);
    }
    else{
        res.json({
            status: 'fail',
        });
    }
});
app.get('/todo', async (req, res) => {
    let db = await connect();
    


    let cursor = await db.collection('todo').find();
    let results = await cursor.toArray();

    res.json(results);
});

//504

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
