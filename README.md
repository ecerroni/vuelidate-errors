# Vuelidate errors

[![Generated with nod](https://img.shields.io/badge/generator-nod-2196F3.svg?style=flat-square)](https://github.com/diegohaz/nod)
[![NPM version](https://img.shields.io/npm/v/vuelidate-errors.svg?style=flat-square)](https://npmjs.org/package/vuelidate-errors)
[![Build Status](https://img.shields.io/travis/ecerroni/vuelidate-errors/master.svg?style=flat-square)](https://travis-ci.org/ecerroni/vuelidate-errors) [![Coverage Status](https://img.shields.io/codecov/c/github/ecerroni/vuelidate-errors/master.svg?style=flat-square)](https://codecov.io/gh/ecerroni/vuelidate-errors/branch/master)
![Dependencies](https://img.shields.io/librariesio/dependents/npm/vuelidate-errors.svg)
![minified + gzip](https://img.shields.io/bundlephobia/minzip/vuelidate-errors.svg)


<center>
Zero-dependencies helper for vuelidate's errors management
</center>

## Status
[WIP] - Under heavy development, not ready to use

## Why?
I was looking for an easier way to handle error messages inside vuelidate

## Demo

https://codesandbox.io/s/vuelidate-errorrs-cl62w


## Install

    $ npm install --save vuelidate-errors

    OR 

    $ yarn add vuelidate-errors

## Usage

```
<template>
  <div class="w-full max-w-xs">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          id="username"
          v-model.trim="$v.email.$model"
          :class="`shadow appearance-none border rounded ${ errors.email.hasError ? 'border-red-500' : ''} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          type="text"
          placeholder="Username"
        >
        <p
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
      </div>
    </form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import errorValidations from 'vuelidate-errors'

const myErrorMessages = {
        password: {
          minLength: "The password length should be 6", // This will ovveride the default error message for password length (minLength built-in validator). Yuu must always use the built-in validator field name
        },
      }

export default {

  name: "Login",
  
  mixins: [validationMixin],
  
  validations: {
    email: {
      required,
      minLength: minLength(4),
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
      myErrorMessages,
    };
  },
  
  computed: {
    errors() {
      return errorValidations({
        useFieldNames: false, // default true
        customErrorMessages: this.myErrorMessages, // default {}
        v: this.$v // required
      })
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('form not valid')
      } else {
        console.log('form is valid')
      }
    }
  }
};
</script>

```

## TODO
### Built-in validators
- [x] required
- [ ] requiredIf
- [ ] requiredUnless
- [x] minLength
- [x] maxLength
- [ ] minValue
- [ ] maxValue
- [x] between
- [ ] alpha
- [ ] alphaNum
- [ ] numeric
- [ ] integer
- [ ] decimal
- [x] email
- [ ] address
- [ ] ipAddress
- [ ] macAddress
- [x] sameAs
- [x] url
- [ ] or
- [ ] and
- [ ] not


## License

MIT © [ric0](https://github.com/ecerroni)
