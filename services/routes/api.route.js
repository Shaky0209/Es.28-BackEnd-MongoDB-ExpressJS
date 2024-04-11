import { Router } from 'express';
import Author from '../models/author.model.js';

export const apiRoute = Router();

apiRoute.get("/authors", async (req, res)=>{
    let author = await Author.find();
    res.json(author);
});

apiRoute.get("/authors/:id", async (req, res)=>{
    let author = await Author.findByIdAndUpdate(req.params.id);
    res.json(author);
});

apiRoute.post("/authors", async (req, res, next) =>{
    try{
        let author = await Author.create({
            name:req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            dateOfBirth:req.body.dateOfBirth,
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

apiRoute.delete("/authors/:id", async (req, res, next) =>{
    try{
        await Author.deleteOne({
            _id: req.params.id
        });
        res.send(204);
    }catch (err){
        next(err);
    }
});



// apiRoute.get("/", async (req, res) => {
    //     res.send("Sei nella route principale API");
    // });
    
// apiRoute.post("/:name", async (req, res)=>{
//     res.send(req.params.name);
// })
