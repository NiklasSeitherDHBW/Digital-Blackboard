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
          subtitle="optional"
          title="Fotos"
          :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Zusammenfassung"
          :value="3"
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
                class="mt-2"
                maxlength="50"
                v-model="eventData.title"
                counter
                required
            ></v-text-field>

            <v-text-field
                label="Beschreibung"
                variant="outlined"
                maxlength="200"
                v-model="eventData.description"
                counter
            ></v-text-field>

            <v-text-field
                label="Datum *"
                placeholder="TT.MM.JJJJ"
                variant="outlined"
                type="date"
                v-model="eventData.date"
            ></v-text-field>

            <v-text-field
                label="Ort *"
                placeholder="Coblitzallee 1-9, 68163 Mannheim"
                variant="outlined"
                v-model="eventData.location"
            ></v-text-field>

            <v-text-field
                label="Zielgruppe"
                variant="outlined"
                v-model="eventData.community"
            ></v-text-field>

            <v-text-field
                label="Preis p.p."
                variant="outlined"
                prefix="€"
                v-model="eventData.price"
            ></v-text-field>

            <v-text-field
                label="maximale Teilnehmeranzahl"
                variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-window-item>

        <v-window-item
            :value="2"
        >
          <UploadImagesStep
              ref="uploadImagesForm"
          ></UploadImagesStep>
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
            >Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card
              class="ma-1"
              variant="outlined"
          >
            <v-card-title>Angaben zum Event</v-card-title>

            <v-card-text>
              <v-row
                  v-for="item in eventInfos"
                  :key="item.label"
                  no-gutters
                  class="mt-1"
              >
                <v-col>
                  <p>
                    {{ item.label }}
                  </p>
                </v-col>

                <v-col>
                  <p>
                    {{ item.value }}
                  </p>

                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1"
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
            @click="closeDialog()"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>


<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {UploadImagesStep},
  data: () => ({
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "date", "location", "price", "community"
    ],

    eventData: {
      title: '',
      description: '',
      date: '',
      location: '',
      price: '',
      community: '',
      category: 'Events'
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "date": "Wann:",
      "location": "Wo:",
      "price": "Preis in €:",
      "community": "Zielgruppe:",
    },

    titlerules: [
      value => {
        if (value) return true
        return 'Bitte erstellen Sie einen Titel für Ihr Inserat.'
      },],
    descriptionrules: [
        value => {
      if (value) return true
          return 'Bitte erstellen Sie eine Beschreibung für Ihr Inserat.'
        }
    ]
  }),

  methods: {
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
    closeDialog() {
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.eventData)
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zum Event';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Event wurde erfolgreich geteilt!';
      }
    },
    eventInfos() {
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.eventData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
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