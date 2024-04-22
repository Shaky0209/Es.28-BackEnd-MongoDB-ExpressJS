import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'; //importiamo v2 e la utiliziamo sotto il nome di cloudinary

//configurazione di cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const options = {
    //Quale storage andare ad utilizzare per il submit del file
    storage: new ColoudinaryStorage({
        cloudinary,
        params: {
            folder:"avatars", // Quale cartella deve essere utilizzata per la storage dentro a Cloudinary
        },
    }),
};

export default multer(options).single("avatar");