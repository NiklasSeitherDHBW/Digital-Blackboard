<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-file-input
              v-model="selectedFiles"
              label="Choose images"
              show-size
              accept="image/*"
              multiple
              @change="previewImages"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row v-if="imagePreviews.length > 0">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(preview, index) in imagePreviews" :key="index">
          <v-card>
            <v-card-text class="text-h6">{{ selectedFiles[index].name }}</v-card-text>
            <v-img :src="preview" contain max-height="200px"></v-img>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [],
      imagePreviews: [],
    };
  },
  methods: {
    previewImages() {
      this.imagePreviews = [];

      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
