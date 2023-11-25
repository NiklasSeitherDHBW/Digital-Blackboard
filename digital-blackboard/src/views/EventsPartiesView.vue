<template>
  <NavBar/>
  <EventsParties/>
</template>

<script>
import {defineComponent} from "vue";
import EventsParties from "@/components/eventsParties/EventsPartiesPage.vue";
import NavBar from "@/components/util/CustomNavBar.vue";

export default defineComponent({
  components: {
    EventsParties,
    NavBar}
})
</script>