<template>
  <NavBar/>
  <DualHousing/>
</template>

<script>
import {defineComponent} from "vue";
 import DualHousing from "@/components/DualHousing_old.vue";
 import NavBar from "@/components/util/CustomNavBar.vue";
  export default defineComponent({
   components: {
     DualHousing,
     NavBar}
})
</script>