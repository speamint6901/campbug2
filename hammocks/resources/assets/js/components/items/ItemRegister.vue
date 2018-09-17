<template>
<div>
   <modal-brand-setting></modal-brand-setting>
   <div class="form_gr common_bottom">
    <label for="itemname" class="titleblock required" style="margin-top: 25px;">ギア名</label>
    <input type="text" id="item_name" name="item_name" class="comon_layout form_size-L" v-model:value="itemName" autocomplete="off">
    <p class="error_message"></p>
   </div>
   <item-dropzone></item-dropzone>
   <categories></categories>

   <div class="form_gr common_bottom">
    <label class="titleblock">コメント入力</label>
    <textarea id="item-description" v-model="description" class="form_size-L comon_layout" name="item_description" cols=40 rows=16></textarea>
    <p class="error_message"></p>
   </div><!-- /.unit -->

   <div class="common_bottom statuscheck">
    <input type="radio" id="radio01" class="radiobtn" name="have_want" value="1" v-model="haveWant">
    <label for="radio01"><img :src="iconHaveOff" type="image/svg+xml"><br><span>have</span></label>

    <input type="radio" id="radio02" class="radiobtn" name="have_want" value="2" v-model="haveWant">
    <label for="radio02"><img :src="iconWantOff" type="image/svg+xml"><br><span>want</span></label>
   </div>
   <!-- /.unit -->
   <p v-bind:class="[isActive ? '' : 'disable-b', classBtn, classBtnSize]" v-on:click="sendItemData" id="regist-ok">ギアを登録する</p>
</div>
</template>
<script>
const ModalBrandSetting = require('../modal/BrandSetting.vue').default;
const ItemDropzone = require('../uploader/Item.vue').default;
const Categories = require('../pulldown/Categories.vue').default;
const MUTATIONS = require('../../store/mutation-types');
const ACTIONS = require('../../store/action-types');

export default {

    data: function() {
        return {
            iconHaveOff : process.env.MIX_APP_URL + '/images/ico-have-off.svg',
            iconWantOff : process.env.MIX_APP_URL + '/images/ico-want-off.svg',
            classBtn : 'button',
            classBtnSize : 'btn_size-S'
        }
    },
    computed: {
        isActive : {
            get() {
                return this.$store.getters.getIsActive
            }
        },
        itemName : {
            get() {
               return this.$store.getters.getItemName
            },
            set(value) {
               this.$store.commit(MUTATIONS.SET_ITEM_NAME, value)
               this.$store.commit(MUTATIONS.CHECK_FORM)
            }
        },
        description : {
            get() {
               return this.$store.getters.getDescription
            },
            set(value) {
               this.$store.commit(MUTATIONS.SET_DESCRIPTION, value)
               this.$store.commit(MUTATIONS.CHECK_FORM)
            }
        },
        haveWant : {
            get() {
               return this.$store.getters.getHaveWant
            },
            set(value) {
               this.$store.commit(MUTATIONS.SET_HAVE_WANT, value)
               this.$store.commit(MUTATIONS.CHECK_FORM)
            }
        }
    },
    components: {ModalBrandSetting, ItemDropzone, Categories},
    methods : {
        sendItemData() {
            console.log("click");
            if (this.$store.state.btnActive) {
                this.$store.dispatch(ACTIONS.ITEM_REGISTER);
            }
        }
    }
}
</script>
