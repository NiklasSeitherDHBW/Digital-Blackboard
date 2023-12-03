<template>
  <CustomCard
      class="text-left"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Kontaktieren"
      @action-clicked="showDialogContactInfo=true"
  ></CustomCard>

  <v-dialog
      v-model="showDialogContactInfo"
      transition="dialog-bottom-transition"
      max-width="1200px"
      class="justify-center"
  >
    <ContactCard
        :name="item.title"
        :course="item.subject"
        :phone="item.phone"
        :email="item.email"
        @close-dialog="showDialogContactInfo=false"
    ></ContactCard>
  </v-dialog>
</template>

<script>
import CustomCard from "@/components/util/CustomCard.vue";
import ContactCard from "@/components/util/ContactCard.vue";

export default {
  components: {ContactCard, CustomCard},
  props: {
    item: Object,
    action: String,
    },
  data() {
    return {
      showAll: false,
      showDialogImagesFullscreen: false,
      showDialogContactInfo: false,

      basicInfosKeywords: [
        "price", "subject"
      ],
      extraInfosKeywords: [
        "description", "availability"
      ],
      dictionary: {
        "availability": "Verfügbarkeit",
        "price": "Preis pro stunde in €",
        "description": "Beschreibung",
        "subject": "Fächer",
      }
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
  }
};
</script>

<style scoped>
</style>