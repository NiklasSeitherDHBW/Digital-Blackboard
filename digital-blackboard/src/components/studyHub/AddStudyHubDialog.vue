<template>
  <v-stepper
      v-model="step"
      alt-labels
  >
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zur Gruppe'"
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
          <v-form
              @submit.prevent>
          <v-card-text>
            <v-text-field
                label="Titel der Gruppe *"
                variant="outlined"
                class="mt-2"
                maxlength="50"
                v-model="hubData.title"
                :rules="titleRules"
                counter
                required
            ></v-text-field>

            <v-text-field
                label="Beschreibung"
                variant="outlined"
                maxlength="200"
                v-model="hubData.description"
                counter
            ></v-text-field>

            <v-text-field
                label="Thema *"
                variant="outlined"
                v-model="hubData.subject"
                :rules="generalRules"
            ></v-text-field>

            <v-text-field
                label="Aktivitäten"
                variant="outlined"
                v-model="hubData.activities"
            ></v-text-field>

          </v-card-text>
            <v-card-actions>
              <v-btn
                  color="red"
                  class="mr-2 mb-2"
                  variant="outlined"
                  @click="exitDialog()"
              >
                Schließen
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
                  class="mr-2 mb-2"
                  type="submit"
                  variant="outlined"
                  @click="validateDataForm()"
              >
                Nächste
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-window-item>

        <v-window-item
            :value="2"
        >
          <UploadImagesStep
              ref="uploadImagesForm"
          ></UploadImagesStep>
          <v-card-actions>
            <v-btn
                variant="outlined"
                @click="step--"
            >
              Zurück
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn
                color="red"
                class="float right"
                type="submit"
                variant="outlined"
                @click="step++"
            >
              Zusammenfassung
            </v-btn>
          </v-card-actions>
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
              Ihre Gruppe wurde erfolgreich geteilt!
            </h3>
            <span
                class="text-caption text-grey"
            >Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card
              class="ma-1"
              variant="outlined"
          >
            <v-card-title>Angaben zur Gruppe</v-card-title>

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
          <v-card-actions>
            <v-btn
                variant="outlined"
                @click="step--"
            >
              Zurück
            </v-btn>

            <v-spacer></v-spacer>
            <!--Nur sichtbar solange man sich auf der letzten Seite befindet, übergibt die Inputdaten -->
            <v-btn
                color="red"
                class="float right"
                variant="outlined"
                type="submit"
                @click="closeDialog"
            >
              Gruppe teilen
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
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
      "title", "description", "subject", "activities"
    ],
    // regeln zum validieren des Inputs
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

    hubData: {
      title: '',
      description: '',
      subject: '',
      activities: '',
      category: 'group',
      members: 1,
      joined: false,
      userId: 1,

    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "activities": "Aktivitäten:",
      "subject": "Thema:",
    },
  }),

  methods: {
    validateDataForm() {
      // kritische Daten werden durch rules validiert, wenn alle felder richtig ausgefüllt werden kann die nächste seite erreich werden
      const isValid = this.validateFields([
        { value: this.hubData.title, rules: this.titleRules },
        { value: this.hubData.subject, rules: this.generalRules },
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
    exitDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("exit-dialog")
    },
    closeDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.hubData)
    }
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zur Gruppe';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Gruppe wurde erfolgreich erstellt!';
      }
    },
    eventInfos() {
      // iteriert über alle formData Attribute und deren Titel aus dictionary um diese als Preview anzuzeigen
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.hubData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
    },
  },
};
</script>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Adjust the z-index as needed */
  background-color: white; /* Adjust the background color as needed */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
  /* Additional styles as needed */
}

/* Add padding to the content below the fixed header */
.v-stepper-window {
  padding-top: 60px; /* Adjust the value based on the height of your fixed header */
}
</style>
