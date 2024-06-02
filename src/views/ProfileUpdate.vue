<template>
  <b-container>
    <b-row>
      <b-col id="login-view" offset="4" cols="4">
        <h1 class="mb-3">Update Profile</h1>
        <form-alert />
        <b-form @submit="submitForm()" v-on:submit.prevent>
          <b-form-group
            label="First Name"
            :invalid-feedback="errors && fieldError(errors.firstName)"
          >
            <b-input
              type="text"
              placeholder="Enter your first name"
              v-model="form.firstName"
              :class="{ 'is-invalid': errors && errors.firstName }"
            />
          </b-form-group>

          <b-form-group
            label="Last Name"
            :invalid-feedback="errors && fieldError(errors.lastName)"
          >
            <b-input
              type="text"
              placeholder="Enter your last name"
              v-model="form.lastName"
              :class="{ 'is-invalid': errors && errors.lastName }"
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
            :invalid-feedback="errors && fieldError(errors.birthDate)"
          >
            <b-input
              placeholder="DD/MM/YYYY"
              v-model="form.birthDate"
              ref="birthDateField"
              :class="{ 'is-invalid': errors && errors.birthDate }"
            />
          </b-form-group>

          <b-form-group
            label="Time Zone"
            :invalid-feedback="errors && fieldError(errors.timezone)"
          >
            <b-form-select
              v-model="form.timezone"
              :options="options.timezone"
              :class="{ 'is-invalid': errors && errors.timezone }"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="Locale"
            :invalid-feedback="errors && fieldError(errors.locale)"
          >
            <b-form-select
              v-model="form.locale"
              :options="options.locale"
              :class="{ 'is-invalid': errors && errors.locale }"
            ></b-form-select>
          </b-form-group>

          <p>
            <b-button block type="submit">Save</b-button>
          </p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from "@/mixins/FormMixin.js"
import { mapState } from "vuex"
import Cleave from "cleave.js"

export default {
  name: "profileUpdate",
  mixins: [FormMixin],
  data() {
    return {
      dispatch: "manifest/PROFILE_UPDATE",
      redirect: { name: "profileSettings" }
    }
  },
  created() {
    this.getUser()
  },
  mounted() {
    let field = this.$refs.birthDateField.$el
    new Cleave(field, {
      delimiter: "/",
      date: true,
      datePattern: ["d", "m", "Y"]
    })
  },
  computed: {
    ...mapState({
      form: s => s.manifest.profile,
      options: s => s.manifest.options
    })
  },
  methods: {
    getUser() {
      this.$store
        .dispatch("manifest/PROFILE_SETTINGS")
        .catch(e => console.error(e))
      this.$store
        .dispatch("manifest/PROFILE_OPTIONS")
        .catch(e => console.error(e))
    }
  }
}
</script>
