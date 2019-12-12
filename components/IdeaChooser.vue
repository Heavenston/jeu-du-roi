<template>
  <v-form>
    <v-select :disabled="loading" v-model="numberOfPlayers" dense label="Nombre de joueurs" :items="numberOfPlayerItems"></v-select>
    <v-rating :readonly="loading" v-model="difficulty" full-icon="mdi-fire" empty-icon="mdi-fire" color="orange" background-color="gray" length="4"></v-rating>
    <div class="text-center">Difficultée {{difficulty}}</div>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-col class="flex-grow-0">
          <v-btn small :loading="loading" @click="choose" :disabled="$v.$invalid">Choisir <v-icon color="orange">mdi-fire</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "IdeaChooser",
  mixins: [validationMixin],

  props: ["MaxPlayer"],

  data: () => ({
    difficulty: 0,
    numberOfPlayers: 0,

    loading: false,
  }),

  computed: {
    numberOfPlayerItems() {
      let items = [];
      for (let i = 1; i <= this.MaxPlayer; i++) {
        items.push({
          value: i,
          text: `${i} Joueur${i > 1 ? 's' : ''}`
        })
      }
      return items;
    }
  },

  methods: {
    choose() {
      this.loading = true;

    }
  },

  validations: {
    difficulty: { required }
  }
});
</script>