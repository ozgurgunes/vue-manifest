import { mapGetters } from 'vuex'
import FormAlert from '../components/FormAlert'

export default {
  data() {
    return {
      form: {},
      dispatch: null,
      redirect: null
    }
  },
  components: { FormAlert },
  computed: {
    ...mapGetters('reactor', ['errors'])
  },
  methods: {
    fieldError: errors => {
      if (errors) {
        return errors.join(' ')
      }
    },
    submitForm() {
      this.$store.dispatch(this.dispatch, this.form).then(() => {
        if (this.errors.length <= 0 && this.redirect) {
          this.$router.push(this.redirect)
        }
      })
    }
  }
}
