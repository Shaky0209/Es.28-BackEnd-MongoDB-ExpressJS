import GoogleStrategy from 'passport-google-oauth20';
import'dotenv/config';
import { generateJWT } from './index.js';
import User from '../models/author.model.js';


// Opzioni per configurare il servizio Oauth di Google
const options = {
    // ClientID preso dalla console di google alla registrazione dell'applicazione
    clientID:process.env.G_CLIENT_ID,
    // Client Secret preso dalla console di google alla registrazione dell'applicazione
    clientSecret:process.env.G_CLIENT_SECRET,
    // Callback da eseguire quando un'utente effettua l'autenticazione all'endpoint
    callbackURL:process.env.G_CALLBACK,
};

// Crea un'istanza di GoogleStrategy
const googleStrategy = new GoogleStrategy(options, async(accessToken, refreshToken, profile, passportNext)=>{
    // Definizione di una callback che viene chiamata in fase di autenticazione
    // Desturtturiamo l'oggetto profiel e prendiamo i dati che ci servono
    const {email, given_name, family_name, sub, picture} = profile._json;
    try{
        // Verifica se l'utente esiste già nel database
        const user= await User.findOne({email});

        if(user){
            // Se l'utente esiste creiamoil token di accesso, utilizzando il servizio di GoogleStrategy
            const accToken = await generateJWT({
                _id: user._id
            });

            // Chiamiamo una callback passando null come errore e accessToken come secondo parametro
            passportNext(null, {accToken})
        }else{
            // Se l'utente non esiste crea un nuovo utente
            const newUser = new User({
                name: "Your Name",
                surname: "YourSurname",
                email:email,
                password:sub,
                googleId:sub,
                dateOfBirth: "01/01/1990",
                avatar: "https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg",
                posts:[],
            });

            // Salva l'utente nel database
            await newUser.save();

            // Genera token
            const accToken = await generateJWT({
                _id: newUser._id
            });

            passportNext(null, {accToken})
        }
    }catch (err){
        passportNext(err)
    }
});

export default googleStrategy;