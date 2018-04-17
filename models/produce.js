var odoose = require('odoose')

var produceSchema = new odoose.Schema({
  id: {
    type: Number,
    path: 'id'
  },
  name: {
    type: String,
    required: true,
    path: 'name'
  },
  ingredients: {
    type: String,
    path: 'composition'
  },
  is_allergen: {
    type: String,
    path: 'is_allergen'
  },
  url: {
    type: String
  },
  published: {
    type: Boolean,
    path: 'website_published'
  },
  image: {
    data: Buffer,
    contentType: String,
    path: 'image'},
  pictures: {
    path: 'image_ids'
  }
})

produceSchema.virtual('imageUrl', function (document) {
  var url = '/produce/image/' + document.id
  return url
})

produceSchema.virtual('pictures', function (document) {
  var pictures = []
  if (document.pictures) {
    for (var i = 0; i < document.pictures.length; i++) { pictures.push({url: '/produce/' + document.pictures[i], id: document.pictures[i]}) }
    return pictures
  }
})

module.exports = produceSchema
