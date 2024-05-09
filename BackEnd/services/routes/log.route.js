import {Router} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/author.model.js';
import { authMiddleware, generateJWT } from '../auth/index.js';

export const logRoute = Router();

// logRoute.get("/", async(req, res, next)=>{
//     try{
//         res.send("Login Page.")
//     }catch(err){
//         next(err);
//     }
// });

logRoute.post("/register", async(req, res, next)=>{
    try{
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });

        // sendEmail(`<h1>${req.body.username} ti sei registrato correttamente.</h1>`, req.body.email);

        res.send(user);
    }catch(err){
        next(err);
    }
});

logRoute.post("/login", async(req, res, next)=>{
    try{
        let userFound = await User.findOne({email:req.body.email});
        if(userFound){
            const isPasswordMatching = await bcrypt.compare(req.body.password, userFound.password);
            if(isPasswordMatching){
                const token = await generateJWT({
                    _id: userFound._id
                });
                res.send({user: userFound, token});
            }else{
                res.status(400).send("Password sbagliata.");
            }
        }else{
            res.status(400).send("Utente non trovato");
        }
    }catch(err){
        next(err);
    }
});

logRoute.get("/profile", authMiddleware, async (req, res, next)=>{
    try{
        let user = await User.findById(req.user.id);
        res.send(user);
    }catch(err){
        next(err);
    }
})