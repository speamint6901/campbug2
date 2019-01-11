<template>
<div>
<section class="card publicitemcard"  v-for="(item, key) in list">
    {{ item }}
    <a v-bind:href="'http://localhost/master/item/' + item.id">
        <div class="pic squarebox">
            <img id="item_pict_11" v-bind:src="item.public_img">
        </div><!--//pic-->
    </a><!-- /.pubitempic -->
    <div class="card_infomation">
        <p class="brand_name">{{ item.brand_name }}</p><!--//brand_name-->
        <h1 class="card_name">{{ item.name }}</h1><!--//card_name-->
        <div class="card_status">
            <div class="status_icon">
                <div v-bind:class="{active : item.have_want_status == 2, desable : item.have_want_status == 1}">
                    <img src="http://localhost/images/ico-have-on.svg" class="icon-button" id="have_1_11"><span class="count">1</span>
                </div>
                <div class="active">
                    <img src="http://localhost/images/ico-have-on.svg" class="icon-button" id="have_1_11"><span class="count">1</span>
                </div>
                <div class="disable">
                    <img src="http://localhost/images/ico-want-off.svg" class="icon-button" id="want_2_11"><span class="count">0</span>
                </div>
                <div>
                    <img src="http://localhost/images/ico-sale.svg" type="image/svg+xml"><span class="count">0</span>
                </div>
            </div><!--//status_icon-->
        </div><!--//card_status-->
    </div><!--//infomation-->
</section>
<infinite-loading @infinite="infiniteHandler">
    <span slot="no-more">
      There is no more Hacker News :(
    </span>
</infinite-loading>
</div>
</template>

<script>

import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

export default {
    data : function() {
        return {
            endpoint : process.env.MIX_APP_URL + '/api/public_item_list',
            list : [],
        }
    },
    methods: {
        infiniteHandler($state) {
            axios.get(this.endpoint, {
                 params: {
                     page: this.list.length / 20 + 1,
                 }
            }).then(({ data }) => {
                console.log(data.data);
                if (data.length) {
                    this.list = this.list.concat(data);
                    $state.loaded();
                    if (this.list.length / 20 == 10) {
                        $state.complete();
                    }
                } else {
                     $state.complete();
                }
            });
        }
    },
    components: {
        InfiniteLoading,        
    }
}
</script>
