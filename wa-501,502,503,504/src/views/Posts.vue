<template>
    <div v-if="store.authenticated">
        <div style="border-bottom: black solid 3px; margin-bottom: 2%;">
            <strong>Post dana</strong>
            <div @click="gotoDetails(card)" :key="card.id" v-for="card in card1">
                <InstagramCard :info="card" />
            </div>
        </div>
        <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
            <InstagramCard :info="card" />
        </div>
       
    </div>
</template>

<script>
import _ from 'lodash';
import { Posts } from '@/services';
import InstagramCard from '@/components/InstagramCard.vue';
import store from '@/store.js';

export default {
    data() {
        return {
            store,
            cards: [],
            card1:[]
        };
    },
    watch: {
        'store.searchTerm': _.debounce(function(val) {
            this.fetchPosts(val);
        }, 500)
    },
    created() {
        this.fetchPosts();
        
    },
    name: 'posts',
    methods: {
        async fetchPosts(term) {
            term = term || store.searchTerm;

            this.cards = await Posts.getAll(term);

            //502
            this.card1 = await Posts.getOneRandom();
        },
        gotoDetails(card) {
            this.$router.push({ path: `post/${card.id}` });
        }
    },
    components: {
        InstagramCard
    }
};
</script>

<style scoped>
button {
    margin-bottom: 20px;
}
</style>
