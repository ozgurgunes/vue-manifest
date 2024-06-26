import { mapGetters } from "vuex"
import VerificationAlert from "../components/VerificationAlert.vue"

export default {
  data() {
    return {
      dispatch: null,
      redirect: null
    }
  },
  components: { VerificationAlert },
  computed: {
    ...mapGetters("manifest", ["errors"])
  },
  created() {
    this.verification = {
      username: this.$route.params.uid,
      token: this.$route.params.token
    }
    this.submitVerification()
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(" ")
      }
    },
    submitVerification() {
      this.$store.dispatch(this.dispatch, this.verification).then(() => {
        if (!this.errors && this.redirect) {
          this.$router.push(this.redirect)
        }
      })
    }
  }
}
