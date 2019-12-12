<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="ma-0">
      <v-col class=shrink>
        <v-btn x-large color="#f2b3eb" to="/game">Jouer <v-icon color="red">mdi-fire</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "index"
})
</script>