<template>
  <v-card>
    <v-card-title class="headline justify-center">
      Löschen bestätigen
    </v-card-title>
    <v-card-text>
      Möchten Sie das Inserat {{title}} wirklich löschen?
    </v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" @click="exitDialog">Abbrechen</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" variant="outlined" @click="deleteAdClicked">Löschen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "<UNDEFINED>"
    }
  },
  data() {
    return {
    };
  },
  methods: {

    deleteAdClicked() {
      this.$emit("confirmedDeletion")
    },

    // Cancel the delete operation
    async exitDialog() {
      this.$emit("cancelDeletion")
    }
  },
};
</script>