<template>
  <Players v-if="state == 'choosingPlayers'" @validated="state = 'play'"></Players>
  <v-container v-else-if="state == 'play'" fill-height fluid>
    <v-row no-gutters justify="center">
      <v-col style="max-width: 700px;">
        <v-card>
          <v-card-title class="text-capitalize">
            Jeu du roi
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row justify="center">
                <v-col class="flex-grow-0">
                  <v-btn
                  color="success"
                  @click="chooseKing"
                  :loading="isKingLoading"
                  v-if="king == null">
                    Choisir le roi
                  </v-btn>
                  <h1 v-else class="subtitle font-weight-medium text-no-wrap">
                    Le roi est : <span>{{players[king]}}</span>
                  </h1>
                </v-col>
              </v-row>
              <v-row justify="center" class="mb-3 mt-2" dense>
                <v-col class="flex-grow-0">
                  <IdeaChooserDialog>
                    <template v-slot:activator="{on}">
                      <v-btn
                      color="#f2b3eb"
                      :disabled="king == null || gotIdea"
                      v-on="on">Pas d'idée (WIP)</v-btn>
                    </template>
                  </IdeaChooserDialog>
                </v-col>
                <v-col class="flex-grow-0">
                  <v-btn color="#ffdbfb"
                  :disabled="king == null || gotIdea"
                  @click="$store.commit('game/SET_GOT_IDEA', true)">T'inquiète paupiette</v-btn>
                </v-col>
              </v-row>
              <v-row justify="center" dense v-if="!autoChoose && gotIdea">
                <v-col v-for="n in players.length-1" :key="n" class="flex-grow-0">
                  <v-btn
                  v-if="typeof(targets[n-1]) != 'number'"
                  :disabled="!gotIdea || (n > 1 ? typeof(targets[n-2]) != 'number' : false)"
                  :loading="isTargetsLoading[n-1]"
                  @click="chooseTarget(n-1)"
                  color="success">Joueur #{{n}}</v-btn>

                  <span v-else class="headline font-weight-medium text-no-wrap" :class="{'mr-3': n != players.length-1}">
                    <span>{{targetsName[n-1]}}</span>
                  </span>
                </v-col>
              </v-row>
              <v-row dense v-else-if="gotIdea">
                <v-col class="grey--text text--darken-3 font-weight-bold headline text-center">
                  {{parsedIdeaText}}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" @click="$store.dispatch('game/reset')" :disabled="!canReset">Prochain roi</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Players from "@/components/Players.vue"
import IdeaChooserDialog from "@/components/IdeaChooserDialog.vue"
import { mapState, mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "Game",

  components: {
    Players,
    IdeaChooserDialog,
  },

  methods: {
    chooseKing() {
      this.isKingLoading = true;
      setTimeout(() => {
        this.isKingLoading = false;
        this.$store.dispatch("game/chooseRandomKing");
      }, Math.random()*500+500);
    },
    chooseTarget(n: number) {
      this.isTargetsLoading.splice(n, 1, true);
      setTimeout(() => {
        this.isTargetsLoading.splice(n, 1, false);
        this.$store.dispatch("game/addRandomTarget");
      }, Math.random()*500+500);
    },
  },
  computed: {
    canReset() {
      return !this.isKingLoading && !this.isTargetsLoading.some(v => v);
    },
    
    ...mapState("game",{
      players: "players",
      king: "king",
      gotIdea: "gotIdea",
      autoChoose: "autoChoose",
      targets: "targets"
    }),
    ...mapGetters({
      targetsName: "game/targetsName",
      remainingPlayers: "game/remainingPlayers",
      parsedIdeaText: "game/parsedIdeaText"
    })
  },

  data: () => ({
    state: "choosingPlayers",

    isKingLoading: false,
    isTargetsLoading: [] as boolean[],
  })
})
</script>