<template lang="pug">
  .dashboard
    form.image-upload(@submit.prevent='uploadImage' enctype='multipart/form-data' novalidate)
      label
        | Imagen
      input#imageUpload(@change='onFileChange' type='file' name='image' accept='image/*')
      label
        | Codigo
      input#codeUpload(@change.prevent='codeFileChange($event.target.name, $event.target.files)' type='file' name='code' accept='image/*')
      button(type='submit')
        | Subir trabajo
    form.video-upload
      input#videoInput(@change.prevent='changeVideoPath' type='file' accept='video/*')
      .video(v-if='videoShow')
        video#videoToUpload(controls)
          source(:src='videoSrc')
    .thumbnails
</template>

<script>
import fileUpload from '../services/fileUploadService.js'

const dashboard = {
  name: 'dashboard',
  data() {
    return {
      imageFile: new FormData(),
      codeFile: new FormData(),
      videoShow: false,
      videoSrc: '',
      image: ''
    }
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
      const attr = [{
        index: 0,
        file: this.image
      }];
      fileUpload.upload(attr).then((response)=> {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })

    }
  }
}

export default dashboard
</script>

<style lang="scss">
</style>
