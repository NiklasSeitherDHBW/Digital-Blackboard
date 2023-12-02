<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Mitmachen"
  ></CustomCard>
</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue"
</script>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      basicInfosKeywords: [
        "price", "description"
      ],
      extraInfosKeywords: [
        "community", "availability", "description"
      ],
      dictionary: {
        "availability": "Maximale Anzahl Teilnehmer",
        "price" : "Monatliche Miete",
        "description": "Beschreibung",
        "location": "Wo?",
        "community": "Wer?",
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

<style>

</style>
