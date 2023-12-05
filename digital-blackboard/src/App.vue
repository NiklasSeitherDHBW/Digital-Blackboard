<template>
  <v-app>
    <v-main>
      <CustomNavBar />
      <router-view />
      <v-snackbar v-model="snackbarVisible">{{ snackbarText }}</v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import CustomNavBar from "@/components/util/CustomNavBar.vue";
</script>

<script>
export default {
  name: 'App',

  data: () => ({
    snackbarText: '',
    snackbarVisible: false,
    timeout: 3000,
  }),

  methods: {
    showSnackbar(text, timeout = 3000) {
      this.snackbarText = text;
      this.timeout = timeout;
      this.snackbarVisible = true;
    },
  }
}
</script>

<style>
</style>
