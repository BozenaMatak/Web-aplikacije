<template>
    <div>
        <div :key="card.id" v-for="card in cards" style="width: 70%; margin-top: 2%;">
            <todocomponent :info="card" />
        </div>
       
    </div>
</template>

<script>
import _ from 'lodash';
import { Posts } from '@/services';
import store from '@/store.js';
import todocomponent from '@/components/todocomponent.vue';

export default {
    data() {
        return {
            store,
            cards: []
        };
    },
    watch: {
        'store.searchTerm': _.debounce(function(val) {
            this.fetchPosts(val);
        }, 500)
    },
    created() {
        this.fetchtodo();
        
    },
    name: 'todo',
    methods: {
        async fetchtodo() {
           

            this.cards = await Posts.todo();
            
        }
    },
    components: {
        todocomponent
    }
};
</script>

<style scoped>
button {
    margin-bottom: 20px;
}
</style>