const { Schema, model } = require('mongoose');
const PsSchema = require('./Ps.js').schema;


const PostSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    authorID: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    postText: {
        type: String,
        required: true,
        maxlength: 500,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    
    savedPs: [PsSchema],
    },
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

PsSchema.set('toJSON', { getters: true });
PsSchema.options.toJSON.transform = (doc, ret) => {
    const obj = { ...ret };
    delete obj._id;
    return obj;
};

PostSchema.methods.addPs = function (author, body) {
    this.Pss.push({ author, body });
    return this.save();
};
PostSchema.methods.removePs = function (id) {
    const Ps = this.Pss.id(id);
    if (!Ps) throw new Error('Ps not found');
    Ps.remove();
    return this.save();
};

PostSchema.virtual('PsCount').get(function () {
	return this.savedPss.length;
});

const Post = model('Post', PostSchema);
module.exports = Post
