<template>
  <v-container flat>
    <v-flex fluid xs6 offset-xs3>
      <v-form ref="form" @submit.prevent="submit">

        <v-snackbar
          v-model="succSnackbar.active"
          absolute
          top
          color="success"
        >
          <span>Mensagem enviada!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>

        <v-snackbar
          v-model="errorSnackbar.active"
          absolute
          top
          color="error"
        >
          <span> Mensagem não enviada! </span>
          <v-icon dark>highlight_off</v-icon>
        </v-snackbar>

        <v-text-field
          v-model="author"
          :rules="[(x) => this.notEmptyRule(x, 'Autor')]"
          label="Autor"
          required
        ></v-text-field>

        <v-text-field
          v-model="title"
          :rules="[(x) => this.notEmptyRule(x, 'Titulo')]"
          label="Titulo"
          required
        ></v-text-field>

        <v-text-field
          v-model="msg"
          :rules="[(x) => this.notEmptyRule(x, 'Mensagem')]"
          label="Mensagem"
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
        login: '',
        password: ''
      },
      title: '',
      author: '',
      msg: '',
      notEmptyRule: function (value, name="") {
        return !!value || (name + ' tem de ser preenchido');
      },
      loginRules: [
        x => this.notEmptyRule(x, "Login"),
        x => x.length <= 20 || 'Tamanho do login tem que ser menor ou igual a 20'
      ],
      passwordVisibility: false,
      passwordRules: [
        x => this.notEmptyRule(x, 'Senha')
      ],
      succSnackbar: {
        active: false
      },
      errorSnackbar: {
        active: false
      }

    }
  },
  methods: {
    resetForm: function () {
      this.user.login = '';
      this.user.password = '';
      this.msg = '';
      this.author = '';
      this.title = '';
      this.$refs.form.reset();
    },
    submit: function () {
      this.$http.post('http://150.165.85.16:9900/api/msgs', this.sendMsg)
      .then(function (response) {
        this.activeBars(response.status);
      }).catch(function (response){
        this.activeBars(response.status);
      });
      this.resetForm();
    },
    activeBars: function (status) {
      console.log(status);
      if(status == 200){
        this.succSnackbar.active = true;
      } else {
        this.errorSnackbar.active = true;
      }
    }
  },
  computed: {
    sendMsg: function() {
      let snd = {
        title: this.title,
        msg: this.msg,
        author: this.author,
        credentials: this.user.login + ":" + this.user.password
      };
      return JSON.stringify(snd);
    },
    formIsValid: function () {
      return !!(this.user.login) &&
             !!(this.user.password) &&
             !!(this.title) &&
             !!(this.author) &&
             !!(this.msg);
    }
  }
}

</script>

<style scoped>

</style>
