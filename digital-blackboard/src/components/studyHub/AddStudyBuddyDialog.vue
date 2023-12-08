<template>
  <v-stepper v-model="step" alt-labels>
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zum Buddy'"
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
          :title="mobile ? '' : 'Kontaktdaten'"
          :value="3"
          :icon="mobile ? 'mdi-account-box' : ''"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Zusammenfassung'"
          :icon="mobile ? 'mdi-checkbox-marked-circle-outline' : ''"
          :value="4"
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
                label="Titel des Buddys *"
                variant="outlined"
                class="mt-2"
                maxlength="50"
                v-model="buddyData.title"
                :rules="titleRules"
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
                label="Preis pro Stunde *"
                prefix="€"
                variant="outlined"
                v-model="buddyData.price"
                :rules="numRules"
            ></v-text-field>

            <v-text-field
                label="Fächer *"
                variant="outlined"
                :rules="generalRules"
                v-model="buddyData.subject"
            ></v-text-field>

            <v-text-field
                label="Verfügbarkeit"
                placeholder="Nach Absprache"
                variant="outlined"
                v-model="buddyData.availability"
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
          <UploadImagesStep
              ref="uploadImagesForm"
          ></UploadImagesStep>
          <v-card-actions>
            <v-btn variant="outlined" @click="step--">Zurück</v-btn>

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
          <v-form @submit.prevent>
          <v-text-field
              label="Vor-/Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
              :rules="nameRules"
              v-model="contactData.name"
          ></v-text-field>

          <v-text-field
              label="Telefon"
              placeholder="+49123456789"
              variant="outlined"
              type="tel"
              :rules="phoneRules"
              v-model="contactData.phone"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              variant="outlined"
              type="email"
              :rules="emailRules"
              v-model="contactData.email"
          ></v-text-field>
          <span class="text-caption text-grey-darken-1">
              Diese Daten werden Interessenten zur Verfügung gestellt um Kontakt aufzunehmen.
        </span>
          <v-card-actions>
            <v-btn variant="outlined" @click="step--">Zurück</v-btn>

            <v-spacer></v-spacer>
            <!-- only visible as long as you are on the 3rd page, validates the input made on page 3 -->
            <v-btn
                color="#eb1b2a"
                class="float right"
                type="submit"
                variant="outlined"
                @click="validateContactForm()"
            >
              Zusammenfassung
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-window-item>

        <v-window-item :value="4">
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

            <v-divider style="width: 85%; margin: 10px;"></v-divider>

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

          <v-card-actions>
            <v-btn variant="outlined" @click="step--">Zurück</v-btn>

            <v-spacer></v-spacer>
            <v-btn
                color="#eb1b2a"
                class="float right"
                variant="outlined"
                type="submit"
                @click="closeDialog"
            >
              Inserat teilen
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
/**
 * JavaScript code to control the buddy ad form.
 * @module UseDisplay
 * @type {Object}
 * @script setup
 */
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
/**
 * This section imports the `UploadImagesStep` component
 * @module UploadImagesStep
 * @type {Object}
 */

// component that is responsible for uploading image
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

/**
 * the exported Vue.js component that controls the behavior and display of the buddy creation.
 * @namespace BuddyErstellung
 * @type {Object}
 * @property {Object} components - a collection of components that are used in this component.
 * @property {Object} data - a function that provides the initial data for the component.
 * @property {Object} methods - a collection of methods used by the component.
 * @property {Object} computed - calculated properties based on the state of the data.
 */
