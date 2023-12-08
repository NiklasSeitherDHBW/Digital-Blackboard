<template>

  <v-card>

    <v-card-title class="headline justify-center">
      Löschen bestätigen
    </v-card-title>

    <v-card-text>
      Möchten Sie das Inserat {{title}} wirklich löschen?
    </v-card-text>

    <v-card-actions>
      <v-btn
          variant="outlined"
          @click="exitDialog"
      >Abbrechen</v-btn>

      <v-spacer></v-spacer>

      <v-btn
          color="red"
          variant="outlined"
          @click="deleteAdClicked"
      >Löschen</v-btn>

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

  methods: {

    /**
     * Emits an event to confirm the deletion.
     *
     * @method
     */
    deleteAdClicked() {
      this.$emit("confirmedDeletion")
    },

    /**
     * Cancels the delete operation by emitting an event to the parent.
     *
     * @method
     */
    async exitDialog() {
      this.$emit("cancelDeletion")
    }
  },
};
</script>