<template>
  <v-stepper v-model="step" alt-labels>
    <!-- header of stepper with step descriptions -->
    <v-stepper-header class="fixed-header">
      <!-- step indicators for each section -->
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zu der Wohnung'"
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

    <!-- main window of stepper with different views  -->
    <v-stepper-window v-model="step">
      <!-- step 1: details of the apartment -->
      <v-card-title class="text-h6">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window-item :value="1">
        <v-form @submit.prevent>
          <!-- form for real estate information -->
          <!-- ... form fields for title, description, etc. ... -->
          <v-text-field
              class="mt-2"
              label="Titel des Inserats *"
              variant="outlined"
              v-model="formData.title"
              :rules="titleRules"
              maxlength="60"
              counter
              required
          ></v-text-field>

          <v-textarea
              label="Beschreibung"
              variant="outlined"
              v-model="formData.description"
              maxlength="300"
              counter
          ></v-textarea>

          <v-row>
            <v-col :cols="mobile ? '12' : '6'">
              <v-text-field
                  label="Von *"
                  placeholder="TT.MM.JJJJ"
                  type="date"
                  :min="new Date().toISOString().split('T')[0]"
                  :max="formData.availableTill"
                  v-model="formData.availableFrom"
                  :rules="dateRules"
                  variant="outlined"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
              <v-text-field
                  label="Bis"
                  placeholder="TT.MM.JJJJ"
                  type="date"
                  :min="formData.availableFrom"
                  v-model="formData.availableTill"
                  :rules="dateRules"
                  variant="outlined"
              >
              </v-text-field>
            </v-col>
          </v-row>


          <v-text-field
              label="Ort *"
              placeholder="Mannheim Neuostheim"
              variant="outlined"
              v-model="formData.location"
              :rules="generalRules"
              required
          ></v-text-field>

          <v-text-field
              label="monatliche Miete *"
              variant="outlined"
              prefix="€"
              v-model="formData.price"
              :rules="numRules"
              required
          ></v-text-field>

          <v-text-field
              label="Wohnfläche *"
              variant="outlined"
              prefix="m²"
              v-model="formData.area"
              :rules="numRules"
              required
          ></v-text-field>

          <v-text-field
              label="Anzahl Zimmer *"
              variant="outlined"
              v-model="formData.rooms"
              :rules="numRules"
              required
          ></v-text-field>

          <v-checkbox
              v-model="formData.furniture"
              label="möbliert"
          ></v-checkbox>

          <v-checkbox
              v-model="formData.community"
              label="WG"
          ></v-checkbox>

          <v-select
              v-if="formData.community"
              :rules="generalRules"
              required
              v-model="formData.selectedGender"
              variant="outlined"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
              label="bevorzugtes Geschlecht *"
          ></v-select>

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

      <!-- step 2: photos of the object -->
      <v-window-item :value="2">
        <!-- component for uploading images -->
        <UploadImagesStep ref="uploadImagesForm"></UploadImagesStep>
        <!-- navigations-buttons -->
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

      <!-- step 3: contact data -->
      <v-window-item :value="3">
        <v-form @submit.prevent>
          <!-- form for contact details -->
          <!-- form fields for name, telephone, e-mail -->
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
          <span
              class="text-caption text-grey-darken-1"
          >
              Diese Daten werden Interessenten zur Verfügung gestellt um Kontakt aufzunehmen.
        </span>
          <v-card-actions>
            <v-btn
                variant="outlined"
                @click="step--"
            >
              Zurück
            </v-btn>

            <v-spacer></v-spacer>
            <!--Nur sichtbar solange man sich auf der 3. Seite befindet, validiert den auf Seite 3 getätigten Input -->
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

      <!-- step 4: summary -->
      <v-window-item :value="4">
        <v-container class="pa-4 text-center">
          <!-- summary of the data entered -->
          <!-- display of real estate details and contact data -->
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
          >
            Danke, dass Sie das "Digital Blackboard" nutzen!
          </span>
        </v-container>

        <!-- navigations-buttons -->
        <v-card class="ma-1" variant="outlined">
          <v-card-title>Immobilienangaben</v-card-title>
          <v-card-text>
            <v-row
                v-for="item in basicInfos"
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
                <p
                    v-if="item && typeof item.value === 'boolean'"
                >
                  <v-icon>{{ item.value ? 'mdi-check' : 'mdi-close' }}</v-icon>
                </p>

                <p
                    v-else
                >
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
          <!-- only visible as long as you are on the last page, transfers the input data -->
          <v-btn color="#eb1b2a" class="float right" variant="outlined" type="submit" @click="closeDialog">
            Inserat teilen
          </v-btn>
        </v-card-actions>
      </v-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay()
