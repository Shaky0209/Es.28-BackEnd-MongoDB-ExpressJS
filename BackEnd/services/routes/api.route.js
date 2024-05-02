import { Router } from 'express';
import Author from '../models/author.model.js';
import cloudinaryMiddleware from '../middlewares/multerAuthor.js';

export const apiRoute = Router();

apiRoute.get("/authors", async (req, res)=>{
    let author = await Author.find();
    res.json(author);
});

apiRoute.get("/authors/:id", async (req, res)=>{
    let author = await Author.findByIdAndUpdate(req.params.id);
    res.json(author);
});

apiRoute.get("/authors/:id/comments/", async(req, res, next)=>{
    try{
        let author = await Author.findById(req.params.id);
        res.json(author.posts);
    }catch (err){
        next(err);
    }
});

apiRoute.post("/authors", async (req, res, next) =>{
    try{
        let author = await Author.create({
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            dateOfBirth:req.body.dateOfBirth,
            avatar:req.body.avatar,
        });
        res.send(author).status(200);
    }catch (err){
        next(err);
    }
});

apiRoute.put("/authors/:id", async (req, res, next)=>{
    try{
        let setAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //l'oggetto restituito deve essere quello aggiornato
        });
        res.send(setAuthor);
    }catch (err){
        next(err);
    }
    
});

apiRoute.patch("/authors/:id/link/avatar", async (req, res, next) =>{
    try{
        //andiamo a prendere l'utente con l'id specifico e andiamo ad aggiornatre la sua proprietà avatar
        //con {new: true,} stiamo dicendo di restituirci la versione più aggiornata del documento
        let setAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true,});
        //mandiamo come risposta l'utente aggiornato
        res.send(setAuthor);
    }catch(error){
        //Gestione di eventuali errori
        next(error);
    }
})

apiRoute.patch("/authors/:id/file/avatar", cloudinaryMiddleware, async (req, res, next) =>{
    try{
        //andiamo a prendere l'utente con l'id specifico e andiamo ad aggiornatre la sua proprietà avatar
        //con {new: true,} stiamo dicendo di restituirci la versione più aggiornata del documento
        let updateAvatar = await Author.findByIdAndUpdate(
            req.params.id,
            {avatar: req.file.path},
            {new: true,}
        );
        //mandiamo come risposta l'utente aggiornato
        res.send(updateAvatar);
    }catch(error){
        //Gestione di eventuali errori
        next(error);
    }
})

apiRoute.delete("/authors/:id", async (req, res, next) =>{
    try{
        await Author.deleteOne({_id: req.params.id});
        res.send(204);
    }catch (err){
        next(err);
    }
});