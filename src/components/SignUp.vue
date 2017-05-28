<template lang="pug">
  .sign-up
    h1.title
      | Registrarse
    h2.error(v-if='showError')
      | Hubo un error!
    form.sign-form(@submit.prevent='signUp' novalidate)
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
import auth from '../auth'

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
        auth.login(response)
        this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        this.showError = true
      })
    }
  }
}

export default signUp
</script>

<style lang="scss">
@import "../scss/variables";

.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 140px auto;

  .title {
    font-weight: bold;
  }

  .sign-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 540px;

    .data-input {
      background-color: $grey-1;
      border: none;
      height: 40px;
      padding: 0 12px;
      margin: 10px 0 20px;
    }

    .data-label {
      color: $grey-4;
      line-height: 19px;
    }

    .error {
      color: $red;
      font-size: 14px;
      font-weight: 100;
      align-self: center;
    }

    .buttons-container {
        display: flex;
        align-items: center;

      .login-button {
        background-color: $green-1;
        border: none;
        border-radius: 20px;
        color: $white;
        display: flex;
        height: 40px;
        justify-content: center;
        margin-right: 20px;
        width: 175px;
      }

      .register {
        border: none;
        background-color: $white;
      }
    }
  }
}
</style>
