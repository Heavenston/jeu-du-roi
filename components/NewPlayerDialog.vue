<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
    </template>

    <v-card>
      <v-card-title>Nouveau joueur</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="validate">
          <v-text-field ref="textField" label="Nom" color="black" v-model="name" :error-messages="nameErrors" @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="validate">Valider</v-btn>
        <v-btn color="error" @click="dialog = false">Annuler</v-btn>
      </v-card-actions>
    </v-card>
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
  watch: {
    dialog(v) {
      if (this.dialog) {
        this.reset();
        setTimeout(() => {
          (this.$refs.textField as HTMLInputElement).focus();
        }, 200);
      }
    }
  },

  methods: {
    reset() {
      this.name = "";
      this.$v.$reset();
    },
    validate() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.dialog = false;

      this.$emit("validated", this.name);
    }
  },

  validations: {
    name: {
      required
    }
  }
})
</script>