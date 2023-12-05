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
          title="Angaben zum Buddy"
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
          title="Kontaktdaten"
          :value="3"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Zusammenfassung"
          :value="4"
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
                label="Titel des Buddys *"
                variant="outlined"
                class="mt-2"
                maxlength="50"
                v-model="buddyData.title"
                counter
                required
            ></v-text-field>

            <v-text-field
                label="Beschreibung"
                variant="outlined"
                maxlength="200"
                v-model="buddyData.description"
                counter
            ></v-text-field>

            <v-text-field
                label="Preis pro Stunde"
                prefix="€"
                variant="outlined"
                v-model="buddyData.price"
            ></v-text-field>

            <v-text-field
                label="Fächer"
                variant="outlined"
                v-model="buddyData.subject"
            ></v-text-field>

            <v-text-field
              label="Verfügbarkeit"
              placeholder="Nach Absprache"
              variant="outlined"
              v-model="buddyData.availability"
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

        <v-window-item
            :value="3"
        >
          <v-text-field
              label="Vor-/Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
              v-model="contactData.name"
          ></v-text-field>

          <v-text-field
              label="Telefon"
              placeholder="+49123456789"
              variant="outlined"
              type="tel"
              v-model="contactData.phone"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              variant="outlined"
              type="email"
              v-model="contactData.email"
          ></v-text-field>
        </v-window-item>

        <v-window-item :value="4">
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
              Ihr Inserat wurde erfolgreich geteilt!
            </h3>
            <span
                class="text-caption text-grey"
            >Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card
              class="ma-1"
              variant="outlined"
          >
            <v-card-title>Angaben zum Buddy</v-card-title>

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

            <v-divider
                style="width: 85%; margin: 10px;"
            ></v-divider>

            <v-card-title>Kontaktdaten</v-card-title>

            <v-card-text>
              <v-row
                  v-for="item in extraInfos"
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
            v-if="step < 3"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Nächste
        </v-btn>

        <v-btn
            v-if="step === 3"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Inserat teilen
        </v-btn>

        <v-btn
            v-if="step === 4"
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
      "title", "description", "price", "subject", "availability"
    ],

    infosContact: [
        "name", "mobil", "email"
    ],

    buddyData: {
      title: '',
      description: '',
      price: '',
      subject: '',
      availability: '',
      category: 'buddy',
      rating: '',
    },

    contactData: {
      name: '',
      mobil: '',
      email: '',
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "price": "Preis pro Stunde in €:",
      "subject": "Fächer:",
      "availability": "Verfügbarkeit:",
      "name": "Vor-/Nachname",
      "mobil": "Telefon:",
      "email": "E-Mail",
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
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.buddyData, this.contactData)
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Informationsangaben';
        case 2: return 'Fotos';
        case 3: return 'Kontaktdaten';
        case 4: return 'Zusammenfassung';
        default: return 'Information wurde erfolgreich geteilt!';
      }
    },
    eventInfos() {
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.buddyData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
    },
    extraInfos() {
      let extraInfos = [];
      for (const attribute of this.infosContact) {
        let value = this.contactData[attribute];
        extraInfos.push({label: this.dictionary[attribute], value: value});
      }
      return extraInfos;
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