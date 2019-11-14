const JsonApiSerializer = require('jsonapi-serializer').Serializer

const serializer = new JsonApiSerializer('Event', {
  attributes: [
    'name',
    'date'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false
})

export default serializer
