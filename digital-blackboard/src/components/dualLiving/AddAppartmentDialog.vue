<template>
  <v-stepper
      v-model="step"
      alt-labels
  >
    <v-stepper-header>
      <v-stepper-item
          title="Angaben zu der Wohnung"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Fotos des Objektes"
          subtitle="optional"
          :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Deine Kontaktdaten"
          :value="3"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Zusammenfassung"
          :value="4"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window
        v-model="step"
    >
      <v-card-title
          class="text-h6"
      >
        <span>
          {{ currentTitle }}
        </span>
      </v-card-title>

      <v-window-item
          :value="1"
      >
        <v-form
            @submit.prevent
        >
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

          <v-text-field
              label="Von"
              placeholder="TT.MM.JJJJ *"
              type="date"
              v-model="formData.availabelFrom"
              :max="formData.availabelTill"
              variant="outlined"
              required
          ></v-text-field>

          <v-text-field
              label="Bis"
              placeholder="TT.MM.JJJJ"
              type="date"
              :min="formData.availabelFrom"
              v-model="formData.availabelTill"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Ort *"
              placeholder="Mannheim Neuostheim"
              variant="outlined"
              :rules="generalRules"
              v-model="formData.location"
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
              v-model="formData.selectedGender"
              variant="outlined"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
              label="bevorzugtes Geschlecht"
          ></v-select>
        </v-form>
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
        <v-form
            ref="form"
        >
          <v-text-field
              label="Vor-/Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
              :rules="nameRules"
              v-model="contactData.name"
          ></v-text-field>

          <v-text-field
              label="Telefon *"
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
        </v-form>
        <span
            class="text-caption text-grey-darken-1"
        >
              Diese E-Mail steht Interessenten zur Verfügung, um Kontakt aufzunehmen.
        </span>

      </v-window-item>

      <v-window-item
          :value="4"
      >
        <v-container
            class="pa-4 text-center"
        >
          <v-img
              class="mb-4"
              contain
              height="128"
              src="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">
            Ihr Inserat wurde erfolgreich erstellt!
          </h3>
          <span
              class="text-caption text-grey"
          >
            Danke, dass Sie das "Digital Blackboard" nutzen!
          </span>
        </v-container>

        <v-card
            class="ma-1"
            variant="outlined"
        >
          <v-card-title>Immobilienangaben</v-card-title>

          <v-card-text>
            <!-- Alle Elemente, die in den basicInfos enthalten sind, werden in einer Liste zusammengefasst (Preview) -->
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
                <!--Der Datentyp von furniture und community sind true/false, entsprechend wird ein check-/ close-symbol eingetragen-->
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

          <v-divider
              style="width: 85%; margin: 10px;"
          ></v-divider>

          <v-card-title>Kontaktdaten</v-card-title>

          <v-card-text>
            <!-- Alle Elemente, die in den extraInfos enthalten sind, werden in einer Liste zusammengefasst (Preview) -->
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
    </v-stepper-window>

    <v-card-actions>
      <v-btn
          variant="text"
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
          @click="validateDataForm"
      >
        Inserat fertigstellen
      </v-btn>
      <!--Nur sichtbar solange man sich in den ersten 2 Seiten befindet -->
      <v-btn
          v-if="step === 2"
          color="red"
          class="float right"
          type="submit"
          @click="moveToNextStep"
      >
        Nächste
      </v-btn>
      <!--Nur sichtbar solange man sich auf der 3. Seite befindet -->
      <v-btn
          v-if="step === 3"
          color="red"
          class="float right"
          type="submit"
          @click="validateContactForm"
      >
        Inserat fertigstellen
      </v-btn>
      <!--Nur sichtbar solange man sich auf der letzten Seite befindet -->
      <v-btn
          v-if="step === 4"
          color="red"
          class="float right"
          @click="closeDialog()"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-stepper>
</template>


