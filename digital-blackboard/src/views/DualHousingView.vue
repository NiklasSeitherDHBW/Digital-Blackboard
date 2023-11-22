<template>
  <NavBar/>
  <DualHousing/>
</template>

<script>
import {defineComponent} from "vue";
 import DualHousing from "@/components/DualHousing.vue";
 import NavBar from "@/components/NavBar.vue";
  export default defineComponent({
   components: {
     DualHousing,
     NavBar}
})
</script>