<template>
  <v-stepper
      v-model="step"
      alt-labels

  >
    <v-stepper-header>
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zur Information'"
          :icon="mobile ? 'mdi-text-box-outline' : ''"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Fotos'"
          :subtitle="mobile ? '' : 'Optional'"
          :icon="mobile ? 'mdi-image-outline' : ''"
          :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Zusammenfassung'"
          :icon="mobile ? 'mdi-checkbox-marked-circle-outline' : ''"
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
          <!-- Form für den Input des Users -> v-model, und Eingabehinweise -> prefix, rules, placeholder -->
          <v-card-text>
            <v-text-field
                label="Titel der Information *"
                variant="outlined"
                class="mt-2"
                maxlength="50"
                v-model="infoData.title"
                :rules="titleRules"
                counter
                required
            ></v-text-field>

            <v-text-field
                label="Beschreibung"
                variant="outlined"
                maxlength="200"
                v-model="infoData.description"
                counter
            ></v-text-field>

            <v-text-field
                label="Ort *"
                placeholder="Coblitzallee 1-9, 68163 Mannheim"
                variant="outlined"
                v-model="infoData.location"
                :rules="generalRules"
            ></v-text-field>

            <v-text-field
                label="Zielgruppe *"
                variant="outlined"
                v-model="infoData.community"
                :rules="generalRules"
            ></v-text-field>

            <v-text-field
                label="Datum *"
                placeholder="TT.MM.JJJJ"
                variant="outlined"
                type="date"
                v-model="infoData.date"
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
                src="https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/dhbw-logo-small.jpg?alt=media"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Noch ein letzter Check das alles passt!
            </h3>
            <span
                class="text-caption text-grey"
            >Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card
              class="ma-1"
              variant="outlined"
          >
            <v-card-title>Informationsangaben</v-card-title>

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
            variant="outlined"
            @click="step--"
        >
          Zurück
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            v-if="step === 1"
            color="red"
            class="float right"
            type="submit"
            variant="outlined"
            @click="validateDataForm"
        >
          Nächste
        </v-btn>

        <v-btn
            v-if="step === 2"
            color="red"
            class="float right"
            type="submit"
            variant="outlined"
            @click="step++"
        >
          Zusammenfassung
        </v-btn>

        <v-btn
            v-if="step === 3"
            color="red"
            class="float right"
            type="submit"
            variant="outlined"
            @click="closeDialog()"
        >
          Information teilen
        </v-btn>
      </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {UploadImagesStep},
  data: () => ({
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "location", "community"
    ],

    titleRules: [
      (value) => value ? true : 'Bitte gebe einen Titel für dein Inserat an!',
      (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
    ],
    generalRules: [
      (value) => value ? true : 'Bitte gebe weitere Informationen an!'
    ],
    dateRules: [
      (value) => value ? true : 'Bitte wähle ein Datum aus!'
    ],
    numRules: [
      (value) => value ? true : 'Bitte gebe weitere Informationen an!',
      (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
    ],

    infoData: {
      title: '',
      description: '',
      location: '',
      community: '',
      date: '',
      category: 'Informationen'
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "location": "Wo:",
      "community": "Zielgruppe:",
      "date": "Wann:"
    },
  }),

  methods: {
    // kritische Eventdaten werden durch rules validiert, wenn alle felder richtig ausgefüllt werden kann die nächste seite erreich werden
    validateDataForm() {
      const isValid = this.validateFields([
        { value: this.infoData.title, rules: this.titleRules },
        { value: this.infoData.subject, rules: this.generalRules },
        { value: this.infoData.location, rules: this.generalRules },

      ]);  console.log(isValid)
      if (isValid) {
        return this.step++
      }
    },

    validateFields(fields) {
      // Überprüfe jede Regel für jedes Feld
      for (const field of fields) {
        for (const rule of field.rules) {
          const isValid = rule(field.value);
          if (isValid !== true) {
            // Wenn die Regel nicht erfüllt ist, zeige die Fehlermeldung an
            console.error(isValid);
            return false;
          }
        }
      }
      return true; // Alle Regeln wurden erfüllt => nächste Seite
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
    // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
    closeDialog() {
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.infoData)
    }
  },
  computed: {
    currentTitle () {
      // einzelnen Schritte des Steppers
      switch (this.step) {
        case 1: return 'Angaben zur Information';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Information wurde erfolgreich geteilt!';
      }
    },
    eventInfos() {
      // iteriert über alle infoData Attribute und deren titel aus dictionary um diese als Preview anzuzeigen
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.infoData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
    },
  },
};
</script>