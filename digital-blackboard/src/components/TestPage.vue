<template>
  <CustomCard style="width: 600px;" :item="item">
  </CustomCard>
</template>

<script>
import {defineComponent} from "vue";
import CustomCard from "@/components/dualLiving/DualLivingCard.vue";
export default defineComponent({
  components: {
    CustomCard
  },
  data() {
    return {
      item: {
        title: 'Sophies Rechner hebt ab!',
        description: 'Hauptsache er sah schön aus!!!.',
        location: "Mannheim Neuostheim",
        date_created:"08.11.2023",
        availability: "14.02.2023 - 15.05.2023",
        community: "WG, 4 Jungs",
        price: "650",
        area: "120",
        furniture: "JA",
        images: ["https://dualeswohnen.de/storage/apartments/2KvNpOoDYKZkuHnIGnL4PhquPtvU1M8CfMYqUBGXjHxrTt7AdDGIErec1mtHLVCP/QWMy1j0ydvT9A1TYw98sO84bAp0FY615kOdYvtz-2023-04-02-18-25-41.jpeg","https://cf.bstatic.com/xdata/images/hotel/max1024x768/407682874.jpg?k=76a5b9c92a3f2a41f3d2f7a564722b27cb19fa06e74dc10539daf5f8f575f0dd&o=&hp=1", "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"],
      },
    }
  }
})

</script>

<style>

</style>