<template>
  <v-app-bar color="white" height="100">
    <v-app-bar-title>
      <h2 style="color: #7C868DFF; display: inline-block; margin-right: 5px;">Black</h2>
      <h2 style="color: #E0001BFF; display: inline-block;">Board</h2>
      <h5 style="margin-left: auto; color: rgba(92,97,101,0.65)">Was geht ab!</h5>
    </v-app-bar-title>
  </v-app-bar>
  <v-container
      class="fill-height w-auto"

  >
    <v-row align="center" justify="center">
      <v-col
          v-for="(variant, i) in events"
          :key="i"
          cols = "6"
      >
        <v-card
            class="mx-auto my-8 pa-1 ma-2"
            variant="tonal"
            :href="variant.r"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ variant.category }}
              </div>
              <div class="text-h6 mb-1">
                {{variant.title}}
              </div>
              <div class="text-caption">{{variant.description}}</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import {ref} from "vue";


  const events = ref([
    { title: 'Niggl', r: '/events', category: 'Events', date: '2023-02-20', description: 'Du Lahme Sau' },
    { title: 'Niggolator', r: '/studybuddy', category: 'StudyBuddy', date: '2023-02-20', description: 'Du bist wirklich mal ein lamer Sack' },
    { title: 'Niggolaus', r: '/dualhousing', category: 'DualHousing', date: '2023-03-10', description: 'Das ist ja wohl jetzt die Höhe' },
  ]);
</script>

<style>
  .kachel {

  }
</style>