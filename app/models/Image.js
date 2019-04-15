/* DO NOT THINK THIS IS NEEDED ANYMORE */

const mongoose = require('mongoose');
const mongooseFile = require('mongoose-crate')

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    title: {type: String, required: true}
})

ImageSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '/public/images'
  }),
  fields: {
    attachment: {}
  }
})

const ImageModel = mongoose.model('Image', ImageSchema)

ImageModel.uploadImage = (ImageData, callback) => {
    const newImage = new ImageModel();
    newImage.attach('attachment', {path: '/path/to/file'}, (error) => {
	// attachment is now attached and post.attachment is populated e.g.:
	// post.attachment.url

	// don't forget to save it..
	post.save((error) => {
		// post is now persisted
	})
})
}
