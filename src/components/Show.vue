<template>
  <v-container>
    <v-text-field
      label="Pesquise a mensagem pelo titulo"
      color="black"
    >

    </v-text-field>

    <v-layout collum>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="message in messages">
            <v-card>
              <v-card-title primary-title>
                <h2> {{message.title}} </h2>
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
      messages: []
    }
  },
  methods: {
    getMessages: function () {
      this.$http.get('http://150.165.85.16:9900/api/msgs').then(r => r.json())
      .then(function (x) {
        this.messages = x;
        this.messages.sort((a, b) => moment(b.created_at) - moment(a.created_at))
      })
    },
    timeFromNow: function(message) {
      return moment(message.created_at).fromNow();
    }
  },
  created: function () {
    this.getMessages();
  }
}
</script>