export default {
  components: {UploadImagesStep},
  // the initial data for the component is defined, including the current step in the stepper, the selected images and information about the "Buddy" event.
  data: () => ({
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "price", "subject", "availability"
    ],

    infosContact: [
      "name", "phone", "email"
    ],
    // rules to validate the input
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

    nameRules : [
      (value) => value ? true : 'Bitte gebe einen Vor- und Nachnamen an!',
      (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
    ],
    phoneRules : [
      (value) => value ? true : 'Bitte gebe eine Telefonnummer an!',
      // rule for forcing '+' and numeric values of minimum length 5
      (value) => /^\+?\d+$/.test(value) ? true : 'Die Telefonnummer darf nur Zahlen und das Pluszeichen enthalten!',
      (value) => value.length >= 5 ? true : 'Die Telefonnummer muss mindestens 5 Zeichen lang sein!',
    ],
    emailRules : [
      (value) => value ? true : 'Bitte gebe eine E-Mail-Adresse an!',
      // rule to force a valid e-mail address: aaa@bbb.ccc
      (value) => /\S+@\S+\.\S+/.test(value) ? true : 'Die E-Mail-Adresse ist ungültig!',
    ],

    // data structures are also defined for event information (buddyData) and contact information (contactData)
    buddyData: {
      title: '',
      description: '',
      price: '',
      subject: '',
      availability: '',
      category: 'buddy',
      rating: '',
      userId: 1,
    },

    contactData: {
      name: '',
      phone: '',
      email: '',
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "price": "Preis pro Stunde in €:",
      "subject": "Fächer:",
      "availability": "Verfügbarkeit:",
      "name": "Vor-/Nachname",
      "phone": "Telefon:",
      "email": "E-Mail",
    },
  }),

  // There are various methods for validating form data, for uploading images and for the stepper controls
  methods: {
    /**
     * validates the data in the buddy form and switches to the next page of the stepper if the data is valid.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    validateDataForm() {
      // critical data is validated by rules, if all fields are filled in correctly the next page can be reached
      const isValid = this.validateFields([
        { value: this.buddyData.title, rules: this.titleRules },
        { value: this.buddyData.subject, rules: this.generalRules },
        { value: this.buddyData.price, rules: this.numRules },
      ]);  console.log(isValid)
      if (isValid) {
        return this.step++
      }
    },

    /**
     * validates the contact data in the form and switches to the next page of the stepper if the data is valid.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    validateContactForm() {
      const isValid = this.validateFields([
        { value: this.contactData.name, rules: this.nameRules },
        { value: this.contactData.email, rules: this.emailRules },
      ]);
      if (isValid) {
        return this.step++
      }
    },

    /**
     * validates the fields based on the specified rules.
     * @function
     * @memberOf BuddyErstellung.methods
     * @param {Object[]} fields - an array of objects with the values and rules for validation.
     * @returns {boolean} - returns `true` if all fields pass the validation, otherwise `false`.
     */
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
      return true; // ALL rules have been fulfilled? Yes - next page
    },

    /**
     * handles the file change in the upload form and creates thumbnails for selected images.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    onFileChange() {
      this.selectedImages = this.selectedImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    },

    /**
     * deletes the selected image based on the index.
     * @function
     * @memberOf BuddyErstellung.methods
     * @param {number} index - the index of the image to be deleted.
     */
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },

    /**
     * uploads the selected images.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    uploadImages() {
      this.selectedImages.forEach((image) => {
        if (image.file instanceof Blob) {
          console.log('Uploading:', image.url);
        }
      });
    },

    /**
     * ends the dialog box and transfers user data and images to the parent element.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    exitDialog() {
      // the dialog window is ended, the exit-dialog event of the parent is executed, user data/images are transferred
      this.$emit("exit-dialog")
    },

    /**
     * closes the dialog box and transfers user data, images and contact data to the parent element.
     * @function
     * @memberOf BuddyErstellung.methods
     */
    closeDialog() {
      // the dialog window is closed, the close-dialog event of the parent is executed, user data/images are transferred
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.buddyData, this.contactData)
    }
  },
  computed: {
    /**
     * returns the current title for the step of the stepper. There are calculated properties that are used for the dynamic display in the stepper
     * @function
     * @memberOf BuddyErstellung.computed
     * @returns {string} - the current title for the tap step.
     */
    currentTitle () {
      // steps of the steppers
      switch (this.step) {
        case 1: return 'Informationsangaben';
        case 2: return 'Fotos';
        case 3: return 'Kontaktdaten';
        case 4: return 'Zusammenfassung';
        default: return 'Information wurde erfolgreich geteilt!';
      }
    },

    /**
     * returns a list of event information that is used for the preview.
     * @function
     * @memberOf BuddyErstellung.computed
     * @returns {Object[]} - Eine Liste von Objekten mit Label- und Wert-Paaren für Ereignisinformationen.
     */
    eventInfos() {
      // iterates over all buddyData attributes and their titles from dictionary to display them as a preview
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.buddyData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
    },

    /**
     * returns a list of additional contact information used for the preview.
     * @function
     * @memberOf BuddyErstellung.computed
     * @returns {Object[]} - a list of objects with label and value pairs for contact information.
     */
    extraInfos() {
      // iterates over all contactData attributes and their titles from dictionary to display them as a preview
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
