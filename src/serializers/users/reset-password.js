const JsonApiSerializer = require('jsonapi-serializer').Serializer

const serializer = new JsonApiSerializer('User', {
  attributes: [
    'password',
    'passwordConfirmation'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false
})

export default serializer
