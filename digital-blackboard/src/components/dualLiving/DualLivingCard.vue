<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      class="text-left"
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
        :avatarSrc="item.images[0]"
        :name="item.name"
        :phone="item.phone"
        :email="item.email"
        @close-dialog="showDialogContactInfo=false"
    ></ContactCard>
  </v-dialog>
</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue"
import ContactCard from "@/components/util/ContactCard.vue";
</script>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      showDialogContactInfo: false,

      basicInfosKeywords: [
        "availability", "area", "price"
      ],
      extraInfosKeywords: [
        "description", "location", "furniture", "community"
      ],
      dictionary: {
        "availability": "Zeitraum",
        "area": "Wohnfläche in m²",
        "price" : "Monatliche Miete in €",
        "description": "Beschreibung",
        "location": "Ort / Stadtteil",
        "furniture": "Möbiliert",
        "community": "WG Zimmer",
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
};
</script>

<style>

</style>
