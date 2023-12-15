<template>
  <v-stepper v-model="step" alt-labels>
    <v-stepper-header class="fixed-header">
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
      <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form @submit.prevent>
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
                  :rules="dateRules"
                  v-model="infoData.date"
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
                  variant="outlined"
                  type="submit"
                  @click="closeDialog"
              >
                Information teilen
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>
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
  /**
   * list of imported components
   *
   * @type {object}
   */
  components: {UploadImagesStep},
  /**
   * data object of the component
   *
   * @type {function}
   * @returns {object} - initialization data of the component
   */
  data: () => ({
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "location", "community", "date"
    ],

    titleRules: [
      /**
       * checks whether a value exists for the title
       *
       * @param {string} value - the value to be checked
       * @returns {boolean|string} - `true`, if the condition is fulfilled, otherwise the error message
       */
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
      category: 'Infos',
      userId: 1,
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
    /**
     * validates critical information for the information content
     *
     * @returns {number|undefined} - the next step in the stepper or 'undefined' for invalid data
     */
    // critical event data is validated by rules, if all fields are filled in correctly the next page can be reached
    validateDataForm() {
      const isValid = this.validateFields([
        {value: this.infoData.title, rules: this.titleRules},
        {value: this.infoData.community, rules: this.generalRules},
        {value: this.infoData.date, rules: this.dateRules},
        {value: this.infoData.location, rules: this.generalRules},

      ]);
      if (isValid) {
        return this.step++
      }
    },

    /**
     * validates a list of fields based on the rules passed
     *
     * @param {object[]} fields - a list of field objects with value and rules
     * @returns {boolean} - `true`, if all rules are fulfilled, otherwise `false`.
     */
    validateFields(fields) {
      // check every rule on every field
      for (const field of fields) {
        for (const rule of field.rules) {
          const isValid = rule(field.value);
          if (isValid !== true) {
            // if the rule is not fulfilled, display the error message
            return false;
          }
        }
      }
      return true; // ALL rules have been fulfilled? Yes - next page
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
      // the dialog window is ended, the exit-dialog event of the parent is executed, user data/images are transferred
      this.$emit("exit-dialog")
    },
    // the dialog window is closed, the close dialog event of the parent is executed, user data/images are transferred
    closeDialog() {
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.infoData)
    }
  },
  computed: {
    /**
     * current title based on the current step
     *
     * @returns {string} - the title of the current tap step
     */
    currentTitle() {
      // steps of steppers
      switch (this.step) {
        case 1:
          return 'Angaben zur Information';
        case 2:
          return 'Fotos';
        case 3:
          return 'Zusammenfassung';
        default:
          return 'Information wurde erfolgreich geteilt!';
      }
    },

    /**
     * information for the preview of the information content
     *
     * @returns {object[]} - a list of objects with label and value for the preview
     */
    eventInfos() {
      // iterates over all infoData attributes and their titles from dictionary to display them as a preview
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.infoData[attribute];
        eventInfos.push({label: this.dictionary[attribute], value: value});
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
</style>
