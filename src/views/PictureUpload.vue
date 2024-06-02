<template>
  <b-container>
    <b-row>
      <b-col id="email-change-view" offset="4" cols="4">
        <h1 class="mb-3">Upload Profile Picture</h1>
        <form-alert />
        <img :src="profile.avatar" alt />
        <b-form
          @submit="submitForm()"
          v-on:submit.prevent
          enctype="multipart/form-data"
        >
          <b-form-group
            @submit="submitForm()"
            label="Profile Picture"
            :state="Boolean(picture)"
            :invalid-feedback="errors && fieldError(errors.picture)"
          >
            <b-form-file
              name="picture"
              v-model="picture"
              :state="errors && errors.picture && Boolean(!errors.picture)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              :class="{ 'is-invalid': errors && errors.picture }"
            ></b-form-file>
          </b-form-group>
          <p>
            <b-button block type="submit" id="login-button"
              >Change email</b-button
            >
          </p>
          <p>
            Back to
            <router-link :to="{ name: 'profileSettings' }"
              >settings</router-link
            >.
          </p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormMixin from "@/mixins/FormMixin.js"
import { mapState } from "vuex"

export default {
  name: "pictureUpload",
  mixins: [FormMixin],
  data() {
    return {
      picture: [],
      dispatch: "manifest/PICTURE_UPLOAD",
      redirect: { name: "profileSettings" }
    }
  },
  created() {
    this.getUser()
  },
  computed: {
    ...mapState({
      profile: s => s.manifest.profile
    })
  },
  methods: {
    getUser() {
      this.$store.dispatch("manifest/PROFILE_SETTINGS")
    },
    submitForm: function() {
      let formData = new FormData()
      formData.append("picture", this.picture)
      this.$store.dispatch(this.dispatch, formData).then(() => {
        if (!this.errors.length && this.redirect) {
          this.$router.push(this.redirect)
        }
      })
    }
  }
}
</script>
