// import models
const Ps = require("../models/Ps");
const Post = require('../models/Post');


module.exports = {
    async loadPs(req, res, next, id) {
        try {
            req.Ps = await req.post.Ps.id(id);
            if (!req.Ps) return next(new Error('Ps not found'));
        } catch (err) {
            return next(err);
        }
        next();
    },

    async createPs({ user, body }, res) {
        console.log(user);
        console.log(post);
        try {
            const newPs = await Ps.create({
                author: user.username,
                authorID: user._id,
                postID: post._id,
                PsText: body.PsText,
            })
            return res.json(newPs);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    },
    async deletePs(req, res) {
        try {
            const post = await req.post.removePs(req.params.Ps);
            res.json(post);
        } catch (err) {
            next(err);
        }
    }
}