<template>
  <v-card
      :style="{ 'min-width': '125px', 'height': showAll ? '100%' : 'auto', 'padding-bottom': showAll ? '50px' : '0px', 'box-shadow': '10px 10px 10px rgba(0, 0, 0, 0.3)'}"
  >
    <v-carousel
        :height="item.images.length < 1 ? '0px' : '300px'"
        :show-arrows="item.images.length > 1 ? 'hover' : false"
        hide-delimiters
    >
      <v-carousel-item
          v-for="(image, index) in item.images"
          :key="index"
          :src="image"
          :cover=true
          class="align-end"
          @click="showDialogImagesFullscreen=true"
      >
      </v-carousel-item>

      <v-dialog
          v-model="showDialogImagesFullscreen"
          max-width="1200px"
      >
        <v-card :class="{ 'text-wrap' : showDialogImagesFullscreen}">
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
              :show-arrows="item.images.length > 1 ? 'hover' : false"
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

    <v-card-title class="text-wrap">
      {{ item.title }}
    </v-card-title>

    <v-card-subtitle>
      Erstelldatum: {{ item.date_created }}
    </v-card-subtitle>

    <v-card-text class="ma-1 text-wrap">
      <v-row
          v-for="(field, index) in basicInfos"
          :key="index"
          no-gutters
          class="mt-1"
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

      <slot name="bottomBasicInfos"></slot>
    </v-card-text>
    <div
        v-if="item.editable"
        class="d-inline-flex">
      <v-btn
          icon="mdi-pencil-outline"
      ></v-btn>
    </div>
    <v-divider></v-divider>

    <v-container
        style="display: flex; align-items: center;"
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
    </v-container>


    <v-divider></v-divider>

    <v-expand-transition>
      <div
          v-if="showAll"
      >
        <v-card-text class="ma-1">
          <v-row
              v-for="(field, index) in extraInfos"
              :key="index"
              no-gutters
              class="mt-1"
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
      </div>

    </v-expand-transition>

    <v-card-actions
        v-if="showAll"
        style="position: absolute; bottom: 0; right:0; "
    >
      <v-btn
          ref="btnAction"
          icon="mdi-share-variant-outline"
          class="mr-1 mb-1"
          color="#eb1b2a"
          @click="handleClick"
      >
      </v-btn>
      <v-btn
          ref="btnAction"
          class="mr-2 mb-1"
          variant="outlined"
          :color="actionBackground"
          @click="this.$emit('action-clicked')"
      >
        {{ action }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
    basicInfos: Object,
    extraInfos: Object,

    action: String,
    actionBackground: {
      type: String,
      default: "red" // TODO: Replace by DHBW red
    },

    customClick: Function,
  },
  data() {
    return {
      showAll: false,
      showDialogImagesFullscreen: false,
    };
  },
  methods: {
    handleClick() {
      // Check if a custom click function is provided by the parent
      if (this.customClick && typeof this.customClick === 'function') {
        // If yes, execute the custom click function provided via props
        this.customClick();
      } else {
        const link = window.location.origin + this.$route.path + '?card=' + this.item.id
        navigator.clipboard.writeText(link);
        alert(`Der Link zum Inserat wurde in deine Zwischenablage kopiert`);
      }
    },
  },
};

</script>

<style scoped>
.button-round {
  background: white;
  color: #eb1b2a;
}

.text-wrap {
  white-space: normal;
}
</style>