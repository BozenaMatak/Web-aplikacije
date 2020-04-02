import axios from 'axios'

//service je vezan uz konkretni backend
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000 //1 sekunda
})

//vezan uz pojedine rute
let Posts = {  //sve metode koje su vezane za postove, smanjujemo si kod u postovima
    async getAll(searchterm) { 
        searchterm = searchterm.trim().split(' ');
        console.log(searchterm);

        let promises = searchterm.map(e => {
            return Service.get(`posts?title=${e}`);
        });

        let responses = await Promise.all(promises);
        let vrati = {}
        responses.forEach(e => {
            e.data.forEach(doc =>{
                let post = {
                    id: doc.id,
                    url: doc.source, 
                    email: doc.createdBy, 
                    title: doc.title, 
                    posted_at: Number(doc.postedAt)
                };
                vrati[doc.id] = post
            });
        });  
         return vrati;
    }
};

export { Service, Posts }