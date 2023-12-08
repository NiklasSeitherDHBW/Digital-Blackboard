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

<!-- Implementierung eines Chatbots mithilfe von OpenAI Assistants, Inspiration: Liam Ottley, Youtube, https://www.youtube.com/watch?v=Uk5f3ajkfSs -->
<script type="text/javascript">
/**
 * Connection a API for a complete Chatbot Interface
 *
 * The Chatbot Backend is hosted using replit, the lint to the server is given to Voiceflow, to connect Backend to frontend.
 * Dynamically adds a script tag to the HTML document for loading the Voiceflow chat widget.
 *
 * @param {Document} d - The document object.
 * @param {string} t - The script tag type.
 */
(function(d, t) {
  // Create a script chatbot element
  var v = d.createElement(t),
      // Get the first script tag in the document
      s = d.getElementsByTagName(t)[0];

  // Set the onload event handler for the script
  v.onload = function() {
    // Load the Voiceflow chat widget with specified configuration
    window.voiceflow.chat.load({
      verify: { projectID: '65728f6fc94f5325502680b2' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production'
    });
  };

  // Set the source and type attributes for the script
  v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
  v.type = "text/javascript";

  // Insert the script tag before the first script tag in the document
  s.parentNode.insertBefore(v, s);
})(document, 'script');
</script>

<style>

</style>

