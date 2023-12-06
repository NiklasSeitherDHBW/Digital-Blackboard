<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      class="text-left"
      action="Kontaktieren"
      @action-clicked="showDialogContactInfo=true"
      @editAdClicked="openDialogEditAd"
      @deleteAd="deleteAdClicked"
  ></CustomCard>

  <v-dialog
      v-model="showDialogContactInfo"
      transition="dialog-bottom-transition"
      max-width="1200px"
      class="justify-center"
  >
    <ContactCard
        :avatarSrc="item.images[0]"
        :name="item.name"
        :phone="item.phone"
        :email="item.email"
        @close-dialog="showDialogContactInfo=false"
    ></ContactCard>
  </v-dialog>

  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
      max-width="1200px"
  >
    <EditAppartmentDialog
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditAppartmentDialog>
  </v-dialog>
  <v-snackbar v-model="snackbarCreate" :timeout="timeout">
    Ihr Inserat wurde erfolgreich geteilt!
    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          float-right
          size="small"
          class="mr-1"
          @click="closeSnackbar"
      >
        Schließen
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar v-model="snackbarDelete" :timeout="timeout">
    Ihr Inserat wurde erfolgreich gelöscht!
    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          float-right
          size="small"
          class="mr-1"
          @click="closeSnackbar"
      >
        Schließen
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue"
import ContactCard from "@/components/util/ContactCard.vue";
import EditAppartmentDialog from "@/components/dualLiving/EditAppartmentDialog.vue";
</script>

<script>
import {deleteAd} from "@/db.js"
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      snackbarCreate: false,
      snackbarDelete: false,
      timeout: 5000,

      showDialogContactInfo: false,
      showDialogEditAd: false,

      basicInfosKeywords: [
        "availability", "area", "rooms", "price"
      ],
      extraInfosKeywords: [
        "description", "location", "furniture", "community"
      ],
      dictionary: {
        "availability": "Zeitraum",
        "area": "Wohnfläche in m²",
        "rooms": "Zimmer",
        "price": "monatliche Miete in €",
        "description": "Beschreibung",
        "location": "Ort / Stadtteil",
        "furniture": "möbliert",
        "community": "WG-Zimmer",
      },
    };
  },
  computed: {
    basicInfos() {
      return this.basicInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },
    extraInfos() {
      return this.extraInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },
  },
  methods: {
    closeSnackbar() {
      this.snackbarCreate = false;
      this.snackbarDelete = false;
    },
    openDialogEditAd() {
      console.log(this.item)
      this.showDialogEditAd = true
    },
    async exitDialogEditAd() {
      this.showDialogEditAd = false
    },
    async closeDialogEditAd() {
      this.showDialogEditAd = false
      this.snackbarCreate = true;

      this.$emit("itemsChanged")
    },
    deleteAdClicked() {
      deleteAd("dual-living", this.item.id);
      this.$emit("itemsChanged")
      this.snackbarDelete = true;
    }
  }
};
</script>

<style>

</style>
