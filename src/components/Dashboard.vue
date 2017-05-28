
<template lang="pug">
  .dashboard
    .page-title
      h3.title
        | Procesamiento de
      h3.title-2
        | Imágenes y videos
    .files-info( v-show='!loading')
      .files-inputs
        h5.step
          | Paso 1
        .file-uploads
          form.upload.margin-left-40(@submit.prevent='uploadImage' enctype='multipart/form-data' novalidate)
            label.label
              | Adjunta una imagen
            input#imageUpload(@change='onFileChange' type='file' name='image' accept='image/*')
            button.upload-button(type='submit')
              | Subir imagen
          form.upload(@submit.prevent='advanceTime')
            label.label
              | Adjunta un video
            input#videoInput(@change='changeVideoPath' type='file' accept='video/*')
            .video(v-if='videoShow')
              video#videoToUpload(@seeked='advanceTime')
                source(:src='videoSrc')
            button.upload-button(type='submit')
              | Subir video
      .bit-coin
        h5.step
          | Paso 2
        form.bitcoin-form(@submit='')
          .address
            label.label
              | Ingresa tu dirección de Bitcoin
            input.data-input(:value='bitcoinAddress' type='text')
          .key
            label.label
              | Ingresa tu private key de Bitcoin
            input.data-input(:value='bitcoinKey' type='text')
    .loader(v-show='loading')
      pulse-loader
      h1
        | %{{ loadingPercentage }}
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import fileUpload from '../services/fileUploadService.js'

const dashboard = {
  name: 'dashboard',
  data() {
    return {
      imageFile: new FormData(),
      videoShow: true,
      videoSrc: '',
      image: '',
      frameIndex: 0,
      publishId: '',
      bitcoinAddress: 'mm9vjEnJth96Zh9XNkmLizqyPAekCUWALt',
      bitcoinKey: 'cUMUbDWM59EdZYagTUSoWWDdr6CXLPPuyD8P1ryRdtxxCNBcBw7p',
      loading: false,
      loadingPercentage: 0,
      finished: false
    }
  },
  created() {
    fileUpload.upload().then((response) => {
      console.log(response)
      this.publishId = response.data.published_code_id;
    })
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      this.loading = true;
      fileUpload.uploadFrames(this.publishId, 0, this.image).then((response)=> {
        this.loading = false;
        console.log(response)
      }).catch((error) => {
        this.loading = false;
        console.log(error)
      })
    },
    changeVideoPath(event) {
      const URL = window.URL || window.webkitURL;
      const file = document.getElementById('videoInput').files[0]
      const type = file.type
      const videoNode = document.querySelector('video')
      let canPlay = videoNode.canPlayType(type)
      if (canPlay === '') canPlay = 'no'
      const message = 'Can play type "' + type + '": ' + canPlay
      const isError = canPlay === 'no'

      if (isError) {
        return
      }

      const fileURL = URL.createObjectURL(file)
      videoNode.src = fileURL
    },
    advanceTime() {
      const video = document.getElementById("videoToUpload");
      this.generateThumbnail(video);
      const frameSpan = 1/30;
      if (video.currentTime + frameSpan <= video.duration){
        this.loading = true;
        video.currentTime = video.currentTime + frameSpan;
      } else {
        this.loading = false;
        let interval = {};
        interval = setInterval(fileUpload.poll(this.publishId).then((response) => {
          if (response.data.status !== 204) {
            this.finished = true;
            clearInterval(interval);
            document.getElementById("videoToUpload").src = response.data.file
          }
        }), 1000)
        // alert("done");
      }
    },
    generateThumbnail(video) {
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");
      c.width = video.videoWidth;
      c.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const img = c.toDataURL('image/png', 1.0);
      this.frameIndex++;
      fileUpload.uploadFrames(this.publishId, this.frameIndex, img).then((response)=> {
        this.loadingPercentage = parseInt(video.currentTime * 100 / video.duration);
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: {
    PulseLoader
  }
}

export default dashboard
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.page-title {
  background-image: url('../assets/wireframes.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: $white;
  font-size: 32px;

  .title {
    margin: 0;
  }

  .title-2 {
    margin-top: 5px;
  }
}

.file-uploads {
  display: flex;

  .upload {
    display: flex;
    flex-direction: column;
  }
}

/*.video {
  display:none;
}*/

.files-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.step {
  text-align: center;
  color: $green-1;
  font-size: 18px;
}

.margin-left-40 {
  margin-right: 40px;
}

.label {
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  margin-right: 10px;
}

.upload-button {
  margin-top: 15px;
  background-color: $green-1;
  border: none;
  border-radius: 20px;
  color: $white;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 20px;
  width: 100%;
}

.bitcoin-form {
  display: flex;
  flex-direction: column;
}

.data-input {
  background-color: $grey-1;
  border: none;
  height: 40px;
  padding: 0 12px;
  margin: 10px 0 20px;
}
</style>
