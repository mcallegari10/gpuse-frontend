<template lang="pug">
  #app
    .nav
      img.logo(src='./assets/logo.png')
      h4
        | GPUSE
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
@import "./scss/normalize";
@import "./scss/variables";

* {
  font-family: 'Roboto', sans-serif;
}

.nav {
  border-bottom: 1px solid $grey-4;
  width: 100%;
  display: flex;
  align-items: center;

  .logo {
    width: 40px;
    margin: 5px 25px;
  }
}
</style>
