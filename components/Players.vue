<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="ma-0">
      <v-col style="max-width: 700px;">
        <v-card>
          <v-card-title>Joueurs</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(player, i) in players" :key="player+i">
                <v-list-item-title>{{player}}</v-list-item-title>
                <v-list-item-action>
                  <v-btn icon @click="players.splice(i,1)"><v-icon>mdi-delete</v-icon></v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <NewPlayerDialog @validated="name => players.push(name)"></NewPlayerDialog>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="validate" :disabled="players.length == 0">Valider</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import NewPlayerDialog from "@/components/NewPlayerDialog.vue"

export default Vue.extend({
  name: "Players",

  data: () => ({
    players: [
    ]
  }),
  methods: {
    validate() {
      localStorage.setItem("players", JSON.stringify(this.players));
      this.$emit("validated", this.players);
    }
  },
  mounted() {
    if (localStorage.getItem("players")) {
      this.players = JSON.parse(localStorage.getItem("players") as string);
    }
  },

  components: {
    NewPlayerDialog
  }
})
</script>