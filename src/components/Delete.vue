<template>
  <v-container flat>
    <v-flex fluid xs6 offset-xs3>
      <v-form ref="form" @submit.prevent="submit">

        <v-snackbar
          v-model="snackbars.successful"
          absolute
          top
          color="success"
        >
          <span>Mensagem apagada!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>

        <v-snackbar
          v-model="snackbars.unsuccessful"
          absolute
          top
          color="error"
        >
          <span> Mensagem não apagada! </span>
          <v-icon dark>highlight_off</v-icon>
        </v-snackbar>

        <v-text-field
          v-model="msg_id"
          label="Id da mensagem"
          required
        ></v-text-field>

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
              type="submit"
            >Enviar</v-btn>
        </v-flex>
      </v-form>

    </v-flex>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
        user: {
            login: "",
            password: ""
        },
        snackbars: {
            successful: false,
            unsuccessful: false
        },
        msg_id: 0,
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
        ]
    }
  },
  methods: {
      resetForm: function () {
        this.user.login = '';
        this.user.password = '';
        this.$refs.form.reset();
      },
      submit: function () {
          console.log('http://150.165.85.16:9900/api/msgs/' + this.msg_id);
          console.log(this.sendMsg);
        this.$http.delete('http://150.165.85.16:9900/api/msgs/' + this.msg_id, {
            body: this.sendMsg
        })
        .then(function (response) {
          this.snackbars.successful = true;
        }).catch(function (response){
          this.snackbars.unsuccessful = false;
        });
        this.resetForm();
      }
  },
  computed: {
      sendMsg: function() {
        let snd = {
          "credentials": this.user.login + ":" + this.user.password
        };
        return JSON.stringify(snd);
      },
      formIsValid: function () {
        return !!(this.user.login) &&
               !!(this.user.password);
      }
  }
}

</script>

<style scoped>

</style>
