import defaultErrorsFn from './_default-errors';

export default ({
  useFieldNames = true,
  customErrorMessages = {},
  v = null,
} = {}) => {
  if (!v) return {};
  const defaultErrors = defaultErrorsFn(useFieldNames, v);
  const validators = [
    'required',
    'email',
    'minLength',
    'maxLength',
    'between',
    'sameAs',
    'url',
  ];
  const errorMsg = customErrorMessages;
  const errorConditions = (validator, field) => {
    let hasError;
    switch (validator) {
      case 'required':
        hasError = !v[field].$model && v[field].$error;
        break;
      case 'email':
        hasError = v[field].$model && v[field].$invalid;
        break;
      case 'url':
        hasError = v[field].$model && v[field].$invalid;
        break;
      case 'minLength':
        hasError = !v[field].minLength;
        break;
      case 'maxLength':
        hasError = !v[field].maxLength;
        break;
      case 'between':
        hasError = !v[field].between;
        break;
      case 'sameAs':
        hasError =
          v[v[field].$params.sameAs.eq].$model &&
          v[field].$model &&
          v[v[field].$params.sameAs.eq].$model !== v[field].$model;
        break;
      default:
        hasError = false;
        break;
    }
    return hasError;
  };

  const validations = Object.keys(v.$params); // .filter(key => !key.includes('$'))
  const errors = {
    ...validations.reduce(
      (o, k) => ({
        ...o,
        [k]: {
          ...validators.map(
            validator =>
              v[k].hasOwnProperty(validator) && // eslint-disable-line no-prototype-builtins
              errorConditions(validator, k) && {
                [validator]:
                  (errorMsg && errorMsg[k] && errorMsg[k][validator]) ||
                  defaultErrors(validator, k),
                validator,
              }
          ),
        },
      }),
      {}
    ),
  };

  return {
    ...Object.entries(errors).reduce((obj, entry) => {
      const errors = Object.keys(entry[1]) // eslint-disable-line no-shadow
        .map(key => entry[1][key])
        .filter(err => !!err);
      const isError = errors.length > 0;
      return {
        ...obj,
        [entry[0]]: {
          hasError: isError,
          errorMessage: isError
            ? errors[errors.length - 1][errors[errors.length - 1].validator]
            : '',
        },
      };
    }, {}),
  };
};
