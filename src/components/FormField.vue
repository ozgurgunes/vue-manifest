<template>
  
    <b-form-group 
      :label="field.label"
      :invalid-feedback="fieldError(field.invalidFeedback)"
    >
      <b-input 
        :type="field.type" 
        :id="field.id" 
        :placeholder="field.placeholder"
        v-model="value"
        v-on:input="updateValue(value)"
        v-bind:class="{ 'is-invalid': field.isInvalid }"
      />
    </b-form-group>

</template>

<script>

export default {
  name: 'form-field',
  props: {
    value: '',
    field: {
      label: '',
      invalidFeedback: '',
      type: '',
      id: '',
      placeholder: '',
      vModel: '',
      isInvalid: ''
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value);
    },
    fieldError: (errors) => {
      if (errors) {
        return errors.join(' ')
      }
    }
  }
}

</script>

<style>
  
</style>