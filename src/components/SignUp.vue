<template lang="pug">
  .sign-up
    h2.title
      | Registrarse
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
      label.data-label(for='ethAddress')
        | Cuenta Etherium
      input.data-input(type='text' v-model='ethAddress' maxlength='52' name='ethAddress')
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
      ethAddress: ''
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
        this.$router.push({ name: 'dashboard' })
      })
    }
  }
}

export default signUp
</script>

<style lang="scss">
</style>
