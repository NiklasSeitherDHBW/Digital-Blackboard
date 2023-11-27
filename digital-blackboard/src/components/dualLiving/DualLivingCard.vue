<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
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

<style>

</style>
