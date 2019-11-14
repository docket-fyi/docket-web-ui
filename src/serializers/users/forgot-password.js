const JsonApiSerializer = require('jsonapi-serializer').Serializer

const serializer = new JsonApiSerializer('User', {
  attributes: [
    'email'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false
})

export default serializer
