<template lang="pug">
  .dashboard
    button(type='button' @click='requestPublishId')
      | Pedit trabajo
    form.image-upload(@submit.prevent='uploadImage' enctype='multipart/form-data' novalidate)
      label
        | Imagen
      input#imageUpload(@change='onFileChange' type='file' name='image' accept='image/*')
      button(type='submit')
        | Subir trabajo
    .video-upload
      input#videoInput( @change='changeVideoPath' type='file' accept='video/*')
      .video(v-if='videoShow')
        video#videoToUpload(controls @loadeddata='advanceTime' @seeked='advanceTime')
          source(:src='videoSrc')
</template>

<script>
import fileUpload from '../services/fileUploadService.js'

const dashboard = {
  name: 'dashboard',
  data() {
    return {
      imageFile: new FormData(),
      codeFile: new FormData(),
      videoShow: true,
      videoSrc: '',
      image: '',
      code: '',
      frameIndex: 0,
      publishId: ''
    }
  },
  methods: {
    requestPublishId() {
      fileUpload.upload().then((response) => {
        console.log(response)
        this.publishId = response.data.published_code_id;
      })
    },
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
      fileUpload.uploadFrames(this.publishId, 0, this.image).then((response)=> {
        console.log(response)
      }).catch((error) => {
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
      // debugger;
      const frameSpan = 1/30;
      if (video.currentTime + frameSpan <= video.duration){
        video.currentTime = video.currentTime + frameSpan;
      } else {
        alert("done");
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
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
      //document.getElementById("app").appendChild(c);
    }
  }
}

export default dashboard
</script>

<style lang="scss" scoped>
  .video {
    display:none;
  }
</style>
