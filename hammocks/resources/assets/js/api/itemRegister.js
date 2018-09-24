
const axios = require('axios');
const API_URI = process.env.MIX_APP_URL;

export const ItemsRegisterAPI = {

   getAllBrands(callback) {
        axios.get(API_URI + '/api/brands').then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
   },
   itemRegister(data) {
        axios.post(API_URI + '/api/item/register/doRegister', data).then((response) => {
            document.location = API_URI + "/item/register/complete"
        })
        .catch((error) => {
            console.log(error);
        });
   }
};
