<template>
  <AppBar
      titleRed="Dein"
      titleGrey="Account"
  ></AppBar>
  <v-container
      style="width: 85%;"
  >

    <v-tabs
        v-model="this.selectedCategory"
        bg-color="transparent"
        color="#E0001BFF"
        grow
    >
      <v-tab
          v-for="content in contentType"
          :key="content"
          :value="content"
      >
        {{ content }}
      </v-tab>
    </v-tabs>





    <!-- Display Events -->
    <v-container
        :fluid=true
    >

      <v-row>
        <v-col
            v-for="(item, index) in filteredAdvertisements"
            :key="index"
            cols="12"
            sm="12"
            md="6"
            lg="6"
            xl="4"
            xxl="3"
        >
          <div
              :id="item.id"
              class="rounded"
              style="height: 100%;"
          >
            <EventsPartiesCard
                v-if="content.category= events"
                :item="item"
            ></EventsPartiesCard>

            <DualLivingCard
                v-if="content.category= dualLiving"
                :item="item"
            ></DualLivingCard>

            <StudyHubBuddyCard
                v-if="content.category= studyHubBuddy"
                :item="item"
            ></StudyHubBuddyCard>

            <StudyHubGroupCard
                v-if="content.category= studyHubGroup"
                :item="item"
            ></StudyHubGroupCard>

          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <v-menu
      transition="slide-x-transition-reverse"
      location="start"
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          style="border-radius: 5px; position: fixed; right: 1rem; top: 7rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5);"
          v-bind="props"
          :style="{ bottom: mobile ? '75px' : '20px' }"
          text="Suche"
          variant="outlined"
          color="red"
          icon="mdi-magnify"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card min-width="300" >
      <v-text-field
          v-model="search"
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="search-bar my-5 mx-auto"
          placeholder="Suche..."
      ></v-text-field>
    </v-card>
  </v-menu>
</template>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
export default {
  data: () => ({
    selectedCategory: null,
    search: "",
    }),
  computed: {
    filteredAdvertisements() {
      return this.advertisements.filter(ad => {
        if (ad.category !== this.selectedCategory) {
          return false;
        }

        let keys = Object.keys(ad);
        let showItem = false;

        for (let key of keys) {
          if (String(ad[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            showItem = true;
          }
        }

        return showItem;
      });
    },
  },
}
</script>

<style scoped>
.search-bar {
  width: 85%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.search-bar input {
  padding: 10px;
}

.search-bar:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>