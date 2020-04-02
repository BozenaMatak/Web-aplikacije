<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import { Posts } from "@/services";



export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  created() {
    this.fetchPosts()
  },
  name: "posts",

  async mounted(){//svaki then block vraca novo obecanje
      //fetch("http://localhost:3000/power?a=4&b=5") 
      //  .then((response) => {
      //  return response.json()
      //})
      //.then((json) => {
      //  let rezultat_mnozenja = json.rezultat
      //  return fetch(http://localhost:3000/add?a=${rezultat_mnozenja}&b=10)
      //})
      //  .then(response => {
      //  return response.json()
      //})
      // .then((krajnji) => {
      //  console.log("krajni rezultat je: ", krajnji.rezultat)
      //})


      //Promise.all([  //ovo se radi kada je potrebno vrsiti pozive prema vise servisa
      //  fetch("http://localhost:3000/power?a=4&b=5"),
      //  fetch("http://localhost:3000/add?a=4&b=5")
      //])
      //.then(rezultati => {
      //  console.log("Paralelni pozivi", rezultati)
      //  Promise.all([rezultati[0].json(), rezultati[1].json()])
      //    .then(json_rezultati => {
      //      console.log(json_rezultati)
      //    })
      //})

      

    
    let r =await fetch("http://localhost:3000/power?a=4&b=5") 
                  

    let odgovor = await r.json()
      
    let r2 = await fetch(`http://localhost:3000/add?a=${odgovor.rezultat}&b=10`) 
    let finalni = await r2.json()

    
    
    console.log("finalni rezultat je: ", finalni)
  },

  methods: {

   // search(title, createdBy){
    //    fetch(http://localhost:3000/postovi?title=pula)
    //    .then(response =>{
    //      return response.json()
    //    })
    //    .then(data => {
    //      console.log("title s backenda: ", data.title)
    //    }) 
    //},


      async fetchPosts(term) { 
      term = term || store.searchTerm

      this.cards = await Posts.getAll(term)
      

      },



    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>
