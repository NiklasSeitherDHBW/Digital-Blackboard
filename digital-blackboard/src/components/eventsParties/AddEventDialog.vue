<template>
  <v-stepper
      v-model="step"
      :editable=true
      alt-labels
      class="sticky-stepper"
  >
    <v-stepper-header
      class="sticky-stepper-header"
    >
      <v-stepper-item
          title="Angaben zum Event"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          subtitle="Optional"
          title="Fotos"
          :value="2"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window>
      <v-card-title
          class="text-h6 font-weight-regular justify-space-between pa-2"
      >
        <span>
          {{ currentTitle }}
        </span>
      </v-card-title>

      <v-window
          v-model="step"
      >
        <v-window-item
            :value="1"
        >
          <v-card-text>
            <v-text-field
                label="Name des Events *"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Beschreibung"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Datum *"
                placeholder="TT.MM.JJJJ"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Ort *"
                placeholder="Coblitzallee 1-9, 68163 Mannheim"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Zielgruppe *"
                placeholder="Wirtschaftsinformatik Studenten"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Preis p.p. in €"
                placeholder="Optional"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                label="Maximale Teilnehmeranzahl"
                placeholder="Optional"
                variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-window-item>

        <v-window-item
            :value="2"
        >
          <v-container>
            <v-file-input
                v-model="selectedImages"
                label="Choose images"
                variant="outlined"
                multiple
                show-size
                @change="onFileChange"
            ></v-file-input>

            <v-row>
              <v-col
                  v-for="(image, index) in selectedImages"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-card>
                  <v-img
                      v-if="image.url"
                      :src="image.url"
                      :alt="'Image ' + (index + 1)"
                      height="200px"
                  ></v-img>
                  <v-card-actions>
                    <v-btn
                        color="red"
                        class="ml-auto"
                        @click="deleteImage(index)" icon
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item :value="3">
          <div
              class="pa-4 text-center"
          >
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Ihr Event wurde erfolgreich geteilt
            </h3>
            <span
                class="text-caption text-grey"
            >
              Danke, dass du das Digital Blackboard nutzt!
            </span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1 && step < 3"
            variant="text"
            @click="step--"
        >
          Zurück
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            v-if="step < 2"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Nächste
        </v-btn>

        <v-btn
            v-if="step === 2"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Event teilen
        </v-btn>

        <v-btn
            v-if="step === 3"
            color="red"
            variant="flat"
            class="float right"
            @click="closeDialog"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>


<script>
export default {
  data: () => ({
    step: 1,
    selectedImages: [],
  }),
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    onFileChange() {
      this.selectedImages = this.selectedImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    },
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },
    uploadImages() {
      this.selectedImages.forEach((image) => {
        if (image.file instanceof Blob) {
          console.log('Uploading:', image.url);
        }
      });
    },
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zum Event'
        case 2: return 'Fotos'
        default: return 'Event erfolgreich geteilt'
      }
    },
  },
};
</script>

<style>
.sticky-stepper {
  position: sticky;
  overflow: visible;
}

.sticky-stepper-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>