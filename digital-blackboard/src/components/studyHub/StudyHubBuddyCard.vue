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
  >
    <ContactCard
        :name="item.title"
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
      let basicInfos = [];
      for (const attribute of this.basicInfosKeywords) {
        let value = this.item[attribute]
        basicInfos.push({label: this.dictionary[attribute], value: value});
      }

      return basicInfos;
    },
    extraInfos() {
      let extraInfos = [];
      for (const attribute of this.extraInfosKeywords) {
        let value = this.item[attribute]
        extraInfos.push({label: this.dictionary[attribute], value: value});
      }

      return extraInfos;
    }
  }
};
</script>

<style scoped>
</style>