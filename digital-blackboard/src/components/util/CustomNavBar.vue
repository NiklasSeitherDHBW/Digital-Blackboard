<template>
    <v-bottom-navigation v-if="mobile">
      <v-btn
          v-for="item in menuItems"
          :key="item.value"
          :value="item.value"
          @click="navigateTo(item.value)">
        <v-icon class="navbar-icon">{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>

  <v-navigation-drawer v-else expand-on-hover rail class="sticky-navbar">
    <v-list dense nav>
      <v-list-item
          prepend-avatar="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
          title="Digital Blackboard"
          subtitle="Mehr brauchst du nicht!"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          @click="navigateTo(item.value)">
        <v-list-item-title>
          <v-icon class="navbar-icon">{{ item.icon }}</v-icon>
          <h style="margin-left: 15px">{{ item.title }}</h>
        </v-list-item-title>
      </v-list-item>
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
      ],
    };
  },
  methods: {
    navigateTo(itemValue) {
      if (itemValue) {
        // Use Vue Router to navigate to the corresponding route
        this.$router.push({ name: itemValue });
      }
    },
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}


</style>