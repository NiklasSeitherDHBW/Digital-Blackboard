<template>
  <AppBar titleGrey="Dual" titleRed="Living"/>

  <v-data-iterator
      :items="contents"
      item-value="name"
  >
    <template v-slot:default="{ items , isExpanded, toggleExpand}">
      <v-container fluid="true" style="width: 85%;">
        <v-row dense>
          <v-col
              v-for="item in items"
              :key="item.raw.name"
              :cols="item.raw.flex"
          >
            <v-card class="mx-auto" max-height="">

              <v-img
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  cover
                  :src="item.raw.src">
              </v-img>
              <v-card-title class="align-center">
                <h4>{{ item.raw.name }}</h4>
              </v-card-title>
              <v-list-item-subtitle
                  style="margin-top: 5px;
                  margin-left: 15px">
                <p> Einstellungsdatum: {{ item.raw.edate }} </p>
              </v-list-item-subtitle>

              <v-card-text>
                <div >
                  <p>Zeitraum: {{item.raw.available }}</p>
                  <p>Monatliche Miete: {{item.raw.price}} EUR</p>
                  <p>Wohnfläche: {{item.raw.meter}}</p>

                  <v-btn
                      :model-value="isExpanded(item)"
                      :icon="`${isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'}`"
                      density="compact"
                      inset
                      class="float-right pd-5"
                      @click="() => toggleExpand(item)"
                      style="margin-bottom: 10px; color: #E0001BFF">
                  </v-btn>
                </div>
              </v-card-text>

              <v-expand-transition>
                  <div v-if="isExpanded(item)">
                    <v-card-text>
                    <p>Beschreibung: {{item.raw.description}}</p>
                      <p>Ort/ Stadtteil {{item.raw.location}}></p>
                    <p>Möbliert: {{item.raw.furniture}}</p>
                    <p>WG Zimmer: {{ item.raw.community}}</p>
                    </v-card-text>
                  <v-btn
                      class="float-right mr-5 mt-5 mb-5 font-weight-medium"
                      style="background-color:#E0001BFF; color: white;">
                    Kontaktieren
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  data: () => ({

    contents: [
      {
        name: 'Sophies Rechner hebt ab!',
        description: 'Hauptsache er sah schön aus!!!.',
        location: "Mannheim Neuostheim",
        edate:"08.11.2023",
        available: "14.02.2023 - 15.05.2023",
        furniture: "Ja",
        community: "WG, 4 Jungs",
        price: "450",
        icon: 'mdi-ice-cream',
        flex: 6,
        src: "https://beyond-real-estate.de/wp-content/uploads/2019/09/wohnung-inselstrasse-duesseldorf-1.jpg",
        cat: "Housing",
      },
    ],
  }),
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";

</script>