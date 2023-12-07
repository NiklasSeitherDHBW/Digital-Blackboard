<template>
  <CustomCard
      class="text-left"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Kontaktieren"
      @action-clicked="showDialogContactInfo=true"
      @editAdClicked="openDialogEditAd"
      :customClick="createShareLink"
      @deleteAd="deleteThisAd"
  >
    <template v-slot:bottomBasicInfos>
      <div v-if="item.category !== 'group'">
        <v-rating
            readonly
            color="#7C868DFF"
            active-color="#eb1b2a"
            density="comfortable"
            class="pt-2"
        >{{ item.liked }}
        </v-rating>
      </div>
    </template>
  </CustomCard>

  <v-dialog
      v-model="showDialogContactInfo"
      transition="dialog-bottom-transition"
      max-width="1200px"
      class="justify-center"
  >
    <ContactCard
        :name="item.name"
        :course="item.subject"
        :phone="item.phone"
        :email="item.email"
        @close-dialog="showDialogContactInfo=false"
    ></ContactCard>
  </v-dialog>

  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
  >
    <EditStudyBuddyDialog
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditStudyBuddyDialog>
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
  <v-snackbar v-model="snackbarShare" :timeout="timeout">
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
</template>

<script>
import CustomCard from "@/components/util/CustomCard.vue";
import ContactCard from "@/components/util/ContactCard.vue";
import EditStudyBuddyDialog from "@/components/studyHub/EditStudyBuddyDialog.vue";
import {deleteAd} from "@/db";

export default {
  components: {EditStudyBuddyDialog, ContactCard, CustomCard},
  props: {
    item: Object,
    action: String,
  },
  data() {
    return {
      snackbarCreate: false,
      snackbarDelete: false,
      snackbarShare: false,
      timeout: 5000,

      showAll: false,
      showDialogImagesFullscreen: false,
      showDialogContactInfo: false,
      showDialogEditAd: false,

      basicInfosKeywords: [
        "price", "subject"
      ],
      extraInfosKeywords: [
        "description", "availability",
      ],

      dictionary: {
        "availability": "Verfügbarkeit",
        "price": "Preis pro Stunde in €",
        "description": "Beschreibung",
        "subject": "Fächer",
      },
    };
  },
  methods: {
    createShareLink() {
      const link = window.location.origin + '/studyhub' + '?card=' + this.item.id + "&selectedCategory=" + this.item.categories;
      navigator.clipboard.writeText(link);
      this.snackbarShare = true;
    },
    closeSnackbar() {
      this.snackbarCreate = false;
      this.snackbarDelete = false;
      this.snackbarShare = false;

    },
    openDialogEditAd() {
      console.log(this.item)
      this.showDialogEditAd = true
    },
    async exitDialogEditAd() {
      this.showDialogEditAd = false;
    },
    async closeDialogEditAd() {
      this.showDialogAddStudyBuddy = false;
      this.snackbarCreate = true;
      this.$emit("itemsChanged")
    },
    deleteThisAd() {
      deleteAd("study-hub", this.item.id);
      this.$emit("itemsChanged")
      this.snackbarDelete = true;
    }
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
};
</script>

<style scoped>
</style>