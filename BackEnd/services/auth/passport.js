// import GoogleStrategy from 'passport-google-oauth20';
// import'dotenv/config';
// import { generateJWT } from './index.js';
// import User from '../models/author.model.js';
// import passport from 'passport';

// // Opzioni per configurare il servizio Oauth di Google
// const options = {
//     clientID:process.env.G_CLIENT_ID,
//     clientSecret:process.env.G_CLIENT_SECRET,
//     callbacURL:process.env.G_CALLBACK,
// };

// // Crea un'istanza di GoogleStrategy
// const googleStrategy = new GoogleStrategy(options, async(accessToken, refreshToken, profile, passportNext)=>{
//     // Definizione di una callback che viene chiamata in fase di autenticazione
//     // Desturtturiamo l'oggetto profiel e prendiamo i dati che ci servono
//     const {email, given_name, family_name, sub, picture} = profile._json;

//     // Verifica se l'utente esiste già nel database
//     const user= await User.findOne({email});

//     if(user){
//         // Se l'utente esiste creiamoil token di accesso, utilizzando il servizio di GoogleStrategy
//         const accToken = await createAccessToken({
//             _id: user._id
//         });

//         // Chiamiamo una callback passando null come errore e accessToken come secondo parametro
//         passportNext(null, {accessToken})
//     }else{
//         // Se l'utente non esiste crea un nuovo utente
//         const newUser = new User({
//             username:email,
//             googleId:sub,
//         });

//         // Salva l'utente nel database
//         await newUser.save();

//         // Genera token
//         const accToken = await generateJWT({
//             username: newUser.username
//         });

//     }

//     try{
//     }catch (err){

//     }
// });

// export default googleStrategy;