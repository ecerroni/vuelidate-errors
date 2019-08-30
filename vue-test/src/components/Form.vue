<template>
  <div class="w-full max-w-xs">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
        Email
        </label>
        <input
          id="email"
          v-model.trim="$v.email.$model"
          :class="`shadow appearance-none border rounded ${ errors.email.hasError ? 'border-red-500' : ''} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          type="text"
          placeholder="Email"
        >
        <p
          id="email-error-message"
          class="text-red-500 text-xs italic h-4"
        >
          {{ errors.email.hasError ? errors.email.errorMessage : '' }}
        </p>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          v-model.trim="$v.password.$model"
          :class="`shadow appearance-none border ${ $v.password.$error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`"
          type="password"
          placeholder="******************"
          @keyup.enter="submitForm"
        >
        <p
          class="text-red-500 text-xs italic h-4"
        >
          {{ errors.password.hasError ? errors.password.errorMessage : '' }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="submitForm"
        >
          Sign In
        </button>
        <p>Form is {{this.form}}</p>
        <div
          v-if="forgetPassword"
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Forgot Password?
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs, url } from 'vuelidate/lib/validators'
import errorValidations from '../../../src/index'
export default {
  name: "Login",
  mixins: [validationMixin],
  props: {
    forgetPassword: {
      type: Boolean,
      default: false,
    },
    useFieldNames: {
      type: Boolean,
      default: false,
    },
    customErrorMessages: {
      type: Object,
      default: () => ({})
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    }
  },
  data() {
    return {
      email: '',
      password: '',
      form: 'not valid'
    };
  },
  computed: {
    errors() {
      return errorValidations({
        useFieldNames: this.useFieldNames, // default true
        customErrorMessages: this.customErrorMessages, // default {}
        v: this.$v // required
      })
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.form = 'valid'
      } else {
        this.form = 'not valid'      
      }
    }
  }
};
</script>
<style lang="postcss" scoped>
</style>
