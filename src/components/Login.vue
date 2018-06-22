<template>
  <v-container>
    <v-snackbar
      v-model="showSucc"
      absolute
      top
      :timeout=2000
      color="success"
    >
      <span> Login realizado com sucesso. </span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>

    <v-snackbar
      v-model="showError"
      absolute
      top
      color="error"
      :timeout=2000
    >
      <span> Não foi possivel realizar o login. Verifique suas credenciais. </span>
      <v-icon dark>highlight_off</v-icon>
    </v-snackbar>

    <v-progress-linear
      v-if="isLogging"
      :indeterminate="true">
    </v-progress-linear>
    <v-container v-else>
      <h3>
        Para utilizar esta funcionalidade é necessário realizar o login.
      </h3>

      <v-form ref="form" @submit.prevent="login">
        <v-text-field
          v-model="user.login"
          :rules="loginRules"
          :counter="20"
          label="Login"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (passwordVisibility = !passwordVisibility)"
          :type="passwordVisibility ? 'password' : 'text'"
          label="Senha"
          required
        > </v-text-field>

        <v-flex>
          <v-btn
              :disabled="!formIsValid"
              center
              color="primary"
              type="login"
            >Login</v-btn>
        </v-flex>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      showSucc: false,
      showError: false,
      user: {
        login: '',
        password: ''
      },
      notEmptyRule: function (value, name="") {
        return !!value || (name + ' tem de ser preenchido');
      },
      loginRules: [
        x => this.notEmptyRule(x, "Login"),
        x => x.length <= 20 || 'Tamanho do login tem que ser menor ou igual a 20'
      ],
      passwordVisibility: true,
      passwordRules: [
        x => this.notEmptyRule(x, 'Senha')
      ],
      isLogging: false
    }
  },
  methods: {
    ...mapMutations([
      'setUserLogin',
      'setUserPassword',
      'setUserIsLogged'
    ]),
    resetForm: function() {
      this.user.login = '';
      this.user.password = '';
      this.showError = false;
      this.$refs.form.reset();
    },
    updateLoginData: function () {
      this.setUserIsLogged(true);
      this.setUserLogin(this.user.login);
      this.setUserPassword(this.user.password);
    },
    login: function () {
      console.log('Login requested');
      this.isLogging = true;

      setTimeout( () => {
        this.$http.post('http://150.165.85.16:9900/api/msgs',

          JSON.stringify({
            title: 'login message',
            msg: 'validating login',
            author: 'frontend',
            credentials: this.user.login + ':' + this.user.password
          }

        ))
        .then(r => r.json())
        .then(function(response){

          console.log('Logged');

          this.showSucc = true;

          this.$http.delete('http://150.165.85.16:9900/api/msgs/' + response.id, {
              body: JSON.stringify({
                credentials: this.user.login + ':' + this.user.password
              })
          });

          this.updateLoginData();

        })
        .catch(function(response){

          console.log('Login failed');
          this.showError = true;
          this.isLogging = false;

          setTimeout(function() {
            this.resetForm();
          }, 500);

        })
      }, 500);
    }
  },
  computed: {
    formIsValid: function () {
      return !!this.user.login &&
             !!this.user.password;
    }
  }
}
</script>

<style scoped>

</style>
