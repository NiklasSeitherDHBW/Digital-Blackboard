<template>
  <v-app-bar color="white" height="100">
    <v-app-bar-title>
      <h2 class="title-grey">{{ titleGrey }}</h2>
      <h2 class="title-red">{{ titleRed }}</h2>
      <h2 class="title-red" v-if="subtitle !== '' && subtitle !== undefined">:</h2>
      <h5 class="subtitle">{{ subtitle }}</h5>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
import { colorDhbwRed, colorDhbwGrey } from '@/colors.js';

let root = document.querySelector(":root")
root.style.setProperty("--color-dhbw-grey", colorDhbwGrey)
root.style.setProperty("--color-dhbw-red", colorDhbwRed)

export default {
  props: {
    titleGrey: String,
    titleRed: String,
    subtitle: String
  }
};
</script>

<style>
:root {
  --color-dhbw-grey: #FFFFFF;
  --color-dhbw-red: #FFFFFF;
}

.title-grey {
  color: var(--color-dhbw-grey);
  margin-right: 5px;
  display: inline-block;
}

.title-red {
  color: var(--color-dhbw-red);
  display: inline-block;
}

.subtitle {
  color: #7C868DFF;
}
</style>

