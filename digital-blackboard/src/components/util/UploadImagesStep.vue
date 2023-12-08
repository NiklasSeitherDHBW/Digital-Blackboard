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
    previewImages() {
      this.imagePreviews = [];

      this.uploadedImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    clearItems() {
      this.uploadedImages = [];
      this.imagePreviews = [];
    },
    deleteImage(index) {
      this.uploadedImages.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },
  },
  mounted() {

    if (this.preloadImages && this.preloadImages.length > 0 && !this.preloadImages[0].startsWith("http")) {
      this.uploadedImages = this.preloadImages.map(base64String => {
        // Convert base64 string to Blob
        const byteCharacters = atob(base64String.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/png'});

        // Create a File object from Blob
        const fileName = 'image.png';
        return new File([blob], fileName, {type: 'image/png'});
      });

      this.previewImages();
    }
  }
};
</script>

<style scoped>

</style>
