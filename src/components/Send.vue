<template>
  <v-container flat>
    <v-flex fluid md6 offset-md3>
      <v-container v-if="this.$root.$data.user.isLogged">
        <v-form ref="form" @submit.prevent="submit">

          <v-snackbar
            v-model="snackbars.successful"
            absolute
            top
            :timeout=2000
            color="success"
          >
            <span> Mensagem enviada com sucesso. </span>
            <v-icon dark>check_circle</v-icon>
          </v-snackbar>

          <v-snackbar
            v-model="snackbars.unsuccessful"
            absolute
            top
            color="error"
            :timeout=2000
          >
            <span> Não foi possivel enviar a mensagem. </span>
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



          <v-flex>
            <v-btn
                :disabled="!formIsValid"
                center
                color="primary"
                type="submit"
              >Enviar</v-btn>
          </v-flex>
        </v-form>
      </v-container>
      <login v-else>

      </login>

    </v-flex>
  </v-container>
</template>

<script>

import Login from './Login'

export default {
  components: {
    Login
  },
  data () {
    return {
      snackbars: {
          successful: false,
          unsuccessful: false
      },
      title: '',
      author: '',
      msg: '',
      notEmptyRule: function (value, name="") {
        return !!value || (name + ' tem de ser preenchido');
      }
    }
  },
  methods: {
    resetForm: function () {
      this.msg = '';
      this.author = '';
      this.title = '';
      this.$refs.form.reset();
    },
    submit: function () {
      this.$http.post('http://150.165.85.16:9900/api/msgs', this.sendMsg)
      .then(function (response) {
        this.snackbars.successful = true;
      }).catch(function (response){
        this.snackbars.unsuccessful = true;
      });
      this.resetForm();
    }
  },
  computed: {
    sendMsg: function() {
      let snd = {
        title: this.title,
        msg: this.msg,
        author: this.author,
        credentials: this.$root.$data.user.login + ":" + this.$root.$data.user.password
      };
      return JSON.stringify(snd);
    },
    formIsValid: function () {
      return !!(this.title) &&
             !!(this.author) &&
             !!(this.msg);
    }
  }
}

</script>

<style scoped>

</style>