<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {
    UploadImagesStep
  },
  data() {
    return {
      step: 1,
      selectedGender: null,
      isCommunityLiving: false,
      selectedDate: null,

      titleRules: [
          (value) => value ? true : 'Bitte gebe einen Titel für dein Inserat an!',
          (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
      ],
      generalRules: [
          (value) => value ? true : 'Bitte gebe weitere Informationen an!'
      ],
      numRules: [
          (value) => value ? true : 'Bitte gebe weitere Informationen an!',
          (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
      ],

      nameRules : [
          (value) => value ? true : 'Bitte gebe einen Vor- und Nachnamen an!',
          (value) => value.length >= 5 ? true : 'Der Name muss mindestens 5 Zeichen lang sein!',
      ],
      phoneRules : [
        (value) => value ? true : 'Bitte gebe eine Telefonnummer an!',
        (value) => /^\+?\d+$/.test(value) ? true : 'Die Telefonnummer darf nur Zahlen und das Pluszeichen enthalten!',
        (value) => value.length >= 5 ? true : 'Die Telefonnummer muss mindestens 5 Zeichen lang sein!',
      ],
      emailRules : [
        (value) => value ? true : 'Bitte gebe eine E-Mail-Adresse an!',
        (value) => /\S+@\S+\.\S+/.test(value) ? true : 'Die E-Mail-Adresse ist ungültig!',
      ],

      // Liste aller anzuzeigenden Daten über die Immobilie -> basicInfos
      infosAppartment: [
        "title", "description", "availableFrom", "availableTill", "location", "price", "area", "furniture", "community", "selectedGender",
      ],

      // Liste aller anzuzeigenden Daten über die Kontaktperson -> extraInfos
      infosContact: [
        "name", "phone", "email"
      ],

      // Form für alle eingetragenen Daten über die Immobilie
      formData: {
        title: '',
        description: '',
        availableFrom: '',
        availableTill: '',
        location: '',
        price: '',
        area: '',
        rooms: '',
        furniture: false,
        community: false,
        selectedGender: '',
        images: [],
        date_created: '',
      },
      // Form für alle eingetragenen Daten über die Kontaktperson
      contactData: {
        name: '',
        phone: '',
        email: '',
      },

      // Dictionary für die "Titel" der in den Previews zu zeigenden Informationen
      dictionary: {
        "title": "Titel:",
        "availableFrom": "Von:",
        "availableTill": "Bis:",
        "area": "Wohnfläche in m²:",
        "rooms": "Zimmer:",
        "price": "Warmmiete in €:",
        "description": "Beschreibung:",
        "location": "Ort / Stadtteil:",
        "furniture": "möbiliert:",
        "community": "WG-Zimmer:",
        "selectedGender": "WG-Typ:",

        "name": "Vor-/Nachname:",
        "phone": "Handynummer:",
        "email": "E-Mail:",
      },
    };
  },
  // zum nächsten Step im Stepper springen
  methods: {
    validateDataForm() {
      const isValid = this.validateFields([
        { value: this.formData.title, rules: this.titleRules },
        { value: this.formData.availableFrom, rules: this.generalRules },
        { value: this.formData.price, rules: this.numRules },
        { value: this.formData.area, rules: this.numRules },
        { value: this.formData.rooms, rules: this.numRules },
      ]);
      if (isValid) {
        return this.step++
      }
    },

    validateContactForm() {
      const isValid = this.validateFields([
      { value: this.contactData.name, rules: this.nameRules },
      { value: this.contactData.phone, rules: this.phoneRules },
      { value: this.contactData.email, rules: this.emailRules },
    ]);
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

    moveToNextStep() {
      this.step++
    },

    closeDialog() {
      this.$emit("close-dialog", this.formData, this.$refs.uploadImagesForm.imagePreviews, this.contactData)
    },
  },
  computed: {
    //anzuzeigende Titel der einzelnen Stepper-schritte
    currentTitle() {
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
    //iterieren, durch alle Informationen über die Immobilie aus infosAppartment, um die Entsprechenden Titel mit Wert als Preview anzuzeigen
    basicInfos() {
      let basicInfos = [];
      for (const attribute of this.infosAppartment) {
        let value = this.formData[attribute];
        basicInfos.push({label: this.dictionary[attribute], value: value});
      }
      return basicInfos;
    },
    //iterieren, durch alle Informationen über die Kontaktperson aus infosContact, um die Entsprechenden Titel mit Wert als Preview anzuzeigen
    extraInfos() {
      let extraInfos = [];
      for (const attribute of this.infosContact) {
        let value = this.contactData[attribute];
        extraInfos.push({label: this.dictionary[attribute], value: value});
      }
      return extraInfos;
    },
  },
  watch: {
    isCommunityLiving(value) {
      //Wenn die Checkbox nicht mehr ausgewählt ist, wird der ausgewählte inhalt gelöscht
      if (!value) {
        this.formData.selectedGender = "";
      }
    },
  },
};
</script>