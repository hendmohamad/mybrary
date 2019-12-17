const mangoose = require('mongoose');
const path = require('path');
const coverImageBasePath = 'uploads/bookCovers';
const bookSchema = new mangoose.Schema({
    title: {
        type: String,
        required: true
    },
     description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mangoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
});

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName != null){
      return  path.join('/', coverImageBasePath, this.coverImageName );
    }
});

module.exports = mangoose.model('Book', bookSchema);
module.exports.coverImageBasePath= coverImageBasePath;