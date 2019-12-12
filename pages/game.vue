<template>
  <v-overlay v-if="state == 'loading'">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <Players v-else-if="state == 'choosingPlayers'" @validated="(ps) => {state = 'play'; players = ps; cpyPlayers()}"></Players>
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
                  v-if="kingId == null">
                    Choisir le roi
                  </v-btn>
                  <h1 v-else class="subtitle font-weight-medium text-no-wrap">
                    Le roi est : <span>{{players[kingId]}}</span>
                  </h1>
                </v-col>
              </v-row>
              <v-row justify="center" class="mb-3 mt-2" dense>
                <v-col class="flex-grow-0">
                  <IdeaChooserDialog :MaxPlayer="this.players.length-1">
                    <template v-slot:activator="{on}">
                      <v-btn
                      color="#f2b3eb"
                      :disabled="kingId == null || gotIdea"
                      v-on="on">Pas d'idée</v-btn>
                    </template>
                  </IdeaChooserDialog>
                </v-col>
                <v-col class="flex-grow-0">
                  <v-btn color="#ffdbfb"
                  :disabled="kingId == null || gotIdea"
                  @click="gotIdea = true">T'inquiète paupiette</v-btn>
                </v-col>
              </v-row>
              <v-row justify="center" dense>
                <v-col v-for="n in players.length-1" :key="n" class="flex-grow-0">
                  <v-btn
                  v-if="typeof(targetsId[n-1]) != 'number'"
                  :disabled="!gotIdea || n > 1 ? typeof(targetsId[n-2]) != 'number' : false"
                  :loading="isTargetsLoading[n-1]"
                  @click="chooseTarget(n-1)"
                  color="success">Joueur #{{n}}</v-btn>

                  <span v-else class="headline font-weight-medium text-no-wrap">
                    <span>{{players[targetsId[n-1]]}}</span>
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" @click="reset" :disabled="!canReset">Reset</v-btn>
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


export default Vue.extend({
  name: "Game",

  components: {
    Players,
    IdeaChooserDialog,
  },

  methods: {
    cpyPlayers() {
      this.players.forEach((_, i) => {
        this.remainingPlayers[i] = i;
        this.isTargetsLoading[i] = false;
      })
    },

    chooseKing() {
      this.isKingLoading = true;
      setTimeout(() => {
        this.isKingLoading = false;
        this.kingId = Math.floor(Math.random() * this.players.length);
        this.remainingPlayers = this.remainingPlayers.filter(v => v != this.kingId);
      }, Math.random()*500+500);
    },
    chooseTarget(n: number) {
      this.isTargetsLoading.splice(n, 1, true);
      setTimeout(() => {
        this.isTargetsLoading.splice(n, 1, false);
        this.targetsId.splice(n, 1, this.remainingPlayers[Math.floor(Math.random() * this.remainingPlayers.length)])
        this.remainingPlayers = this.remainingPlayers.filter(v => v != this.targetsId[n]);
      }, Math.random()*500+500);
    },
    reset() {
      this.targetsId = [];
      this.isKingLoading = false;
      this.remainingPlayers = [];
      this.isTargetsLoading = [];
      this.targetsId = [];
      this.kingId = null;
      this.gotIdea = false;
      this.cpyPlayers();
    }
  },
  computed: {
    canReset() {
      return !this.isKingLoading && !this.isTargetsLoading.some(v => v);
    }
  },

  data: () => ({
    state: "choosingPlayers",
    players: [] as string[],
    remainingPlayers: [] as number[],
    
    isKingLoading: false,
    isTargetsLoading: [] as boolean[],

    kingId: null as null|number,
    gotIdea: false,
    targetsId: [] as number[],
  })
})
</script>