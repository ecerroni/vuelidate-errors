export default (useFieldNames, v) => (validator, field) => {
  let errorMsg = 'error';
  const param = v[field].$params[validator];
  if (!param) return errorMsg;
  if (useFieldNames) {
    switch (validator) {
      case 'required':
        errorMsg = `${field} is required`;
        break;
      case 'email':
        errorMsg = `This ${field} is not valid email`;
        break;
      case 'url':
        errorMsg = `This ${field} is not a valid url`;
        break;
      case 'minLength':
        errorMsg = `${field} has to be at least ${param.min} characters length`;
        break;
      case 'sameAs':
        errorMsg = `${field} should be same as ${param.eq} field`;
        break;
      default:
        break;
    }
    return errorMsg;
  }
  switch (validator) {
    case 'required':
      errorMsg = 'This field is required';
      break;
    case 'email':
      errorMsg = 'This is not a valid email';
      break;
    case 'minLength':
      errorMsg = `This field has to be at least ${param.min} characters length`;
      break;
    case 'sameAs':
      errorMsg = `This field should be same as ${param.eq} field`;
      break;
    default:
      break;
  }
  return errorMsg;
};
