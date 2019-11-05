import { mapGetters } from "vuex"
import FormAlert from "../components/FormAlert.vue"

export default {
  data() {
    return {
      dispatch: null,
      redirect: null
    }
  },
  components: { FormAlert },
  computed: {
    ...mapGetters("manifest", ["errors"])
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(" ")
      }
    },
    submitForm() {
      this.$store.dispatch(this.dispatch, this.form).then(() => {
        if (!this.errors && this.redirect) {
          this.$router.push(this.redirect)
        }
      })
    }
  }
}
