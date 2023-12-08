<template>

  <v-container>

    <v-row>

      <v-col cols="12">

        <v-file-input
            v-model="uploadedImages"
            label="Choose images"
            show-size
            :chips="true"
            :multiple="true"
            color="#eb1b2a"
            accept="image/*"
            @change="previewImages"
            @click:clear="clearItems"
            @select="clearItems"
        ></v-file-input>

      </v-col>

    </v-row>

    <v-row
        v-if="uploadedImages.length > 0"
        align="stretch"
    >
      <v-col
          v-for="(preview, index) in imagePreviews"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card
            v-if="imagePreviews.length > 0"
        >
          <v-card-text
              class="text-h7"
          >
            {{ uploadedImages[index].name }}
          </v-card-text>

          <v-divider></v-divider>

          <v-img
              :src="preview"
              height="200px"
              contain
              max-height="200px"
          ></v-img>

          <v-divider></v-divider>

          <v-card-actions>

            <v-btn
                color="#eb1b2a"
                class="ml-auto"
                @click="deleteImage(index)"
            >
              <v-icon>mdi-delete</v-icon>

            </v-btn>

          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>
export default {

  props: {
    preloadImages: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      uploadedImages: [],
      imagePreviews: [],
    };
  },

  methods: {

    /**
     * Generates image previews for the uploaded images.
     *
     * @method
     */
    previewImages() {
      // Clear existing image previews
      this.imagePreviews = [];

      // Loop through each uploaded image file
      this.uploadedImages.forEach((file) => {
        // Create a FileReader to read the image file as a data URL
        const reader = new FileReader();

        // Set up the onload event handler to push the data URL to imagePreviews array
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };

        // Read the image file as a data URL
        reader.readAsDataURL(file);
      });
    },

    /**
     * Clears the uploaded images and their previews.
     *
     * @method
     */
    clearItems() {
      // Reset the uploaded images and image previews arrays
      this.uploadedImages = [];
      this.imagePreviews = [];
    },

    /**
     * Deletes a specific image at the given index from the uploaded images and previews arrays.
     *
     * @method
     * @param {number} index - The index of the image to delete.
     */
    deleteImage(index) {
      // Remove the image at the specified index from both arrays
      this.uploadedImages.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },
  },

  mounted() {

    /**
     * Lifecycle hook called after the component has been mounted.
     *
     * @method
     */
    // Check if preloadImages is provided and not empty (so that default pictures are not displayed), and the first item is not a URL
    if (this.preloadImages && this.preloadImages.length > 0 && !this.preloadImages[0].startsWith("http")) {

      // Convert each character in the base64 string to its Unicode character code
      this.uploadedImages = this.preloadImages.map(base64String => {
        // Decode base64 encoded string
        const byteCharacters = atob(base64String.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);

        // Convert each character to its Unicode character code
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a Uint8Array from the array of character codes
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob (Binary large object) from the Uint8Array
        const blob = new Blob([byteArray], {type: 'image/png'});

        // Set a default file name for the image
        const fileName = 'image.png';

        return new File([blob], fileName, {type: 'image/png'});
      });

      // Preview the uploaded images in the Edit & Add Dialog
      this.previewImages();
    }
  }
};
</script>

<style>

</style>
