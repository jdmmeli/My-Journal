const { Schema, model } = require('mongoose');

const PsSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    PsText: {
        type: String,
        required: true,
        maxlength: 10000,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = model('Ps', PsSchema);
