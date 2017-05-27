<template lang="pug">
  .login-container
    h2.title
      | Login
    form.login-data(@submit.prevent='login' novalidate)
      span.error(v-if='showError')
        | El usuario y/o contraseña son incorrectos
      label.data-label(for='email')
        | Email
      input.data-input(type='email' v-model='email' v-validate='"required|email"' name='email')
      .errors(v-if='errors.has("email")')
        span.error(v-if='errors.firstRule("email") === "required"')
          | El campo es requerido
      .errors(v-if='errors.has("email")')
        span.error(v-if='errors.firstRule("email") === "email"')
          | Debe ingresar un email valido
      label.data-label(for='password')
        | Contraseña
      input.data-input(type='password' v-model='password' v-validate='"required|min: 2"' maxlength='52' name='password')
      .errors(v-if='errors.has("password")')
        span.error(v-if='errors.firstRule("password") === "required"')
          | El campo es requerido
        span.error(v-if='errors.firstRule("password") === "min"')
          | El campo debe ser de una longitud minima de 2 caracteres
      .buttons-container
        button.login-button(type='submit')
          | Ingresar
        router-link.register(:to='{ name: "signUp" }')
          | Registrarse
</template>

<script>
import sessionService from '../services/sessionService'
import auth from '../auth'

const login = {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      showError: false
    }
  },
  methods: {
    login() {
      this.$validator.validateAll().then(() => {
        sessionService.login(this.email, this.password).then((response) => {
          this.showError = false
          auth.login(response)
          this.$router.push({ name: 'dashboard' })
        }).catch(() => {
          this.showError = true
        })
      })
    }
  }
}

export default login
</script>

<style lang="scss" scoped>
</style>
