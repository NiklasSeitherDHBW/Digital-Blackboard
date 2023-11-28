<template>
  <v-stepper alt-labels v-model="step" style="width: 80%;">
    <v-stepper-header>
      <v-stepper-item
          title="Angaben zur Wohnung"
          :value="1"
      >
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          subtitle="Optional"
          title="Fotos des Objektes"
          :value="2"
      >

      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Deine Kontaktdaten"
          :value="3"
      >
      </v-stepper-item>

    </v-stepper-header>
    <v-stepper-window>
      <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form @submit.prevent="submit">
            <v-text-field
                v-model="title.value.value"
                :counter="10"
                class="mt-2"
                :error-messages="name.errorMessage.value"
                label="Titel des Inserats"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                v-model="description.value.value"
                :counter="10"
                :error-messages="description.errorMessage.value"
                label="Beschreibung"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                v-model="availability.value.value"
                :counter="10"
                :error-messages="availability.errorMessage.value"
                label="Zeitraum"
                placeholder="TT.MM.JJJJ - TT.MM.JJJJ"
                variant="outlined"
            ></v-text-field>

          <v-text-field
                v-model="location.value.value"
                :counter="6"
                :error-messages="location.errorMessage.value"
                label="Ort"
                placeholder="Mannheim Neuostheim"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                v-model="price.value.value"
                :error-messages="price.errorMessage.value"
                label="Monatliche Miete in €"
                variant="outlined"
            ></v-text-field>

            <v-text-field
                v-model="area.value.value"
                :error-messages="area.errorMessage.value"
                label="Wohnfläche in m²"
                variant="outlined"
            ></v-text-field>

            <v-checkbox
                v-model="furniture.value.value"
                value="mdi-check"
                label="Möbliert"
                type="checkbox"
            ></v-checkbox>

          <v-checkbox-btn
              v-model="enabled"
              label="WG"
              class="pe-2"
          ></v-checkbox-btn>
          <v-combobox
              variant="outlined"
              :disabled="!enabled"
              v-model="community.value.value"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
          ></v-combobox>

          </v-form>
        </v-window-item>

        <v-window-item :value="2">
          <UploadImagesStep></UploadImagesStep>
        </v-window-item>

        <v-window-item :value="3">

          <v-text-field
              v-model="name.value.value"
              :counter="10"
              :error-messages="name.errorMessage.value"
              label="Vor- & Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
          ></v-text-field>

          <v-text-field
              label="Mobil"
              placeholder="+49123456789"
              v-model="mobil.value.value"
              :counter="10"
              :error-messages="mobil.errorMessage.value"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              variant="outlined"
          ></v-text-field>

          <span class="text-caption text-grey-darken-1">
              Das ist die Email, welche zur Kontaktaufnahme den Interesenten zur Verfügung gestellt wird!
          </span>

        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Ihr Inserat wurde erfolgreich erstellt
            </h3>
            <span class="text-caption text-grey">Danke das sie das Digital Blackboard nutzen!</span>
          </div>
          <div>
            <v-card
                class="ma-1"
                title="Angaben zur Wohnung">

              <v-row
                  v-for="item in basicInfos"
                  :key="item.label"
                  no-gutters
              >
                <v-col>
                  <h4>
                    {{ item.label }}
                  </h4>
                </v-col>
                <v-col>
                  <p v-if="item.value.startsWith('mdi-')">
                    <v-icon>{{ item.value }}</v-icon>
                  </p>
                  <p v-else>
                    {{ item.value }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div>
            <v-card
                class="ma-2"
                title="Kontakt angaben">

              <v-row
                  v-for="item in extraInfos"
                  :key="item.label"
                  no-gutters
              >
                <v-col>
                  <h4>
                    {{ item.label }}
                  </h4>
                </v-col>
                <v-col>
                  <p>
                    {{ item.value }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1 && step < 4"
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
            type="submit"
            @click="step++;"
        >
          Nächste
        </v-btn>
        <v-btn
            v-if="step === 3"
            color="red"
            variant="flat"
            class="float right"
            type="submit"
            @click="step++"
        >
          Inserat fertigstellen
        </v-btn>
        <v-btn
            v-if="step === 4"
            color="red"
            variant="flat"
            class="float right"
            @click="closeDialog"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";
import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
  validationSchema: {
  name (value) {
  if (value?.length >= 2) return true

  return 'Name needs to be at least 2 characters.'
},
  mobil (value) {
  if (value?.length > 9 && /[0-9-]+/.test(value)) return true

  return 'Phone number needs to be at least 9 digits.'
},
  email (value) {
  if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

  return 'Must be a valid e-mail.'
},
},
  })

  const description = useField('description')
  const community = useField('community')
  const title = useField('title')
  const availability = useField('availability')
  const location = useField('location')
  const area = useField('area')
  const furniture = useField('furniture')
  const price = useField('price')

  const name = useField('name')
  const mobil = useField('mobil')
  const email = useField('email')

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>

<script>
export default {
  data: () => ({
    step: 1,
    enabled: false,
    valid: true,

    basicInfosKeywords: [
      "title", "description", "availability", "location", "price", "area", "furniture", "community"
    ],
    extraInfosKeywords: [
      "name", "mobil", "email"
    ],

    dictionary: {
      "title": "Titel:",
      "availability": "Zeitraum:",
      "area": "Wohnfläche in m²:",
      "price": "Warmmiete in €:",
      "description": "Beschreibung:",
      "location": "Ort / Stadtteil:",
      "furniture": "Möbiliert:",
      "community": "WG Zimmer:",
      "name": "Vor- & Nachname:",
      "mobil": "Handynummer:",
      "email": "E-Mail:",
    },
  }),

    closeDialog() {
      this.$emit('close-dialog');
    },

    computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return 'Angaben zur Wohnung'
          case 2:
            return 'Fotos des Objektes'
          case 3:
            return 'Deine Kontaktdaten'
          default:
            return 'Inserat erfolgreich erstellt'
        }
      },
      basicInfos() {
        let basicInfos = [];
        for (const attribute of this.basicInfosKeywords) {
          let value = this.formData[attribute].value;
          basicInfos.push({ label: this.dictionary[attribute], value: value });
        }
        console.log(basicInfos)
        return basicInfos;
      },
      extraInfos() {
        let extraInfos = [];
        for (const attribute of this.extraInfosKeywords) {
          let value = this.contactData[attribute].value;
          extraInfos.push({ label: this.dictionary[attribute], value: value });
        }
        console.log(extraInfos)
        return extraInfos;
      }

    },
};
</script>

<style>

</style>