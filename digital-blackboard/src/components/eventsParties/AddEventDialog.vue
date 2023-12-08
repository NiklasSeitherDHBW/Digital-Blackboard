<template>
  <v-stepper v-model="step" alt-labels>
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zum Event'"
          :icon="mobile ? 'mdi-text-box-outline' : ''"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Fotos des Objektes'"
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
      <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form @submit.prevent>
          <v-card-text>
            <v-text-field
                label="Name des Events *"
                variant="outlined"
                class="mt-2"
                maxlength="50"
                v-model="eventData.title"
                :rules="titleRules"
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
                :rules="dateRules"
                v-model="eventData.date"
            ></v-text-field>

            <v-text-field
                label="Ort *"
                placeholder="Coblitzallee 1-9, 68163 Mannheim"
                variant="outlined"
                :rules="generalRules"
                v-model="eventData.location"
            ></v-text-field>

            <v-text-field
                label="Zielgruppe *"
                variant="outlined"
                :rules="generalRules"
                v-model="eventData.community"
            ></v-text-field>

            <v-text-field
                label="Preis p.p. *"
                variant="outlined"
                prefix="€"
                :rules="numRules"
                v-model="eventData.price"
            ></v-text-field>

            <v-text-field
                label="maximale Teilnehmeranzahl"
                variant="outlined"
                v-model="eventData.maxParticipantsLimit"
            ></v-text-field>
          </v-card-text>

            <v-card-actions>
              <v-btn
                  color="#eb1b2a"
                  class="mr-2 mb-2"
                  variant="outlined"
                  @click="exitDialog()"
              >
                Schließen
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                  color="#eb1b2a"
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

        <v-window-item :value="2">
          <UploadImagesStep ref="uploadImagesForm"></UploadImagesStep>
          <v-card-actions>
            <v-btn
                variant="outlined"
                @click="step--"
            >
              Zurück
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn
                color="#eb1b2a"
                class="float right"
                type="submit"
                variant="outlined"
                @click="step++"
            >
              Nächste
            </v-btn>
          </v-card-actions>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/dhbw-logo-small.jpg?alt=media"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Noch ein letzter Check, ob alles passt!
            </h3>
            <span class="text-caption text-grey">Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card class="ma-1" variant="outlined">
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

            <v-card-actions>
              <v-btn variant="outlined" @click="step--">Zurück</v-btn>

              <v-spacer></v-spacer>
              <!-- only visible as long as you are on the last page, transfers the input data -->
              <v-btn
                  color="#eb1b2a"
                  class="float right"
                  variant="outlined"
                  type="submit"
                  @click="closeDialog"
              >
                Event teilen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>

    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
/**
* The `setup` block script imports `useDisplay` from Vuetify and destructures the result to extract `mobile`.
* @typedef {import('vuetify').useDisplay} useDisplay
* @type {Object}
* @property {boolean} mobile - a Boolean value that indicates whether the display is on a mobile device.
*/

// use of useDisplay from Vuetify for mobile responsiveness
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
/**
 * the main script exports a Vue component and imports `UploadImagesStep` from a specific path.
 * @typedef {import('@/components/util/UploadImagesStep.vue')} UploadImagesStep
 * @type {Object}
 * @property {Object} components - a list of components that are used in this Vue component.
 * @property {UploadImagesStep} components.UploadImagesStep - the component for the image upload.
 * @property {Function} data - a function that returns the initial data for the Vue component.
 * @property {number} data.step - current step in the stepper.
 * @property {Array} data.selectedImages - a list of selected images.
 * @property {Array} data.infosEvent - a list of information required for the event.
 * @property {Array} data.titleRules - rules for validating the event title.
 * @property {Array} data.generalRules - general rules for the validation of information.
 * @property {Array} data.dateRules - rules for validating the date.
 * @property {Array} data.numRules - rules for validating numerical information.
 * @property {Object} data.eventData - data structure for event information.
 * @property {Object} data.dictionary - translation of form elements.
 * @property {Function} methods - a collection of methods for the functionality of the Vue component.
 * @property {Function} methods.validateDataForm - method for validating the event data.
 * @property {Function} methods.validateFields - method for validating form fields.
 * @property {Function} methods.onFileChange - method for editing file changes.
 * @property {Function} methods.deleteImage - method for deleting a selected image.
 * @property {Function} methods.uploadImages - method for uploading selected images.
 * @property {Function} methods.exitDialog - method for closing the dialog.
 * @property {Function} methods.closeDialog - method for closing the dialog and transferring user data.
 * @property {Object} computed - calculated properties for dynamic display.
 * @property {Function} computed.currentTitle - calculated property for the current title in the stepper.
 * @property {Function} computed.eventInfos - calculated property for displaying event information.
 */
// import of the UploadImagesStep-component
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {UploadImagesStep},
  // initialization of data and methods for the event component
  data: () => ({
    step: 1,
    selectedImages: [],
    // list of all event form fields (event information)
    infosEvent: [
      "title", "description", "date", "location", "price", "community", "maxParticipantsLimit"
    ],
    // validation rules for form fields
    titleRules: [
        // something must be entered in the field, min length 3 characters
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
        // only numbers allowed
      (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
    ],
    // data structure for event information
    eventData: {
      title: '',
      description: '',
      date: '',
      location: '',
      price: '',
      community: '',
      maxParticipantsLimit: 1,
      category: 'Events',
      userId: 1,
    },
    // translation of form elements
    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "date": "Wann:",
      "location": "Wo:",
      "price": "Preis in €:",
      "community": "Zielgruppe:",
      "maxParticipantsLimit": "Max. Anzahl Teilnehmer:"
    },
  }),

  methods: {
    // validation of the event data to go to the next page
    // critical event data is validated by rules, if all fields are filled in correctly the next page can be reached
    validateDataForm() {
      const isValid = this.validateFields([
        { value: this.eventData.title, rules: this.titleRules },
        { value: this.eventData.location, rules: this.generalRules },
        { value: this.eventData.date, rules: this.dateRules},
        { value: this.eventData.price, rules: this.numRules },
        { value: this.eventData.community, rules: this.generalRules },

      ]);  console.log(isValid)
      if (isValid) {
        return this.step++
      }
    },
    // validation of the fields based on the specified rules
    validateFields(fields) {
      // check every rule on every field
      for (const field of fields) {
        for (const rule of field.rules) {
          const isValid = rule(field.value);
          if (isValid !== true) {
            // if the rule is not fulfilled, display the error message
            console.error(isValid);
            return false;
          }
        }
      }
      return true; // all rules have been fulfilled => next page
    },
    // processing of file changes
    onFileChange() {
      this.selectedImages = this.selectedImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    },
    // deleting an image from the selection
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },
    // upload the selected images
    uploadImages() {
      this.selectedImages.forEach((image) => {
        if (image.file instanceof Blob) {
          console.log('Uploading:', image.url);
        }
      });
    },
    // exit the dialog and close the window
    exitDialog() {
      // the dialog box is ended, the exit-dialog event of the parent is executed, user data/images are transferred
      this.$emit("exit-dialog")
    },
    // the dialog box is closed, the close-dialog event of the parent is executed, user data/images are transferred
    closeDialog() {
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.eventData)
    }
  },
  computed: {
    // dynamic display of the current step in the stepper
    // steps of the stepper
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zum Event';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Event wurde erfolgreich geteilt!';
      }
    },
    // preview of the event information
    eventInfos() {
      // iterates over all eventData attributes and their titles from dictionary to display them as a preview
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

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.v-stepper-window {
  padding-top: 60px;
}
</style>
