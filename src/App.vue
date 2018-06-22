<template>
  <v-app>

    <v-toolbar fixed app tabs dark>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
      slot="extension"
      centered
      color="grey"
      v-model="model"
      >
        <v-tab v-for="icon in icons" :href="`#tab-${icons.indexOf(icon)}`">
          <v-icon> {{icon.name}} </v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content>
      <v-tabs-items v-model="model">
        <v-tab-item v-for="icon in icons" :id="`tab-${icons.indexOf(icon)}`">
          <component v-bind:is="icon.respectiveComponent"> </component>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

    <v-footer :fixed="fixed" app>

    </v-footer>
  </v-app>
</template>

<script>

  import Show from './components/Show'
  import Send from './components/Send'
  import Delete from './components/Delete'
  import Login from './components/Login'

  export default {
    components: {
      Show,
      Send,
      Delete,
      Login
    },
    data () {
      return {
        model: '',
        fixed: false,
        title: 'Mural',
        modePage: 'show',
        icons: [
            {
              name: 'fa-search',
              respectiveComponent: 'show'
            },
            {
              name: 'fa-paper-plane',
              respectiveComponent: 'send'
            },
            {
              name: 'fa-trash-alt',
              respectiveComponent: 'delete'
            }
        ]
      }
    },
    methods: {
      getIconName: function (index){
        return this.icons[index];
      }
    }
  }
</script>
