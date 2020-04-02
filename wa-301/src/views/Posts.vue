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
    this.search(null,"marko") //tu sam pozvala onu search odozdo
  },
  name: "posts",
  methods: {
    fetchPosts(term, createdBy) {
      term = term || store.searchTerm
      fetch(`http://localhost:3000/posts?${createdBy}=${term}`) //iskreno nisam ovo ovako nikad pisala pa ne znam ni što točno znači
        .then(response => {
          return response.json()
        })
        .then(data => { //pokusavala sam i ovo stavit dolje u search, ali mislim da ne treba
          console.log("Podaci s backenda", data)
          this.cards = data.map(doc => {
            return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
          })
        })
    },

   search(title, createdBy){ //kad pokrenem program ispada kao da se search uopće ne pokreće
     console.log(createdBy); //mislim da mi ovdje ne prepoznaje što je uopće title jer kad u tražilicu napišem bilo što u konzoli mi se samo ispišu stva 3 posta
     if(!title){
       this.fetchPosts(createdBy,"createdBy")
     }
     else if(!createdBy){
       this.fetchPosts(title, "title") //pokusavala sam stavit i tipa (title, "pula"), al opet ništa
     }
      else{
        this.fetchPosts(_any, "_any")
      }
     },
      //ne kuzim stvarno kako treba ovaj zadatak funkcionirat, što treba radit pokusala sam vec nez sta sve ne


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