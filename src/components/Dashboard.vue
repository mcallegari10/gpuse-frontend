<template lang="pug">
  .dashboard
    .image-upload
    .video-upload
      input#videoInput(@change='changeVideoPath' type='file' accept='video/*')
      .video(v-if='videoShow')
        video#videoToUpload(controls)
          source(:src='videoSrc')
    .thumbnails
</template>

<script>
const dashboard = {
  name: 'dashboard',
  data() {
    return {
      videoShow: true,
      videoSrc: ''
    }
  },
  methods: {
    changeVideoPath() {
      this.videoSrc = document.getElementById('videoInput').value
    }
  }
}

export default dashboard
</script>

<style lang="scss">
</style>
