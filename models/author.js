const mangoose = require('mongoose');

const authorSchema = new mangoose.Schema({

    name: {
        type: String,
        required: true
    }
});

module.exports = mangoose.model('Author', authorSchema);