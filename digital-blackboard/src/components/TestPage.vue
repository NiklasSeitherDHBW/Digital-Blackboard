<template>
  <v-stepper editable alt-labels v-model="step" style="max-width: 60%;">
    <v-stepper-header>
      <v-stepper-item
          title="Angaben zur Wohnung"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          subtitle="Optional"
          title="Fotos des Objektes"
          :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Deine Kontaktdaten"
          :value="3"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window>
        <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
          <span>{{ currentTitle }}</span>
          <v-avatar
              class="ma-2 pa-3"
              color="red"
              size="24"
              v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                  label="Email"
                  placeholder="john@google.com"
              ></v-text-field>
              <span class="text-caption text-grey-darken-1">
            Das ist die Email, welche zur Kontaktaufnahme den Interesenten zur Verfügung gestellt wird!
          </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                  label="Password"
                  type="password"
              ></v-text-field>
              <v-text-field
                  label="Confirm Password"
                  type="password"
              ></v-text-field>
              <span class="text-caption text-grey-darken-1">
            Please enter a password for your account
          </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <v-text-field
                  label="Password"
                  type="password"
              ></v-text-field>
              <v-text-field
                  label="Confirm Password"
                  type="password"
              ></v-text-field>
              <span class="text-caption text-grey-darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
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
            Inserat fertigstellen
          </v-btn>
          <v-btn
              v-if="step === 4"
              color="red"
              variant="flat"
              class="float right"
              @click="isActive.value = false"
          >
            Schließen
          </v-btn>
        </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>


<script>
export default {
  data: () => ({
        step: 1,
      }),

      computed: {
        currentTitle () {
          switch (this.step) {
            case 1: return 'Angaben zur Wohnung'
            case 2: return 'Fotos des Objektes'
            case 3: return 'Deine Kontaktdaten'
            default: return 'Inserat erfolgreich erstellt'
          }
        },
      },
};
</script>



<style>

</style>