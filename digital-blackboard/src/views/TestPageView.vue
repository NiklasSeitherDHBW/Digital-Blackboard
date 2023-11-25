<template>
  <NavBar/>
  <Test/>
</template>

<script>
import {defineComponent} from "vue";
import Test from "@/components/TestPage.vue";
import NavBar from "@/components/util/CustomNavBar.vue";
export default defineComponent({
  components: {
    Test,
    NavBar
  },
})

</script>