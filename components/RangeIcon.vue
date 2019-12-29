<template>
  <v-icon>
    {{current}}
  </v-icon>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "RangeIcon",

  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    current(): string {
      return this.items[this.value];
    }
  }
})
</script>