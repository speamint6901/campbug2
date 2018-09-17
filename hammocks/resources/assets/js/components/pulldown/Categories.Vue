<template>   
<div>
   <div class="form_gr common_bottom">
    <p class="titleblock">カテゴリを選択</p>

    <div class="flex_container">
    <select name="CategorySelect" v-model="selectBigCategory" v-on:change="ChangeCategory" id="categoryselect" class="selectform comon_layout">
     <option value="">-- 選択 --</option>
     <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
    </select><!--//CategorySelect-->
    <select v-if="selectBigCategory" v-model="selectCategory" v-on:change="ChangeMiddleCategory" name="GenreSelect" class="selectform">
     <option value="">-- 選択 --</option>
     <option v-for="middleCategory in middleCategories" :value="middleCategory.id">{{ middleCategory.name }}</option>
    </select>
    <select v-if="selectCategory" v-model="selectGenre" v-on:change="ChangeGenre" name="GenreSelect" class="selectform">
     <option value="">-- 選択 --</option>
     <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
    </select>
    <select v-if="selectGenre" v-model="selectSecondGenre" name="GenreSelect" class="selectform">
     <option value="">-- 選択 --</option>
     <option v-for="secondGenre in secondGenres" :value="secondGenre.id">{{ secondGenre.name }}</option>
    </select>
    </div><!--//flex_container-->
   </div><!-- /.unit -->
</div>
</template>
<script>
    const store = require('../../store/').default;
    const MUTATIONS = require('../../store/mutation-types');

    export default {
        data: function() {
            return {
				endpoint  : process.env.MIX_APP_URL + '/api/categories',
                endpointCategory : process.env.MIX_APP_URL + '/api/middle-categories/',
                endpointGenre : process.env.MIX_APP_URL + '/api/genres/',
                endpointSecondGenre : process.env.MIX_APP_URL + '/api/second-genres/',
				categories    : [],
                middleCategories : [],
                genres : [],
                secondGenres : [],
            }
        },
        computed: {
            selectBigCategory : {
                get() {
                   return store.getters.getBigCategory
                },
                set(value) {
                   store.commit(MUTATIONS.SET_BIG_CATEGORY, value)
                   store.commit(MUTATIONS.CHECK_FORM)
                }
            },
            selectCategory : {
                get() {
                   return store.getters.getCategory
                },
                set(value) {
                   store.commit(MUTATIONS.SET_CATEGORY, value)
                   store.commit(MUTATIONS.CHECK_FORM)
                }
            },
            selectGenre : {
                get() {
                   return store.getters.getGenre
                },
                set(value) {
                   store.commit(MUTATIONS.SET_GENRE, value)
                }
            },
            selectSecondGenre : {
                get() {
                   return store.getters.getSecondGenre
                },
                set(value) {
                   store.commit(MUTATIONS.SET_SECOND_GENRE, value)
                }
            },
        },
        created() {
            this.fetch();
        },
        methods: {
            fetch() {
                axios.get(this.endpoint)
                    .then(({data}) => {
                        this.categories = data.data;
                    });
            },
            ChangeCategory() {
                this.selectCategory = "";
                this.selectGenre = "";
                axios.get(this.endpointCategory + this.selectBigCategory)    
                    .then(({data}) => {
                        this.middleCategories = data.data;
                    });
            },
            ChangeMiddleCategory() {
                this.selectGenre = "";
                axios.get(this.endpointGenre + this.selectCategory)    
                    .then(({data}) => {
                        this.genres = data.data;
                    });
            },
            ChangeGenre() {
                axios.get(this.endpointSecondGenre + this.selectGenre)    
                    .then(({data}) => {
                        if (data.data.length) {
                            this.secondGenres = data.data;
                        }
                    });
            }
        }
    }
</script>
