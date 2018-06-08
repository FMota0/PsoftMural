<template>
  <v-app>


    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="modePage = 'show'">
        <v-icon> fa-search </v-icon>
      </v-btn>
      <v-btn icon @click.stop="modePage = 'send'">
        <v-icon> fa-paper-plane </v-icon>
      </v-btn>
      <v-btn icon @click.stop="modePage = 'delete'">
        <v-icon> fa-trash-alt </v-icon>
      </v-btn>
    </v-toolbar>


    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <component v-bind:is="modePage"> </component>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>


    <v-footer :fixed="fixed" app>
      
    </v-footer>
  </v-app>
</template>

<script>

  import Show from './components/Show'
  import Send from './components/Send'
  import Delete from './components/Delete'

  export default {
    components: {
      Show,
      Send,
      Delete
    },
    data () {
      return {
        fixed: false,
        title: 'Mural',
        modePage: 'show'
      }
    }
  }
</script>