</script>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

/**
 * components to show and update advertisements
 * @typedef {Object} FormData - all components to create advertisements
 * @property {string} title - title of the advertisement
 * @property {string} description - description of the advertisement
 * @property {string} availableFrom - available from
 * @property {string} availableTill - available until
 * @property {string} location - location of the advertisement
 * @property {string} price - monthly rent
 * @property {string} area - living space
 * @property {boolean} furniture - furnished
 * @property {boolean} community - shared room
 * @property {string} rooms - number of rooms
 * @property {string} selectedGender - if shared room = preferred gender
 * @property {string[]} images - uploaded pictures
 * @property {string} date_created - creation date
 * @property {number} userId - User-ID
 */

/**
 * @typedef {Object} ContactData - contact data of the advertisement
 * @property {string} name - first and last name of the contact
 * @property {string} phone - contact telephone number
 * @property {string} email - e-mail address of the contact
 */

/**
 * @typedef {Object} InfoItem - information
 * @property {string} label - label for information
 * @property {string|boolean} value - value of Information
 */

/**
 * component for creating a real estate advertisement.
 * @component
 */

export default {
  components: {
    UploadImagesStep
  },
  data() {
    return {
      // initialization of data for the stepper and the form data
      step: 1,
      selectedGender: null,
      isCommunityLiving: false,
      selectedDate: null,
      // list of real estate information
      infosAppartment: [
        "title", "description", "availableFrom", "availableTill", "location", "price", "rooms", "area", "furniture", "community", "selectedGender",
      ],
      // list of contact data
      infosContact: [
        "name", "phone", "email"
      ],
      // rules for validation the formular fields
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
        // rule for forcing numerical values
        (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
      ],

      nameRules: [
        (value) => value ? true : 'Bitte gebe einen Vor- und Nachnamen an!',
        (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
      ],
      phoneRules: [
        (value) => value ? true : 'Bitte gebe eine Telefonnummer an!',
        // rule for forcing numerical values and '+'
        (value) => /^\+?\d+$/.test(value) ? true : 'Die Telefonnummer darf nur Zahlen und das Pluszeichen enthalten!',
        (value) => value.length >= 5 ? true : 'Die Telefonnummer muss mindestens 5 Zeichen lang sein!',
      ],
      emailRules: [
        (value) => value ? true : 'Bitte gebe eine E-Mail-Adresse an!',
        // rule for forcing a  valid e-mail address: aaa@bbb.ccc
        (value) => /\S+@\S+\.\S+/.test(value) ? true : 'Die E-Mail-Adresse ist ungültig!',
      ],

      // data structure for real estate information
      formData: {
        title: '',
        description: '',
        availableFrom: '',
        availableTill: '',
        location: '',
        price: '',
        area: '',
        furniture: false,
        community: false,
        rooms: '',
        selectedGender: '',
        images: [],
        date_created: '',
        userId: 1,
      },

      // data structure for contact data
      contactData: {
        name: '',
        phone: '',
        email: '',
      },

      // definition of formular elements
      dictionary: {
        "title": "Titel:",
        "availableFrom": "Von:",
        "availableTill": "Bis:",
        "area": "Wohnfläche in m²:",
        "price": "Warmmiete in €:",
        "description": "Beschreibung:",
        "location": "Ort / Stadtteil:",
        "furniture": "möbiliert:",
        "community": "WG-Zimmer:",
        "selectedGender": "WG-Typ:",
        "rooms": 'Zimmer:',

        "name": "Vor-/Nachname:",
        "phone": "Handynummer:",
        "email": "E-Mail:",
      },
    };
  },
  methods: {
    /**
     * validates the form fields for real estate information and navigation in the stepper
     * @returns {void}
     */
    validateDataForm() {
      let validation_list = [
        {value: this.formData.title, rules: this.titleRules},
        {value: this.formData.location, rules: this.generalRules},
        {value: this.formData.availableFrom, rules: this.dateRules},
        {value: this.formData.availableTill, rules: this.dateRules},
        {value: this.formData.price, rules: this.numRules},
        {value: this.formData.area, rules: this.numRules},
        {value: this.formData.rooms, rules: this.numRules},
      ]

      if (this.formData.community) {
        validation_list.push({value: this.formData.selectedGender, rules: this.generalRules});
      }

      // critical values are validated and checked by rules
      // if all fields are filled in correctly, the next page can be reached
      const isValid = this.validateFields(validation_list);

      if (isValid) {
        // going to the next page if all fields are correctly filled
        return this.step++
      }
    },
    /**
     * validates the form fields for contact data.
     * @returns {void}
     */
    validateContactForm() {
      const isValid = this.validateFields([
        {value: this.contactData.name, rules: this.nameRules},
        {value: this.contactData.email, rules: this.emailRules},
      ]);
      if (isValid) {
        return this.step++
      }
    },
    /**
     * validates a list of form fields based on rules
     * @param {Object[]} fields - list of fields to be validated
     * @param {string} fields[].value - value of formular field
     * @param {function} fields[].rules - validation rules for the field
     * @returns {boolean} - `true`if all fields are valid, otherwise  `false`
     */
    validateFields(fields) {
      // check every rule on every field
      for (const field of fields) {
        for (const rule of field.rules) {
          const isValid = rule(field.value);
          if (isValid !== true) {
            // if rule is not fulfilled, display the error message
            console.error(isValid);
            return false;
          }
        }
      }
      return true; // ALL rules have been fulfilled? Yes - go to the next page
    },
    /**
     * ends the dialog and returns the entered data
     * @returns {void}
     */

    exitDialog() {
      // dialog window is ended, the exit-dialog event of the parent is executed, user data/images are transferred
      this.$emit("exit-dialog")
    },

    /**
     * closes the dialog and returns the entered data
     * @returns {void}
     */

    closeDialog() {
      // // dialog window is closed, the close-dialog event of the parent is executed, user data/images are already transferred
      this.$emit("close-dialog", this.formData, this.$refs.uploadImagesForm.imagePreviews, this.contactData)
    },
  },
  computed: {
    // calculated properties for dynamic display in the stepper
    currentTitle() {
      // steps of the stepper
      switch (this.step) {
        case 1:
          return "Angaben zu der Wohnung";
        case 2:
          return "Fotos des Objektes";
        case 3:
          return "Deine Kontaktdaten";
        default:
          return "Inserat erstellt";
      }
    },
    basicInfos() {
      // iterates over all formData attributes and their titles from dictionary to display them as a preview
      let basicInfos = [];
      for (const attribute of this.infosAppartment) {
        let value = this.formData[attribute];
        basicInfos.push({label: this.dictionary[attribute], value: value});
      }
      return basicInfos;
    },
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
  watch: {
    // monitoring changes in isCommunityLiving
    isCommunityLiving(value) {
      // clear the selection if the community living checkbox is unchecked
      if (!value) {
        this.formData.selectedGender = "";
      }
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
