<template>
  <v-stepper v-model="step" alt-labels>
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
      <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form @submit.prevent>
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
                label="Thema"
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

        <v-window-item :value="2">
          <UploadImagesStep ref="uploadImagesForm"></UploadImagesStep>
          <v-card-actions>
            <v-btn variant="outlined" @click="step--">Zurück</v-btn>

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
          <div class="pa-4 text-center">
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
/**
 * stepper component for creating the group Hub with form validation and image upload
 * @component
 * @example
 */
import {useDisplay} from "vuetify";

/**
 * Display configuration object with mobile property
 * @type {Object}
 * @property {boolean} mobile - indicates if the display is in mobile mode
 */
const {mobile} = useDisplay()
</script>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

/**
 * exported Vue component definition.
 * @typedef {Object} VueComponent
 * @property {Object} components - child components used in the template
 * @property {Object} data - reactive data properties for the component
 * @property {Object} methods - methods to handle component logic
 * @property {Object} computed - computed properties for dynamic content.
 * @property {Object} dictionary - mapping of data attribute names to display labels
 */
export default {
  components: {UploadImagesStep},
  data: () => ({
    /**
     * Current step in the creation process
     * @type {number}
     */
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "subject", "activities"
    ],
    // rules to validate the input
    titleRules: [
      /**
       * check if a value is provided for the title
       * @param {string} value - input value
       * @returns {(boolean|string)} - validation result or error message
       */
      (value) => value ? true : 'Bitte gebe einen Titel für dein Inserat an!',
      /**
       * check if the title has a minimum length of 3 characters
       * @param {string} value - input value
       * @returns {(boolean|string)} - validation result or error message
       */
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

     // data object for storing Hub information
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

    // mapping of data attribute names to display labels
    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "activities": "Aktivitäten:",
      "subject": "Thema:",
    },
  }),

  // validate and proceed to the next step in the creation process
  methods: {
    validateDataForm() {
      // critical data is validated by rules, if all fields are filled in correctly the next page can be reached
      const isValid = this.validateFields([
        { value: this.hubData.title, rules: this.titleRules },
        { value: this.hubData.subject, rules: this.generalRules },
      ]);  console.log(isValid)
      if (isValid) {
        return this.step++
      }
    },

    /**
     * validate form fields against specified rules
     * @method
     * @param {Array} fields - form fields to validate
     * @returns {boolean} - validation result
     */
    validateFields(fields) {
      // check each rule for each field
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
      return true; // ALL rules have been fulfilled? Yes - next page
    },

    onFileChange() {
      // handle file change event and update selected images
      this.selectedImages = this.selectedImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    },

    /**
     * delete an image from selected array
     * @method
     * @param {number} index - index of the image to delete
     */
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },
    uploadImages() {
      // upload selected images
      this.selectedImages.forEach((image) => {
        if (image.file instanceof Blob) {
          console.log('Uploading:', image.url);
        }
      });
    },
    exitDialog() {
      // the dialog window is ended, the exit-dialog event of the parent is executed, user data/images are transferred
      this.$emit("exit-dialog")
    },
    closeDialog() {
      // the dialog window is closed, the close dialog event of the parent is executed, user data/images are transferred
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.hubData)
    }
  },
  computed: {
    /**
     * get the current title on the current step
     * @method
     * @returns {string} - current step title
     */
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zur Gruppe';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Gruppe wurde erfolgreich erstellt!';
      }
    },

    /**
     * get event information for preview based on data attributes and dictionary
     * @method
     * @returns {Array} - array of event information objects
     */
    eventInfos() {
      // iterates over all formData attributes and their titles from dictionary to display them as a preview
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
  z-index: 1000; // z-index
  background-color: white; // background color
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // shadow

}


.v-stepper-window {
  padding-top: 60px;
}
</style>
