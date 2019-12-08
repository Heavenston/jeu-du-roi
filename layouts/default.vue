<template>
  <v-app>
    <v-app-bar app>
      <nuxt-link tag="h1" class="headline font-weight-medium" style="cursor: pointer;" to="/">Le jeu du roi</nuxt-link>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      <span>Créer par <kbd>Malo</kbd> inspiré par <kbd>Ines</kbd> et <kbd>Alice</kbd></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
