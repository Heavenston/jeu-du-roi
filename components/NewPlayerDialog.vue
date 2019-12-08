<template>
  <v-dialog persistent v-model="dialog">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
    </template>

    <transition name="slide-x-transition">
    <v-card>
      <v-card-title>Nouveau joueur</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Nom" color="black" v-model="name" :error-messages="nameErrors" @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="validate">Valider</v-btn>
        <v-btn color="error" @click="close">Annuler</v-btn>
      </v-card-actions>
    </v-card>
    </transition>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"

export default Vue.extend({
  name: "NewPlayerDialog",
  mixins: [validationMixin],

  data: () => ({
    dialog: false,
    name: ""
  }),

  computed: {
    nameErrors(): string[] {
      const errors: string[] = [];
      if (!this.$v.name) return errors;
      if (!this.$v.name.$dirty) return errors;

      !this.$v.name.required && errors.push("Le nom ne peut-être vide")

      return errors;
    }
  },

  methods: {
    close() {
      this.dialog = false;
      this.name = "";
      this.$v.$reset();
    },
    validate() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.$emit("validated", this.name);
      this.close();
    }
  },

  validations: {
    name: {
      required
    }
  }
})
</script>