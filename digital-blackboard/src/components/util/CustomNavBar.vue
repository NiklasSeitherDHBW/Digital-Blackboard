<template>
  <v-bottom-navigation
      v-if="mobile"
  >
    <v-list
        :nav="true"
        class="d-flex"
        style="overflow: hidden"
    >
      <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          :to="item.value"
          class="dynamic-spacing"
      >
        <v-icon
            size="20"
        >
          {{ item.icon }}
        </v-icon>
      </v-list-item>
    </v-list>
  </v-bottom-navigation>

  <v-navigation-drawer
      v-else
      expand-on-hover
      :rail=true
      class="sticky-navbar"
  >
    <v-list
        :nav=true
    >
      <v-list-item
          prepend-avatar="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
          title="Digital Blackboard"
          subtitle="Mehr brauchst du nicht!"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          :to="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay()
</script>

<script>
export default {
  data() {
    return {
      menuItems: [
        { icon: 'mdi-bulletin-board', title: 'Blackboard', value: 'blackboard' },
        { icon: 'mdi-domain', title: 'Dual Housing', value: 'dualhousing' },
        { icon: 'mdi-calendar-clock', title: 'Events', value: 'events' },
        { icon: 'mdi-school', title: 'StudyBuddy', value: 'studybuddy' },
        { icon: 'mdi-login-variant', title: 'Login', value: 'login' },
        { icon: "mdi-wrench", title: "Test", value: "test"},
      ],
    };
  },
  methods: {
    navigateTo(itemValue) {
      if (itemValue) {
        this.$router.push({ name: itemValue });
      }
    },
  },
};
</script>

<style scoped>
.dynamic-spacing {
  margin-right: 1em;
}
</style>