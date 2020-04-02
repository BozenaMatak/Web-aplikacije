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

      

    //sad kad smo dodali gore async kod mounteda to znaci da cemo moci unutar mounteda koristiti funkciju await, a to se radi sve kako bi se izbjeglo ono ugnjedjenje od then funkcija
    let r =await fetch("http://localhost:3000/power?a=4&b=5") //kad znam da imam ovako poziv nekog servera i znam da mi mora ici funkcija then sljedece ja mogu stavit onda await umjesto svega toga
                  //await stvarno ceka dok se uvijet ne ispuni neizvrsava nista dok se uvjet ne ispuni do kraja

    let odgovor = await r.json()
      
    let r2 = await fetch(`http://localhost:3000/add?a=${odgovor.rezultat}&b=10`) //prvo sam stavio bez ovog .rezultat i javilo mi je da je rijesenje nula jer je odgovor u backendu bio objekt a kako nama treba tocan rezultat tog mnozenja posto se u objektu nalazi varijabla rezultat koja kaze da je ona jednaka umnosku a i b potrebno je iz odgovora onoga koji je jednak tom objektu pozvati bas tu varijablu iz objekta na nacin da se nappise odgovor.rezultat jer je odgovor objekt a rezulat varijabla u objektu
    let finalni = await r2.json()

    //ovdje se pozivo 2 puta fetch jer smo prvo imali mnozenje i onda to mnozenje je jednako odgovoru a i drugom fetchu smo imali da se taj odgovor zboji s b koji je 10
    //da radimo sada kako smo gore radili morali bi imati 300 thenova ali s ovim await smo izbjegli brojne thenove i smao napisali na ovaj nacin skraceno jer then kaze kad se to vrati nesto nastavi dalje a await ceka dok se to sve vrati pa onda izracuna
    console.log("finalni rezultat je: ", finalni)

    //zakljucak await se uvijek koristi prije promis a onaj fetch je zapravo cijeli promis i prije njega se stavi await i to je to, najbolje staviti da je neka varijabla jednaka svemu tome tipa onaj r sto smo mi koristili no i dalje to nije rijesenje jer se mora taj r pozvati pomocu finkcije json pa se jos dodatno stavi neka varijabla npr kod prvog fetcha smo stavili odgovor da je jednako tom r.json da bi se dobio rezultat u obliku json i bitno prije tog r.json posto je sve potrebno cekati da se vrati neka vrijednost potrebno je staviti await pa ide await r.json i na taj nacin smo smanjili one thenove na kraci kod i uvijek ide na ovaj naci. unutra nemora biti console.log moze biti da se spremi u neku varijablu koja se moze kasnije pozivati gore u template

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


      async fetchPosts(term) { //ova funkcija mora bit async(asinkrona) jer je i u index.js funkcija getAll isto asinkrona pa posto se tmao vracaju podatci koji su asinkroni i ovdje mora bit asiknrono da bi funkcionirali
      term = term || store.searchTerm

      this.cards = await Posts.getAll(term) //drugi nacin da fetchPosts nebude asinkrona je taj da se ovdje doda .then i unutra sve potrebno pa da kad se vrate asinkroni podatci nebude problema oko toga, a ovaj await se dodo jer smo gore prozvali da je cijela funkcija sinkrona a i opet ona sluzi da nas ta funkcija priceka dok se svi podatci ne popune
      

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