import {Router} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/author.model.js';
import { authMiddleware, generateJWT } from '../auth/index.js';
import passport from 'passport';

export const logRoute = Router();

logRoute.post("/register", async(req, res, next)=>{
    try{
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });

        // INSERIRE QUI

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


logRoute.get("/me", authMiddleware, async (req, res, next) => {
    try {
      let user = await User.findById(req.user.id)
  
      res.send(user)
    } catch (error) {
      next(error)
    }
  })

logRoute.get("/googleLogin", passport.authenticate("google", {scope: ["profile", "email"]}));

//NON VA CHIAMATA DA FRONTEND MA VIENE AUTOMATICAMENTE PRESA COME CALLBACK REQUEST DA: /google/login
logRoute.get("/callback", passport.authenticate("google", {session: false}), 
    (req, res, next)=>{
        try{
            res.redirect(`http://localhost:3000/?accessToken=${req.user.accToken}`)
        }catch (err){
            next(err)
        }
    })