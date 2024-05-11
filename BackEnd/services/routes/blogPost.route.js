import { Router } from 'express';
import Post from '../models/blogPost.model.js';
import cloudinaryMiddleware from '../middlewares/multerPost.js';

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
                surname: req.body.author.surname,
                avatar: req.body.author.avatar,
                _id: req.body.author._id,
            },
            content: req.body.content,
            comments: [],
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

blogPostRoute.patch("/post/:id/link/cover", async (req, res, next) =>{
    try{
        //andiamo a prendere l'utente con l'id specifico e andiamo ad aggiornatre la sua proprietà avatar
        //con {new: true,} stiamo dicendo di restituirci la versione più aggiornata del documento
        let cover = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true,});
        //mandiamo come risposta l'utente aggiornato
        res.send(cover);
    }catch(err){
        //Gestione di eventuali errori
        next(err);
    }
})

blogPostRoute.patch("/post/:id/file/cover", cloudinaryMiddleware, async (req, res, next) =>{
    try{
        //andiamo a prendere l'utente con l'id specifico e andiamo ad aggiornatre la sua proprietà avatar
        //con {new: true,} stiamo dicendo di restituirci la versione più aggiornata del documento
        let cover = await Post.findByIdAndUpdate(req.params.id, {cover: req.file.path}, {new: true,});
        //mandiamo come risposta l'utente aggiornato
        res.send(cover);
    }catch(error){
        //Gestione di eventuali errori
        next(error);
    }
})

blogPostRoute.delete("/post/:id", async (req, res, next)=>{
    try{
        await Post.deleteOne({_id: req.params.id})
        res.send(204);
    }catch(err){
        next(err);
    }
});

blogPostRoute.post("/post/:id/comments/", async (req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(post){
            post.comments.push(req.body);
            await post.save();
            res.send(post);
        }
    }catch(err){
        next(err);
    }
});

blogPostRoute.get("/post/:id/comments/", async (req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id);
        res.json(post.comments);
    }catch (err){
        next(err);
    }
});

blogPostRoute.put("/post/:id/comments/:commentId", async(req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            let comment = post.comments.id(req.params.commentId);
            if(comment){
                for(let key in req.body){
                    comment[key] = req.body[key];
                }
                await post.save();
                res.status(200).send(post.comments)
            }
        }
    }catch(err){
        next(err);
    }
});

blogPostRoute.delete("/post/:id/comments/:commentId", async(req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            let comment = post.comments.id(req.params.commentId)
            if(comment){
                post.comments.pull(comment);
                await post.save();
                res.sendStatus(204);
            }
        }
    }catch(err){
        next(err);
    }
})
