import express from 'express';
import {config} from 'dotenv';
import mongoose from 'mongoose';
import { apiRoute } from './services/routes/api.route.js';

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