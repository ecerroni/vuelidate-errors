export default ({
  useFieldNames = true,
  customErrorMessages = {},
  v = null
} = {}) => {
  if (!v) return {}
  const validators = ['required', 'email', 'minLength', 'sameAs', 'url']
  const errorMsg = customErrorMessages
  const errorConditions = (validator, field) => {
    let hasError
    switch (validator) {
      case 'required':
        hasError = !v[field].$model && v[field].$error
        break;
      case 'email':
        hasError = v[field].$model && v[field].$invalid
        break
      case 'url':
        hasError = v[field].$model && v[field].$invalid
        break
      case 'minLength':
        hasError = !v[field].minLength
        break
      case 'sameAs':
        hasError = v[v[field].$params.sameAs.eq].$model !== v[field].$model
        break
      default:
        hasError = false;
        break
    }
    return hasError
  };
  const defaultErrors = (validator, field) => {
    let errorMsg = 'error'
    let param = v[field].$params[validator]
    if (!param) return errorMsg
    if (useFieldNames) {
      switch (validator) {
        case 'required':
          errorMsg = `${field} is required`
          break;
        case 'email':
          errorMsg = `This ${field} is not valid email`
          break
        case 'url':
          errorMsg = `This ${field} is not a valid url`
          break
        case 'minLength':
          errorMsg = `${field} has to be at least ${param.min} characters length`
          break
        case 'sameAs':
          errorMsg = `${field} should be same as ${param.eq} field`
          break
        default:
          break
      }
      return errorMsg
    }
    switch (validator) {
      case 'required':
        errorMsg = 'This field is required'
        break;
      case 'email':
        errorMsg = 'This is not a valid email'
        break
      case 'minLength':
        errorMsg = `This field has to be at least ${param.min} characters length`
        break
      case 'sameAs':
        errorMsg = `This field should be same as ${param.eq} field`
        break
      default:
        break
    }
    return errorMsg
  }

  const validations = Object.keys(v.$params) // .filter(key => !key.includes('$'))
  const errors = {
    ...validations.reduce((o, k) => ({
      ...o,
      [k]: {
        ...validators.map(validator => v[k].hasOwnProperty(validator) && errorConditions(validator, k) && { [validator]: (errorMsg && errorMsg[k] && errorMsg[k][validator]) || defaultErrors(validator, k), validator })
      }
    }), {}),
  }

  return {
    ...Object.entries(errors).reduce((obj, entry) => {
      const errors = Object.keys(entry[1]).map(key => entry[1][key]).filter(err => !!err)
      const isError = errors.length > 0
      return {
        ...obj,
        [entry[0]]: {
          hasError: isError,
          errorMessage: isError ? errors[errors.length - 1][errors[errors.length - 1].validator] : ''
        }
      }
    }, {})

  }
}