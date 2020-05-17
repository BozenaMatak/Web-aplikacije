import axios from 'axios'


let Service = axios.create({     
    baseURL: 'http://localhost:3000/',  
    timeout: 1000 
})
 
let Posts = {    

    async getAllComment(jobId) {
        let response = await Service.get(`/jobs/${jobId}/comments`);
        return response.data.map(doc => {
            
                return {
                    id: doc._id,
                    jobId: doc.Idjoba,
                    posted_at: Number(doc.postedAt),
                    komentar: doc.komentar,
                };
            
        });
    },
    add(job) {
        return Service.post('/jobs', job);
    },


    async getAll() {        
        let response = await Service.get(`/jobs`)
        let data = response.data
        data = data.map(doc =>{
            return {
                id:doc._id,
                ime: doc.ime,
                prezime: doc.prezime,
                naziv_posla: doc.naziv_posla,
                kategorija_posla: doc.kategorija_posla,
                opis_posla: doc.opis_posla,
                potrebne_vjestine: doc.potrebne_vjestine,
                zarada: doc.zarada,
                posted_at: Number (doc.posted_at)
            
            };
        });
        return data
    },
    async getOne(id){
        let response = await Service.get(`/jobs/${id}`);
        let doc = response.data;
        return {
            id:doc._id,
            ime: doc.ime,
            prezime: doc.prezime,
            naziv_posla: doc.naziv_posla,
            kategorija_posla: doc.kategorija_posla,
            opis_posla: doc.opis_posla,
            potrebne_vjestine: doc.potrebne_vjestine,
            zarada: doc.zarada,
            posted_at: Number(doc.posted_at),
            comments: (doc.comments || []).map((c) => {                
                c.id = c._id;                
                delete c._id;                
                return c;            
            }),
        };
    }, 
}


export { Service, Posts } // exportamo Service za ručne pozive ili Posts za metode.
