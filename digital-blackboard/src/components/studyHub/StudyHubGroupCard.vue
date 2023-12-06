<template>
  <CustomCard
      ref="customCard"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Beigetreten' : 'Beitreten'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      @action-clicked="joinGroup"
      @editAdClicked="openDialogEditAd"
      @deleteAd="deleteThisAd"
  ></CustomCard>
  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
  >
    <EditStudyHubDialog
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditStudyHubDialog>
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

<script>
import CustomCard from "@/components/util/CustomCard.vue";
import EditStudyHubDialog from "@/components/studyHub/EditStudyHubGroup.vue";
import {deleteAd} from "@/db";

export default {
  components: {EditStudyHubDialog, CustomCard },
  props: {
    item: Object,
    action: String,
  },
  data() {
    return {
      snackbarCreate: false,
      snackbarDelete: false,
      timeout: 5000,

      showAll: false,
      showDialogImagesFullscreen: false,
      showDialogEditAd: false,

      basicInfosKeywords: [
          "subject", "members"
      ],

      extraInfosKeywords: [
          "description", "activities"
      ],

      dictionary: {
        members: "Mitglieder",
        activities: "Aktivitäten",
        description: "Beschreibung",
        subject: "Was erwartet dich?",
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
    joinGroup() {
      let tmp_item = this.item;
      tmp_item.joined = !tmp_item.joined;

      this.$emit("itemChanged", this.item, tmp_item);
    },
    openDialogEditAd() {
      console.log(this.item)
      this.showDialogEditAd = true
    },
    async exitDialogEditAd() {
      this.showDialogEditAd = false;
    },
    async closeDialogEditAd() {
      this.showDialogAddStudyHub = false;
      this.snackbarCreate = true;
      this.$emit("itemsChanged")
    },
    deleteThisAd() {
      deleteAd("dual-living", this.item.id);
      this.snackbarDelete= true;
      this.$emit("itemsChanged")
    }
  },
};
</script>

<style scoped>
</style>
