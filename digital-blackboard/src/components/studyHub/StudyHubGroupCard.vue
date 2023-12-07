<template>
  <CustomCard
      ref="customCard"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Beigetreten' : 'Beitreten'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      @action-clicked="joinGroup(item)"
      :customClick="createShareLink"
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
import EditStudyHubDialog from "@/components/studyHub/EditStudyHubGroup.vue";
import {db, deleteAd} from "@/db";
import {doc, getDoc, setDoc} from "firebase/firestore";

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
      snackbarShare: false,
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
    async joinGroup(item) {
      const docRef = doc(db, "study-hub", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["joined"] = !data["joined"]
      if (data["joined"]) {
        data["members"] = data["members"] + 1
        this.snackbarJoin = true;
      } else {
        data["members"] = data["members"] - 1
        this.snackbarLeft = true;
      }

      await setDoc(docRef, data, {merge: true})

      this.$emit("itemChanged");
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
      deleteAd("study-hub", this.item.id);
      this.snackbarDelete = true;
      this.$emit("itemsChanged")
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
