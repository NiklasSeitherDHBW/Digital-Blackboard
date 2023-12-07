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
      @deleteAd="showDialogConfirm=true"

  >
    <template v-slot:bottomBasicInfos>
      <div v-if="item.category !== 'group'">
        <v-rating
            readonly
            color="#7C868DFF"
            active-color="#eb1b2a"
            density="comfortable"
            class="pt-2"
            :model-value="item.rating"
        >
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

  <v-dialog
      v-model="showDialogConfirm"
      transition="dialog-bottom-transition"
      class="justify-center"
      max-width="500px"
  >
    <ConfirmDialog
        :title="item.title"
        @confirmedDeletion="deleteAdClicked"
        @cancelDeletion="exitDialogConfirm"
    ></ConfirmDialog>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ snackbarText }}
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
import CustomCard from "@/components/util/CustomCard.vue";
import EditStudyBuddyDialog from "@/components/studyHub/EditStudyBuddyDialog.vue";
import ConfirmDialog from "@/components/util/ConfirmDialog.vue";
</script>

<script>
import {deleteAd} from "@/db";
export default {
  props: {
    item: Object,
    action: String,
  },
  data() {
    return {
      snackbarText: "",
      snackbar: false,
      timeout: 3000,

      showAll: false,
      showDialogConfirm: false,
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
    /**
     * Is the custom link share function for StudyHub, do to different categories
     * the link consists of the base URL, the adType, the items Id and their category within the adType
     * The Link is copied to the User Clipboard
     *
     */
    createShareLink() {
      const link = window.location.origin + '/studyhub' + '?card=' + this.item.id + "&selectedCategory=" + this.item.categories;
      navigator.clipboard.writeText(link);
      // The Snackbar is assigned a special Text and then called
      this.snackbarText = "Ihr Inserat wurde erfolgreich geteilt!"
      this.snackbar = true;
    },

    closeSnackbar() {
      this.snackbar = false;
    },

    openDialogEditAd() {
      this.showDialogEditAd = true
    },

    async exitDialogEditAd() {
      this.showDialogEditAd = false;
    },

    async closeDialogEditAd() {
      this.showDialogAddStudyBuddy = false;
      this.snackbarText = "Ihr Inserat wurde erfolgreich erstellt!"
      this.snackbar = true;
      this.$emit("itemsChanged")
    },

    async exitDialogConfirm() {
      this.showDialogConfirm = false;
    },

    async deleteAdClicked() {
      this.showDialogConfirm = false;
      await deleteAd("study-hub", this.item.id)
      this.snackbarText = "Ihr Inserat wurde erfolgreich gelöscht!"
      this.snackbar = true;
      this.$emit("itemsChanged")
    },
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