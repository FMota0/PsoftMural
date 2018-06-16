<template>
  <v-container flat>
    <v-flex fluid xs6 offset-xs3>
      <v-container v-if="this.$root.$data.user.isLogged">
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
            <span> Não foi possivel apagar a mensagem! </span>
            <v-icon dark>highlight_off</v-icon>
          </v-snackbar>

          <v-text-field
            v-model="msg_id"
            label="Id da mensagem"
            required
          ></v-text-field>

          <v-flex>
            <v-btn
                :disabled="!formIsValid"
                center
                color="primary"
                type="submit"
              >Apagar</v-btn>
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
        msg_id: 0
    }
  },
  methods: {
      resetForm: function () {
        this.$refs.form.reset();
      },
      submit: function () {
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
          "credentials": this.$root.$data.user.login + ":" + this.$root.$data.user.password
        };
        return JSON.stringify(snd);
      },
      formIsValid: function () {
        return true;
      }
  }
}

</script>

<style scoped>

</style>
