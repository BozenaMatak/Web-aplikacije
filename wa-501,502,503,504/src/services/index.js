import axios from 'axios';

// instanca axios-a za potrebe Fipugram backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
});

// naš objekt za sve pozive koji se dotiču `Post`ova
let Posts = {
    add(post) {
        return Service.post('/posts', post);
    },
    async getOne(id){
        let response = await Service.get(`/posts/${id}`);
        let doc = response.data;
        return {
            id: doc.id,
            url: doc.source,
            email: doc.createdBy,
            title: doc.title,
            posted_at: Number(doc.postedAt)
        };
    },

    async getAll(searchTerm) {
        let options = {};

        if (searchTerm) {
            options.params = {
                _any: searchTerm
            };
        }

        let response = await Service.get('/posts', options);
        return response.data.map(doc => {
            return {
                id: doc.id,
                url: doc.source,
                email: doc.createdBy,
                title: doc.title,
                posted_at: Number(doc.postedAt)
            };
        });
    },

    //502
    async getOneRandom() {
        
          let options = {};

        let response = await Service.get('/random', options);
        return response.data.map(doc => {
            return {
                id: doc.id,
                url: doc.source,
                email: doc.createdBy,
                title: doc.title,
                posted_at: Number(doc.postedAt)
            };
        });
    },

    //504
    async todo(){
        let options = {};

        

        let response = await Service.get('/todo', options);
        return response.data.map(doc => {
            return {
                task: doc.task
            };
        });
    }
};

export { Service, Posts }; // exportamo Service za ručne pozive ili Posts za metode.
