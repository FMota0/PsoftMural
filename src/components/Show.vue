<template>
  <v-container>
    <v-text-field
      label="Pesquise a mensagem pelo titulo"
      color="black"
      v-model="patternToMatch"
    >
    </v-text-field>

    <p> {{this.$root.$data.getCounter }} </p>

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
export default {
  data () {
    return {
      patternToMatch: ''
    }
  },
  methods: {
    loadMessages: function(){
      this.$http.get('http://150.165.85.16:9900/api/msgs').then(r => r.json())
      .then(function (x) {
        this.$root.$data.messages = x;
        this.$root.$data.messages.sort((a, b) => moment(b.created_at) - moment(a.created_at))
      });
    },
    timeFromNow: function(message) {
      return moment(message.created_at).fromNow();
    },
    matchingMessages: function() {
      let regex = new RegExp("^" + this.patternToMatch, 'i');
      return this.$root.$data.messages.filter(function (message) {
        return regex.test(message.title);
      });
    }
  },
  created: function () {
    if(!this.$root.$data.firstLoad){
      this.loadMessages();
      this.$root.$data.firstLoad = true;
    }
  }
}
</script>
