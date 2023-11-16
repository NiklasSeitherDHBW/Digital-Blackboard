<template>
  <v-app-bar color="white" height="100">
    <v-app-bar-title>
      <h2 style="color: #7C868DFF; display: inline-block; margin-right: 5px;">Events</h2>
      <h2 style="color: #7C868DFF; display: inline-block;"> & </h2>
      <h2 style="color: #E0001BFF; display: inline-block; margin-left: 5px;">Feiern</h2>
    </v-app-bar-title>
  </v-app-bar>
  <v-app>
    <v-container>
      <!-- Event Categories -->
      <v-row>
        <v-col v-for="(category, index) in eventCategories" :key="index" cols="12" md="4">
          <v-card @click="showEvents(category)" :color="category === selectedCategory ? '#E0001BFF' : '#FFFFFF'">
            <v-card-title class="text-center">
              {{ category }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Display Events -->
      <v-row v-if="selectedCategory">
        <v-col v-for="(event, index) in getEventsByCategory(selectedCategory)" :key="index" cols="12" md="4">
          <v-card>
            <v-card-title>{{ event.title }}</v-card-title>
            <v-card-subtitle>{{ event.date }}</v-card-subtitle>
            <v-card-text>{{ event.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const eventCategories = ref(['Events', 'Feiern', 'Seminare']);
const events = ref([
  { title: 'Dualer Master', category: 'Events', date: '2023-01-15', description: 'Wie kannst du einen Dualen Master überleben.' },
  { title: 'Seminar für Artificial Intelligence', category: 'Seminare', date: '2023-02-20', description: 'Explore the advancements in AI technology.' },
  { title: 'Erstsemester Party', category: 'Feiern', date: '2023-03-10', description: 'Dance until the Sun comes up.' },
]);

const selectedCategory = ref(null);

const showEvents = (category) => {
  // Only update selectedCategory if it's different from the current value
  selectedCategory.value = category === selectedCategory.value ? null : category;
};

const getEventsByCategory = (category) => {
  return events.value.filter(event => event.category === category);
};
</script>

<style>
</style>
