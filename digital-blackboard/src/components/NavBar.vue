<template>
  <v-navigation-drawer expand-on-hover rail class="sticky-navbar">
    <!-- ... (Your existing navigation drawer content) ... -->
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
          :prepend-icon="item.icon"
          :title="item.title"
          @click="navigateTo(item.value)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { icon: 'mdi-bulletin-board', title: 'Blackboard', value: 'blackboard' },
        { icon: 'mdi-domain', title: 'Dual Housing', value: 'dualhousing' },
        { icon: 'mdi-calendar-clock', title: 'Events', value: 'events' },
        { icon: 'mdi-account-multiple-outline', title: 'StudyBuddy', value: 'studybuddy' },
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
  .sticky-drawer {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%; /* Set the height to 100% to fill the entire viewport height */
    z-index: 1000; /* Adjust the z-index as needed */
  }
</style>
