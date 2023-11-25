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
              <v-carousel height="300px"
                          show-arrows="hover"
                          hide-delimiters
                          progress="primary">
                <v-carousel-item v-for="(image, index) in item.raw.images"
                                 :src="image"
                                 :key="index"
                                 cover
                                 class="align-end"
                                 @click="openDialogImagesFullscreen(item)"/>
              </v-carousel>

              <v-dialog v-model="showDialogImages"
                        max-width="1200px">
                <v-card>
                  <v-row class="pa-5 d-flex align-center">

                  <v-card-title>{{selectedItem.raw.name}}</v-card-title>

                    <v-btn @click="showDialogImages=false"
                            style="background-color: #E0001BFF; color: white;"
                            icon="mdi-close"
                           class="ml-auto mr-1"
                      size="30"/>
                  </v-row>
                  <v-divider/>
                  <v-carousel show-arrows="hover"
                            progress="primary"
                  >
                  <v-carousel-item v-for="(image, index) in selectedItem.raw.images"
                  :key="index"
                  :src="image">

                  </v-carousel-item>
                </v-carousel>
                </v-card>
              </v-dialog>


              <v-card-title class="align-center">
                <h4>{{ item.raw.name }}</h4>
              </v-card-title>
              <v-list-item-subtitle
                  style="margin-top: 5px;
                  margin-left: 15px">
                <p> Einstellungsdatum: {{ item.raw.edate }} </p>
              </v-list-item-subtitle>

              <v-card-text>
                <v-row v-for="(field, index) in [
                          { label: 'Zeitraum', value: item.raw.available },
                          { label: 'Wohnfläche', value: `${item.raw.meter} m²` },
                          { label: 'Miete', value: `${item.raw.price} EUR / Monat` },
                        ]" :key="index" no-gutters>
                  <v-col>
                    <h4>{{ field.label }}:</h4>
                  </v-col>
                  <v-col>
                    <p>{{ field.value }}</p>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider/>

              <span style="display: flex; align-items: center;">
                <v-btn
                    :model-value="isExpanded(item)"
                    :icon="`${isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'}`"
                    density="compact"
                    @click="() => toggleExpand(item)"
                    style="margin: 10px; color: #E0001BFF">
                </v-btn>
                <p>
                  Mehr Informationen
                </p>
              </span>

              <v-divider/>

              <v-expand-transition>
                  <div v-if="isExpanded(item)">
                    <v-card-text>
                      <v-row v-for="(field, index) in [
                          { label: 'Beschreibung', value: item.raw.description },
                          { label: 'Ort / Stadtteil', value: item.raw.location },
                          { label: 'Möbliert', value: item.raw.furniture },
                          { label: 'WG Zimmer', value: item.raw.community },
                        ]" :key="index" no-gutters>
                        <v-col>
                          <h4>{{ field.label }}:</h4>
                        </v-col>
                        <v-col>
                          <p>{{ field.value }}</p>
                        </v-col>
                      </v-row>
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
      <p style="margin: 50px;"/>
    </template>
  </v-data-iterator>

  <v-btn
      style="position: fixed; bottom: 20px; right: 20px; border-radius: 5px; background-color:#E0001BFF; color: white;"
      icon="mdi-plus"
      text="+">
        <v-icon>mdi-plus</v-icon>
        <v-dialog
            v-model="showDialogAddApartment"
            activator="parent"
            width="auto">
          <AddApartment/>
        </v-dialog>
  </v-btn>

</template>

<script>
export default {
  data: () => ({
    showDialogAddApartment: false,
    showDialogImages: false,
    selectedItem: null,
    contents: [
      {
        name: 'Sophies Rechner hebt ab!',
        description: 'Hauptsache er sah schön aus!!!.',
        location: "Mannheim Neuostheim",
        edate:"08.11.2023",
        available: "14.02.2023 - 15.05.2023",
        furniture: "Nein",
        community: "WG, 4 Jungs",
        price: "650",
        meter: "120",
        images: ["https://beyond-real-estate.de/wp-content/uploads/2019/09/wohnung-inselstrasse-duesseldorf-1.jpg",],
        cat: "Housing",
      },
      {
        name: "Suche Tauschpartner/in für eine Wohnung in Mannheim",
        edate: "25.10.2023",
        price: 450 ,
        available: "01.01.24 – 31.03.24",
        furniture: "Ja",
        description: "Hallo, ich heiße Xenia, bin 20 Jahre alt und werde ab dem 01.10.2023 in Mannheim, mit der Praxisphase meines Studiums beginnen. Ich werde aber schon im September, in Mannheim, mit einem einmonatigen Praktikum starten. Das Studium ist dual, das bedeutet ich bin ab dem 01.09.23-31.12.2023 in Mannheim (1.09 wegen dem Praktikum, sonst wäre es 1.10) und danach 3 Monate nicht mehr und dann 3 Monate wieder in Mannheim. Also ich bin alle 3 Monate für 3 Monate in Mannheim. Daher suche ich jemanden der genau im Gegensatz seine Praxisphase hat. Falls du Interesse hast, würde es mich freuen, wenn du dich meldest und wir gemeinsam eine Wohnung finden können :) " ,
        contact: "Xenia Frietsch",
        meter: "21",
        images: ["https://dualeswohnen.de/storage/apartments/2KvNpOoDYKZkuHnIGnL4PhquPtvU1M8CfMYqUBGXjHxrTt7AdDGIErec1mtHLVCP/QWMy1j0ydvT9A1TYw98sO84bAp0FY615kOdYvtz-2023-04-02-18-25-41.jpeg","https://cf.bstatic.com/xdata/images/hotel/max1024x768/407682874.jpg?k=76a5b9c92a3f2a41f3d2f7a564722b27cb19fa06e74dc10539daf5f8f575f0dd&o=&hp=1", "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"],
      },
    ],
  }),
  methods: {
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddApartment from "@/components/util/AddAppartment.vue"
</script>