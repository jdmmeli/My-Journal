// import models
const Post = require("../models/Post");
const { response } = require("express");
const Ps = require("../models/Ps");
const { User } = require('../models');


module.exports = {
  async getAllPosts(req, res) {
    const posts = await Post.find();
    return res.json(posts);
  },

  async getSinglePost({ user = null, params }, res) {
    const foundPost = await Post.findOne({
      _id:params.postId,
    });

    if (!foundPost) {
      return res.status(400).json({ message: 'Cannot find a post with this id!' });
    }

    res.json(foundPost);
  },

  async searchPosts(req, res) {
    const searchedPosts = await Post.find({ title: `/${req}/i` });
    return res.json(searchedPosts);
  },

  async addPs({ user, body }, res) {
    console.log(user);
    console.log(body)
    try {
      const newPs = await Ps.create({
        author: user.username,
        authorId: user._id,
        PsText: body.PsText,
        postId: body.postId
      })
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedPs: newPs } },
        { new: true, runValidators: true }
      )
      const updatedPost = await Post.findOneAndUpdate(
        { _id: body.postId },
        { $addToSet: { savedPs: newPs } },
        { new: true, runValidators: true }
      );
      return res.json(newPs);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
