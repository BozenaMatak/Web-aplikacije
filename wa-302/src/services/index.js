import axios from 'axios'

//service je vezan uz konkretni backend
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000 //1 sekunda
})

//vezan uz pojedine rute
let Posts = {  //sve metode koje su vezane za postove, smanjujemo si kod u postovima
    async getAll(searchterm) { 
        let response = await Service.get(`/posts?_any=${searchterm}`) //ovaj await kaze da se ceka dok se podaci svi ne popune, tj da ne ocitava novi url dok se ne ucitaju svi podaci
        let data=response.data
        data = data.map(doc => {
            return {
                id: doc.id, 
                url: doc.source, 
                email: doc.createdBy, 
                title: doc.title, 
                posted_at: Number(doc.postedAt)
            };
          });
          return data
    }
}

export { Service, Posts }