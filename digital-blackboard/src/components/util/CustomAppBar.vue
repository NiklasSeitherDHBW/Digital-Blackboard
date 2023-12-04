<template>
  <v-app-bar
      color="white"
      height="100"
  >
    <v-app-bar-title
        class="d-flex align-center"
    >
      <div>
        <h2
            class="title-red"
        >
          {{ titleRed }}
        </h2>

        <h2
            class="title-grey"
        >
          {{ titleGrey }}
        </h2>

        <h5
            class="subtitle">
          {{ subtitle }}
        </h5>
      </div>
    </v-app-bar-title>

    <v-btn
        icon
        class="ml-auto"
        style="display: inline-block"
        @click="toggleDarkMode"
    >
      <v-icon>
        mdi-weather-night
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()

const toggleDarkMode = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<script>
import { colorDhbwRed, colorDhbwGrey } from '@/colors.js';

let root = document.querySelector(":root")
root.style.setProperty("--color-dhbw-grey", colorDhbwGrey)
root.style.setProperty("--color-dhbw-red", colorDhbwRed)

export default {
  props: {
    titleRed: String,
    titleGrey: String,
    subtitle: String
  },
};
</script>

<style>
:root {
  --color-dhbw-grey: #FFFFFF;
  --color-dhbw-red: #FFFFFF;
}

.title-grey {
  color: var(--color-dhbw-grey);

  display: inline-block;
}

.title-red {
  color: var(--color-dhbw-red);
  margin-right: 5px;
  display: inline-block;
}

.subtitle {
  color: #7C868DFF;
}

.d-flex {
  display: flex;
  align-items: center;
}
</style>
