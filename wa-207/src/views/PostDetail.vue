<template>
  <div v-if="card">
    <InstagramCard :info="card" :showcomments="true"/>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
  props: ['id'],
  data() {
    return {
      card: null
    }
  },
  mounted() {
    console.log(this.id);
    db.collection("posts")
      .doc(this.id).get().then(doc => {
        this.card = doc.data();
        this.card.id = doc.id;
      })
  },
  name: "post-detail",
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