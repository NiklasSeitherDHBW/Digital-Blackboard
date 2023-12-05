<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      class="text-left"
      action="Kontaktieren"
      @action-clicked="showDialogContactInfo=true"
  ></CustomCard>

  <!-- Alle Kontaktdaten, die in den advertisments (Immobilieninseraten -> DualLivingPage) enthalten sind, werden in einem dialog dargestellt -> Button: Kontaktieren-->
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

      // Liste aller Primärdaten über die Immobilie -> basicInfos
      basicInfosKeywords: [
        "availability", "area", "rooms", "price"
      ],

      // Liste aller Sekundärdaten über die Immobilie -> extraInfos
      extraInfosKeywords: [
        "description", "location", "furniture", "community"
      ],

      // Form für alle eingetragenen Daten über die Immobilie
      dictionary: {
        "availability": "Zeitraum",
        "area": "Wohnfläche in m²",
        "rooms": "Zimmer",
        "price" : "monatliche Miete in €",
        "description": "Beschreibung",
        "location": "Ort / Stadtteil",
        "furniture": "möbliert",
        "community": "WG-Zimmer",
      },
    };
  },
  computed: {
    //iterieren, durch alle primären Informationen über die Immobilie aus basicInfosKeywords, um die Entsprechenden Titel mit Wert des attributes anzuzeigen
    basicInfos() {
      return this.basicInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },

    //iterieren, durch alle extra Informationen über die Immobilie aus extraInfosKeywords, um die Entsprechenden Titel mit Wert des attributes anzuzeigen
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
