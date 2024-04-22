import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import { apiRoute } from './services/routes/api.route.js';
import { blogPostRoute } from './services/routes/blogPost.route.js';

// Inizializza la gestione del file .env
config();

// Crea una porta
const PORT = process.env.PORT || 3001;

// Crea il server
const app = express();

// Abilita la comunicazione con i dati JSON
app.use(express.json());

// Importa routes
app.use("/api", apiRoute);

app.use("/blog", blogPostRoute);

const initServer = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connesso al database");
        // Abilita il server
        app.listen(process.env.PORT, ()=>{
        console.log(`Server Collegato alla Porta ${PORT}`);
    });

    }catch(err){
        console.error("connessione al database fallita!", err);
    }
}

initServer();

const sendEmail = async () =>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.yopmail.com',
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL_USERNAME,
            pass: process.env.SMTP_MAIL_PASSWORD,
        },
    });

    const mailBody = '<h1>Ciao da Epicode</h1>';

    try{
        const mail = await transporter.sendMail({
            from: "Epicode Tester <es.28-api@yopmail.com>",
            to: "gutama@mail.com",
            subject: "Epicode Testing",
            html: mailBody, 
        });

        console.log(mail.messageId);
    }catch (err){
        console.log(err);
    }
    
};
