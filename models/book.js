const mangoose = require('mongoose');

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
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType:{
        type:String,
        required: true
    },
    author: {
        type: mangoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
});

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType!=null){
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
});

module.exports = mangoose.model('Book', bookSchema);
