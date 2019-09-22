<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Update Profile</h1>

        <b-alert v-if="errors.length == 0" show>
          Pleaser enter new password.
        </b-alert>
        <b-alert
          variant="warning"
          v-if="errors.length != 0 && !errors.non_field_errors"
          show
        >
          Pleaser enter new password.
        </b-alert>
        <b-alert variant="danger" v-if="errors.non_field_errors" show>
          <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
            {{ error }}
          </div>
        </b-alert>

        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="First Name"
            :invalid-feedback="fieldError(errors.firstName)"
          >
            <b-input
              type="text"
              placeholder="Enter your first name"
              v-model="form.firstName"
              :class="{ 'is-invalid': errors.firstName }"
            />
          </b-form-group>

          <b-form-group
            label="Last Name"
            :invalid-feedback="fieldError(errors.lastName)"
          >
            <b-input
              type="text"
              placeholder="Enter your last name"
              v-model="form.lastName"
              :class="{ 'is-invalid': errors.lastName }"
            />
          </b-form-group>

          <b-form-group label="Gender">
            <b-form-radio-group
              v-model="form.gender"
              :options="options.gender"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Birth Date"
            :invalid-feedback="fieldError(errors.birthDate)"
          >
            <b-input
              placeholder="DD/MM/YYYY"
              v-model="form.birthDate"
              ref="birthDateField"
              :class="{ 'is-invalid': errors.birthDate }"
            />
          </b-form-group>

          <b-form-group
            label="Time Zone"
            :invalid-feedback="fieldError(errors.timezone)"
          >
            <b-form-select
              v-model="form.timezone"
              :options="options.timezone"
              :class="{ 'is-invalid': errors.timezone }"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="Locale"
            :invalid-feedback="fieldError(errors.locale)"
          >
            <b-form-select
              v-model="form.locale"
              :options="options.locale"
              :class="{ 'is-invalid': errors.locale }"
            ></b-form-select>
          </b-form-group>

          <p><b-button block type="submit">Save</b-button></p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Cleave from 'cleave.js'

export default {
  name: 'profile_update',
  data() {
    return {}
  },
  created() {
    this.getUser()
  },
  mounted() {
    let field = this.$refs.birthDateField.$el
    new Cleave(field, {
      delimiter: '/',
      date: true,
      datePattern: ['d', 'm', 'Y']
    })
  },
  computed: {
    ...mapState({
      errors: s => s.reactor.errors,
      form: s => s.reactor.profile,
      options: s => s.reactor.options,
      submitForm: s => s.reactor.submitForm
    })
  },
  methods: {
    getUser() {
      this.$store.dispatch('reactor/PROFILE_SETTINGS')
      this.$store.dispatch('reactor/PROFILE_OPTIONS')
    },
    fieldError(errors) {
      if (errors) {
        return errors.join(' ')
      }
    }
    //submitForm() {
    //  this.$store
    //    .dispatch('reactor/PROFILE_UPDATE', this.form)
    //    .then(() => {
    //      if (this.errors.length <= 0) {
    //        this.$router.push({ name: 'profile_settings' })
    //      }
    //    })
    //    .catch(err => {
    //      console.log(err)
    //      this.$store.state.reactor.errors = err
    //    })
    // }
  }
}
</script>
