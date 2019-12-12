<template>
  <v-dialog max-width="700px" v-model="dialog">
    <template v-slot:activator="r">
      <slot name="activator" v-bind="r"></slot>
    </template>

    <v-card>
      <v-card-title>Laisse moi choisir pour toi</v-card-title>
      <v-card-text>
        <v-form>
          <v-select placeholder="Choisisez le nombre de jours" :disabled="loading" v-model="numberOfPlayers" dense label="Nombre de joueurs" :items="numberOfPlayerItems"></v-select>
          <div class="d-inline-block">
            <v-tooltip bottom close-delay="500" :disabled="$vuetify.breakpoint.smAndDown || loading">
              <template v-slot:activator="{on}">
                <span v-on="on">
                <v-rating
                :readonly="loading"
                class="d-inline-block"
                size="35"
                dense
                v-model="difficulty"
                full-icon="mdi-fire"
                empty-icon="mdi-fire"
                color="orange"
                background-color="gray"
                length="4"></v-rating>
                </span>
              </template>
              <span>
                <span v-if="difficulty == 0">Choissez la difficultée</span>
                <span v-else>Difficultée</span>
                <v-icon color="blue lighten-4" v-if="difficulty==1">
                  mdi-emoticon-neutral-outline
                </v-icon>
                <v-icon color="orange darken-1" v-if="difficulty==2">
                  mdi-emoticon-outline
                </v-icon>
                <v-icon color="#CE93D8" v-if="difficulty==3">
                  mdi-emoticon-devil-outline
                </v-icon>
                <v-icon color="red darken-2" v-if="difficulty==4">
                  mdi-fire
                </v-icon>
              </span>
            </v-tooltip>
            <div v-if="$vuetify.breakpoint.smAndDown" class="text-center">
              <span v-if="difficulty == 0">Choissez la difficultée</span>
              <span v-else>Difficultée</span>
              <v-icon color="blue lighten-4" v-if="difficulty==1">
                mdi-emoticon-neutral-outline
              </v-icon>
              <v-icon color="orange darken-1" v-if="difficulty==2">
                mdi-emoticon-outline
              </v-icon>
              <v-icon color="#CE93D8" v-if="difficulty==3">
                mdi-emoticon-devil-outline
              </v-icon>
              <v-icon color="red darken-2" v-if="difficulty==4">
                mdi-fire
              </v-icon>
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#f2b3eb" :disabled="loading || !areInputsValid" @click="choose">Choisir <v-icon color="red">mdi-fire</v-icon></v-btn>
      </v-card-actions>
      <v-overlay v-if="loading" absolute>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "IdeaChooserDialog",
  mixins: [validationMixin],

  props: ["MaxPlayer"],

  data: () => ({
    difficulty: 0,
    numberOfPlayers: 0,

    loading: false,
    dialog: false,
  }),

  mounted() {
    console.log(this.$vuetify);
  },

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
    },
    areInputsValid() {
      return this.difficulty != 0 && this.numberOfPlayers != 0;
    }
  },

  methods: {
    choose() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dialog = false;
        let text = "";
        if (this.numberOfPlayers == 1)
          text = "$(1) fais 10 pompes";
        else if (this.numberOfPlayers == 2)
          text = "$(1) fais 10 pompes avec $(2) sur le dos"
        else
          text = "$(1) fais des pompes avec $(2) sur le dos pendant que $(3+) leurs crix dessus"
        this.$emit("choosed", this.numberOfPlayers, text);
      }, 2000);
    }
  }
});
</script>