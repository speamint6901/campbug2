<template>
<div>
  <div class="form_gr common_bottom">
    <p class="titleblock">ブランド</p>
    <div class="flex_container">
      <select name="brand_id" v-bind:class="{'disable-b' : isSelectDisable}" v-model="brandId" id="categoryselect" v-on:change="buttonToggle" class="selectform comon_layout">
        <option value="">-- 選択 --</option>
        <option v-for="brand in brands" v-bind:value="brand.id">{{ brand.name }}</option>
      </select><!--//CategorySelect-->
      <input type="hidden" name="brand_name" v-model:value="brandName" />
	  <div>{{ brandName }}</div>
    </div><!--//flex_container-->
    <button type="button" id="show-modal" v-bind:class="{'disable-b' : isDisable}" @click="showModal = true">ブランド新規登録</button>
    <!-- use the modal component, pass in the prop -->
    <modal-input-onece v-if="showModal" @close="showModal = false">
      <h3 slot="header">ブランド新規登録</h3>
	  <div slot="body">
    	<input type="text" name="modal_brand_name" v-on:change="changeBrandText" v-model="brandName" />
	  </div>
      <div slot="footer">
         <button type="button" class="modal-default-button" v-on:click="showModal = false">OK</button>
      </div>
    </modal-input-onece>
  </div>
</div>
</template>
<script>
    const store = require('../../store/').default;
	const ACTIONS = require('../../store/action-types');
    const MUTATIONS = require('../../store/mutation-types');
    const ModalInputOnece = require('./OneInput.vue').default;
	
    export default {
        store,
        data: function() {
            return {
                showModal : false,
				endpoint  : process.env.MIX_APP_URL + '/api/brands',
				isDisable : false,
                isSelectDisable : false,
            }
        },
        computed: {
            brands : () => store.getters.getAllBrand,
            brandId : {
                get() {
                   return store.getters.getBrandId
                },
                set(value) {
                   store.commit(MUTATIONS.SET_BRAND_ID, value)
                   store.commit(MUTATIONS.CHECK_FORM)
                }
            },
            brandName : {
                get() {
                   return store.getters.getBrandName
                },
                set(value) {
                   store.commit(MUTATIONS.SET_BRAND_NAME, value)
                   store.commit(MUTATIONS.CHECK_FORM)
                }
            }
        },
        components : {ModalInputOnece : ModalInputOnece},
        created() {
		    store.dispatch(ACTIONS.GET_BRAND_LIST);
        },
        methods: {
            setBrandName() {
                this.showModel = false;    
            },
			buttonToggle() {
				if (this.selectBrand) {
					this.isDisable = true;
				} else {
					this.isDisable = false;
				}
			},
            changeBrandText() {
                if (this.brandName) {
                    this.isSelectDisable = true;
                } else {
                    this.isSelectDisable = false;
                }
            }
        }
    };
</script>
