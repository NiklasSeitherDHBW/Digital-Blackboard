<template>
  <v-app>
    <v-main>
      <CustomNavBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import CustomNavBar from "@/components/util/CustomNavBar.vue";
</script>

<script type="text/javascript">
(function(d, t) {
  var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
  v.onload = function() {
    window.voiceflow.chat.load({
      verify: { projectID: '65728f6fc94f5325502680b2' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production'
    });
  }
  v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
})(document, 'script');
</script>

<style>

</style>

