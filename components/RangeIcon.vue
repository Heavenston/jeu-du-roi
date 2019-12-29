<template>
  <v-icon v-bind="currentItems">
    {{current}}
  </v-icon>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "RangeIcon",

  props: {
    items: {
      type: Array as () => string|{text:string, props?: {[name:string]: string}}[],
      required: true,
    },
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    current(): string {
      let v = this.items[this.value];
      if (!v) return "";
      v = typeof(v) === "string" ? v : v.text;
      return v;
    },
    currentItems(): {[name: string]: string}|undefined {
      let v = this.items[this.value];
      if (!v) return undefined;
      return typeof(v) === "string" ? undefined : v.props;
    }
  }
})
</script>