<template>

  <v-app-bar
      color=""
      height="100"
  >
    <v-app-bar-title class="text-center">

      <div class="title-container">

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

/**
 * Toggles between dark mode and light mode in a global theme object.
 *
 * @function
 * @global
 */
const toggleDarkMode = () => {
  // Accessing the global theme object
  const globalTheme = theme.global;

  // Toggling the current theme value between dark and light
  globalTheme.name.value = globalTheme.current.value.dark ? 'light' : 'dark';
};
</script>

<script>
import { colorDhbwRed, colorDhbwGrey } from '@/colors.js';


/**
 * Selects the root element of the document using ":root" pseudo-class.
 * Sets the value of a CSS variable "--color-dhbw-grey" on the root element to the specified color.
 * Sets the value of a CSS variable "--color-dhbw-red" on the root element to the specified color.
 *
 * @const {Element} root - The root element of the document.
 * @const {string} colorDhbwGrey - The color value to set for the "--color-dhbw-grey" CSS variable.
 * @const {string} colorDhbwRed - The color value to set for the "--color-dhbw-red" CSS variable.
 */
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
