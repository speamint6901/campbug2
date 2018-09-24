
const Vuex = require('vuex');
import * as MUTATION from './mutation-types';
import * as ACTION from './action-types';
const ItemsAPI = require('../api/itemRegister');

const state = {
    brands: [],
    btnActive : false,
    form : {
        brandId : "",
        brandName : "",
        itemName : "",
        imageUrl : "",
        mimeType : "",
        selectBigCategory : "",
        selectCategory : "",
        selectGenre : "",
        selectSecondGenre : "",
        description : "",
        haveWant : "",
    }
};

const getters = {
    getAllBrand : (state) => state.brands,
    getBrandId : (state) => state.form.brandId,
    getBrandName : (state) => state.form.brandName,
    getItemName : (state) => state.form.itemName,
    getImageUrl : (state) => state.form.imageUrl,
    getBigCategory : (state) => state.form.selectBigCategory,
    getCategory : (state) => state.form.selectCategory,
    getGenre : (state) => state.form.selectGenre,
    getSecondGenre : (state) => state.form.selectSecondGenre,
    getDescription : (state) => state.form.description,
    getHaveWant : (state) => state.form.haveWant,
    getIsActive : (state) => state.btnActive,
};

const actions = {
    [ACTION.GET_BRAND_LIST] ({commit}) {
        ItemsAPI.ItemsRegisterAPI.getAllBrands(brandList => {
            commit(MUTATION.SET_BRAND_LIST, brandList.data);
        });
    },
    [ACTION.ITEM_REGISTER] ({commit}, data) {
        ItemsAPI.ItemsRegisterAPI.itemRegister(state.form)
    }

};

const mutations = {
    [MUTATION.SET_BRAND_LIST] (state, items) {
        state.brands = items;
    },
    [MUTATION.SET_BRAND_NAME] (state, text) {
        state.form.brandName = text;
    },
    [MUTATION.SET_BRAND_ID] (state, id) {
        state.form.brandId = id;
    },
    [MUTATION.SET_ITEM_NAME] (state, text) {
        state.form.itemName = text;
    },
    [MUTATION.SET_BIG_CATEGORY] (state, num) {
        state.form.selectBigCategory = num;
    },
    [MUTATION.SET_CATEGORY] (state, num) {
        state.form.selectCategory = num;
    },
    [MUTATION.SET_GENRE] (state, num) {
        state.form.selectGenre = num;
    },
    [MUTATION.SET_SECOND_GENRE] (state, num) {
        state.form.selectSecondGenre = num;
    },
    [MUTATION.SET_DESCRIPTION] (state, text) {
        state.form.description = text;
    },
    [MUTATION.SET_IMAGE_URL] (state, text) {
        state.form.imageUrl = text;
    },
    [MUTATION.SET_MIME_TYPE] (state, text) {
        state.form.mimeType = text;
    },
    [MUTATION.SET_HAVE_WANT] (state, num) {
        state.form.haveWant = num;
    },
    [MUTATION.CHECK_FORM] (state, num) {
        if ((state.form.brandId || state.form.brandName) && state.form.itemName &&
            state.form.imageUrl && state.form.selectBigCategory &&
            state.form.selectCategory && state.form.description &&
            state.form.haveWant) {
                console.log("active!!")
                state.btnActive = true
            } else {
                state.btnActive = false;
            }
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
