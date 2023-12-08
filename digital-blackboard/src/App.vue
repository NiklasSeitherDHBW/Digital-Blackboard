<template>
  <v-app>
    <v-main>
      <CustomNavBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import CustomNavBar from "@/components/util/CustomNavBar.vue";
</script>

<style>

</style>

