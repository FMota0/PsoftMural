<template>
  <v-container>
    <div>
      <v-spacer>
      </v-spacer>
      <v-btn @click.stop="loadMessages()">
        <v-icon>
          cached
        </v-icon>
      </v-btn>
    </div>
    <v-text-field
      label="Pesquise a mensagem pelo titulo"
      color="black"
      v-model="patternToMatch"
      md6
    >
    </v-text-field>

    <v-layout collum>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="message in matchingMessages()">
            <v-card>
              <v-card-title primary-title>
                <h2> {{message.title}} </h2>
                <v-spacer>
                </v-spacer>
                <h3> {{message.id}} </h3>
              </v-card-title>
              <v-card-title>
                <p> {{message.author + ' , ' + timeFromNow(message)}} </p>
              </v-card-title>
              <v-card-text>
                <p> {{message.msg}} </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data () {
    return {
      patternToMatch: ''
    }
  },
  methods: {
    ...mapGetters([
      'getMessages',
      'isFirstLoad']),
    ...mapMutations([
      'setUserLogin',
      'setUserPassword',
      'setUserIsLogged',
      'setMessages',
      'setFirstLoad']),
    ...mapActions([

    ]),
    loadMessages: function(){
      this.$http.get('http://150.165.85.16:9900/api/msgs').then(r => r.json())
      .then(function (messages) {
        console.log('messages arrived');
        messages.sort((a, b) => moment(b.created_at) - moment(a.created_at))
        this.setMessages(messages);
      });
    },
    timeFromNow: function(message) {
      return moment(message.created_at).fromNow();
    },
    matchingMessages: function() {
      let regex = new RegExp("^" + this.patternToMatch, 'i');
      return this.getMessages().filter(function (message) {
        return regex.test(message.title);
      });
    }
  },
  created: function () {
    if(!this.isFirstLoad()){
      this.loadMessages();
      this.setFirstLoad(true);
    }
  }
}
</script>
