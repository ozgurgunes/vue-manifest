<template>
  <div>
    <slot>
      <b-alert v-if="errors && errors.nonFieldErrors" variant="danger" show>
        <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
          {{ error }}
        </div>
      </b-alert>
      <b-alert v-else v-bind:class="{ 'alert-warning': errors }" show>
        Please fill all fields.
      </b-alert>
    </slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'form-alert',
  computed: {
    ...mapGetters('manifest', ['errors'])
  }
}
</script>
