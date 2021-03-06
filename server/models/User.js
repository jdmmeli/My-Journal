const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// imprt schemas from Post.js and Comment.js
// const PostSchema = require('./Post.js').schema;
// const CommentSchema = require('./Comment.js').schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		password: {
			type: String,
			required: true,
		},

		// savedPosts/Comments will be arrays of posts/comments by the user that will follow their relative schemas
		// savedPosts: [PostSchema],
		// savedComments: [CommentSchema],
	},
	// set this to use virtual below
	{
		// toJSON: {
		// 	virtuals: true,
		// },
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get extra fields called `commentCount` and 'postCount' with the number of saved posts/ comments the user has
// userSchema.virtual('postCount').get(function () {
// 	return this.savedPosts.length;
// });

// userSchema.virtual('commentCount').get(function () {
// 	return this.savedComments.length;
// });

const User = model('User', userSchema);

module.exports = User;
