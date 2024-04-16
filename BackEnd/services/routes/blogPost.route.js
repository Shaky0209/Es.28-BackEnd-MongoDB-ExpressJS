import { Router } from 'express';
import Post from '../models/blogPost.model.js';

export const blogPostRoute = Router();

blogPostRoute.get("/post", async(req, res)=>{
    let post = await Post.find();
    res.json(post);
});

blogPostRoute.get("/post/:id", async(req, res)=>{
    let post = await Post.findByIdAndUpdate(req.params.id);
    res.json(post);
});

blogPostRoute.post("/post", async (req, res, next)=>{
    try{
        let post = await Post.create({
            category: req.body.category,
            title: req.body.title,
            cover: req.body.cover,
            readTime: {
                value: req.body.readTime.value,
                unit: req.body.readTime.unit,
            },
            author:{
                name: req.body.author.name,
                avatar: req.body.author.avatar,
            },
            content: req.body.content,
        });
        res.send(post).status(200);
    }catch (err){
        next(err);
    }
});

blogPostRoute.put("/post/:id", async (req, res, next)=>{
    try{
        let setPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(setPost);
    }catch (err){
        next(err);
    }
});

blogPostRoute.delete("/post/:id", async (req, res, next)=>{
    try{
        await Post.deleteOne({_id: req.params.id})
        res.send(204);
    }catch(err){
        next(err);
    }
});