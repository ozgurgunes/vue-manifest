<template>
  <b-container>
    <b-row>
      <b-col id="email-change-view" offset="4" cols="4">
        <h1 class="mb-3">Upload Profile Picture</h1>
        <b-alert v-if="errors.length == 0" show>
          Pleaser enter your email.
        </b-alert>
        <b-alert
          variant="warning"
          v-if="errors.length != 0 && !errors.non_field_errors"
          show
        >
          Pleaser enter your email.
        </b-alert>
        <b-alert variant="danger" v-if="errors.non_field_errors" show>
          <div v-for="(error, index) in errors.nonFieldErrors" :key="index">
            {{ error }}
          </div>
        </b-alert>
        <b-form
          @submit="submitForm()"
          v-on:submit.prevent
          enctype="multipart/form-data"
        >
          <b-form-group
            @submit="submitForm()"
            label="Profile Picture"
            :state="Boolean(picture)"
            :invalid-feedback="fieldError(errors.picture)"
          >
            <b-form-file
              name="picture"
              v-model="picture"
              :state="errors.picture ? Boolean(!errors.picture) : null"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              :class="{ 'is-invalid': errors.picture }"
            ></b-form-file>
          </b-form-group>
          <p>
            <b-button block type="submit" id="login-button">
              Change email
            </b-button>
          </p>
          <p>
            Back to
            <router-link :to="{ name: 'profile_settings' }"
              >settings</router-link
            >.
          </p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'picture_upload',
  data() {
    return {
      picture: ''
    }
  },
  computed: {
    ...mapGetters('reactor', ['errors'])
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm: function() {
      let formData = new FormData()
      formData.append('picture', this.picture)
      this.$store
        .dispatch('reactor/PICTURE_UPLOAD', formData)
        .then(() => {
          if (this.errors.length <= 0) {
            this.$router.push({ name: 'profile_settings' })
          }
        })
        .catch(err => {
          this.$store.state.reactor.errors.push(...err)
        })
    }
  }
}
</script>
