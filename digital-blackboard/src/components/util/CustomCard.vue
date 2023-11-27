<template>
  <v-card>
    <!-- Images -->
    <v-carousel
      :height="item.images.length < 1 ? '0px' : '300px'"
      :show-arrows="item.images.length > 1 ? 'hover' : false"
      hide-delimiters
      progress="primary"
    >
      <v-carousel-item
        v-for="(image, index) in item.images"
        :key="index"
        :src="image"
        cover
        class="align-end"
        @click="showDialogImagesFullscreen=true"
      ></v-carousel-item>

      <v-dialog
          v-model="showDialogImagesFullscreen"
          max-width="1200px"
      >
        <v-card>
          <v-row class="d-flex align-center ma-3">
            <v-card-title>
              {{ item.title }}
            </v-card-title>

            <v-btn
                class="button-round ml-auto mr-1"
                icon="mdi-close"
                @click="showDialogImagesFullscreen=false"
            ></v-btn>
          </v-row>

          <v-divider></v-divider>

          <v-carousel
              show-arrows="hover"
              progress="primary"
          >
            <v-carousel-item
                v-for="(image, index) in item.images"
                :key="index"
                :src="image"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-dialog>
    </v-carousel>

    <!-- Information shown -->
    <v-card-title class="align-center">
      <h4>
        {{ item.title }}
      </h4>
    </v-card-title>
    <v-card-subtitle
        margin-top="5px"
        margin.left="15px"
    >
      <p>
        Einstellungsdatum: {{ item.date_created }}
      </p>
    </v-card-subtitle>

    <!-- Show basic information -->
    <v-card-text class="ma-1">
      <v-row
          v-for="(field, index) in basicInfos"
          :key="index"
          no-gutters
      >
        <v-col>
          <h4>
            {{ field.label }}
          </h4>
        </v-col>
        <v-col>
          <p>
            {{ field.value }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <!-- Button: Click for more information -->
    <span
        style="display: flex; align-items: center; margin: 10px;"
    >
      <v-btn
          class="button-round"
          density="compact"
          :icon="showAll ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showAll = !showAll"
      ></v-btn>

      <p
          class="ml-3"
      >
        Mehr Informationen
      </p>
    </span>

    <v-divider></v-divider>

    <!-- Information shown when expanded-->
    <v-expand-transition>
      <div v-if="showAll">
        <v-card-text class="">
          <v-row
              v-for="(field, index) in extraInfos"
              :key="index"
              no-gutters
          >
            <v-col>
              <h4>
                {{ field.label }}
              </h4>
            </v-col>
            <v-col>
              <p>
                {{ field.value }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-btn
          class="button-default float-right ma-5 font-weight-medium"
        >
          Kontaktieren
        </v-btn>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
    basicInfos: Object,
    extraInfos: Object,
    action: String,
  },
  data() {
    return {
      showAll: false,
      showDialogImagesFullscreen: false,
    };
  },
};
</script>


<style scoped>
.button-round {
  background: white;
  color: #E0001BFF; /* TODO: Change to color-dhbw-red */
}

.button-default {
  background: #E0001BFF;
  color: white;
}
</style>