const JsonApiSerializer = require('jsonapi-serializer').Serializer

const serializer = new JsonApiSerializer('Session', {
  attributes: [
    'email',
    'password'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false
})

export default serializer
