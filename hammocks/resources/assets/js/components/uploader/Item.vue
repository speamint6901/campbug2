<template>
<div>
   <div class="form_gr common_bottom">
    <div class="pictup_way comon_layout">
     <p class="titleblock required">画像を登録</p>

     <input type="radio" id="pictselect02" class="radiobtn" name="pictup" value="img">
     <label for="pictselect02"><img :src="pictSelectImg" type="image/svg+xml"></label>

     <div id="pictselect02_check" class="pictup comon_layout">
    <div class="pictselect">
     <p class="titleblock">画像を選択</p>
     <div @dragleave.prevent @dragover.prevent @drop.prevent="onDrop" class="dropzone">
      <span>
       <i class="fa fa-image"></i>
      </span>
     </div><!--//my-awesome-dropzone-->

     <div id="my-preview-dropzone" class="dropzone previewzone"></div>

     <input type="hidden" value="" name="pict-ok" id="pict-ok">
    </div><!--//pictselect-->
     </div>
    </div><!--//pictup_way-->
   </div><!-- /.form_gr -->
</div>
</template>
<script>
const MUTATIONS = require('../../store/mutation-types');
const store = require('../../store/').default;
export default {
    data: function() {
        return {
            pictSelectImg : process.env.MIX_APP_URL + '/images/ico-img-white.svg',
			dataUrl : "",
            endpoint : process.env.MIX_APP_URL + '/api/uploader',
        }
    },
    computed: {
        imageUrl : {
            get() {
               return this.$store.getters.getImageUrl
            }
            /*
            set(value) {
               this.$store.commit(MUTATIONS.SET_IMAGE_URL, value)
               this.$store.commit(MUTATIONS.CHECK_FORM)
            }
            */
        },
    },
    methods: {
        onDrop: function(e) {
            let fileList = e.target.files ? 
                           e.target.files:
                           e.dataTransfer.files;

            if (fileList[0].size > 2097152) {
                alert("2MB以上のファイルはアップロード出来ません");
            }

            if (fileList[0].type != "image/jpeg" && fileList[0].type != "image/png" && fileList[0].type != "image/gif") {
                alert("画像以外アップロード出来ません");
            }
			
            var dataUrl = "";
            var endpoint = this.endpoint;
            var mime_type = fileList[0].type;
       		let fr = new FileReader();
            fr.onload  = function(file) {
                console.log(mime_type);
                dataUrl = file.target.result;
                store.commit(MUTATIONS.SET_IMAGE_URL, dataUrl)
                store.commit(MUTATIONS.SET_MIME_TYPE, file.type)
                store.commit(MUTATIONS.CHECK_FORM)
                const data = { "file_name" : file.name, "data_url" : dataUrl, "mime_type" : mime_type, "cache_key" : "item"};
                axios.post(endpoint, data)
                    .then(({data}) => {
                        console.log(data);
                    });
            }
        	fr.readAsDataURL(fileList[0]);
        }
    }
}
</script>
