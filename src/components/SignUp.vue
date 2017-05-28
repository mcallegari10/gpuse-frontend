<template lang="pug">
  .sign-up
    h2.title
      | Registrarse
    h2.error(v-if='showError')
      | Hubo un error!
    form(@submit.prevent='signUp' novalidate)
      label.data-label(for='email')
        | Email
      input.data-input(type='email' v-model='email' v-validate='"required|email"' name='email')
      label.data-label(for='password')
        | Contraseña
      input.data-input(type='password' v-model='password' v-validate='"required|min: 2"' maxlength='52' name='password')
      label.data-label(for='confirmPassword')
        | Confirmar contraseña
      input.data-input(type='password' v-model='confirmPassword' v-validate='"required|min: 2"' maxlength='52' name='confirmPassword')
      .buttons-container
        button.login-button(type='submit')
          | Registrarme
</template>

<script>
import sessionService from '../services/sessionService'

const signUp = {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showError: false
    }
  },
  computed: {
    confirmPasswordTruthy() {
      return this.password === this.confirmPassword
    }
  },
  methods: {
    signUp() {
      sessionService.signUp(this.email, this.password).then((response) => {
        debugger
        this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        debugger
        this.showError = true
      })
    }
  }
}

export default signUp
</script>

<style lang="scss">
</style>
