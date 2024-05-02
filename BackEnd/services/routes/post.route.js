import {Router} from "express";
import Author from '../models/author.model.js';
import Post from '../models/post.model.js'

export const postRoute = Router();

postRoute.get("/post/:id", async(req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id);
        post.populate('user');
        res.send(post);
    }catch(err){
        next(err);
    }
})

postRoute.post("/post/:id", async (req, res, next)=>{
    try{
        let author = await Author.findById(req.params.id)
        if(!author) next(err);
        let post = await Post.create({...req.body, user: author});
        author.posts.push(post._id);
        await author.save();
        res.send(post);
    }catch(err){
        next(err);
    }
});
