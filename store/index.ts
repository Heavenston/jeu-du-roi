import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  difficultyEmojies: [{
    text: "mdi-emoticon-neutral-outline",
    props: {color: "blue lighten-4"}
  },
  {
    text: "mdi-emoticon-outline",
    props: {color: "orange darken-1"}
  },
  {
    text: "mdi-emoticon-devil-outline",
    props: {color: "#CE93D8"}
  },
  {
    text: "mdi-fire",
    props: {color: "red darken-2"}
  }],

  sampleNames: [
    "Layla",
    "José",
    "Tom",
    "Lou",
    "Gianni",
    "Chiara"
  ]
});