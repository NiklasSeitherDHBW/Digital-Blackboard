<template>
  <v-card style="padding: 20px; width: 400px;">
    <v-card-title>Wohnung anbieten</v-card-title>
  <form @submit.prevent="submit">
    <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Name"
        variant="outlined"
    ></v-text-field>

    <v-text-field
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="Phone Number"
        variant="outlined"
    ></v-text-field>

    <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        variant="outlined"
    ></v-text-field>

    <v-select
        v-model="select.value.value"
        :items="items"
        :error-messages="select.errorMessage.value"
        label="Select"
        variant="outlined"
    ></v-select>

    <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        value="1"
        label="Option"
        type="checkbox"
        variant="outlined"
    ></v-checkbox>

    <v-btn
        class="me-4"
        type="submit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
    </v-btn>
  </form>
  </v-card>
</template>
<script setup>

import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name (value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    phone (value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be at least 9 digits.'
    },
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    select (value) {
      if (value) return true

      return 'Select an item.'
    },
    checkbox (value) {
      if (value === '1') return true

      return 'Must be checked.'
    },
  },
})

const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>