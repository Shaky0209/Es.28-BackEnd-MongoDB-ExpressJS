import {Schema, model} from 'mongoose';

const authorSchema = new Schema(
    {
        name:{
            type: "String", 
            require: true, 
        },
        surname:{
            type: "String", 
            require: true, 
        },
        email:{
            type: "String", 
            require: true, 
        },
        dateOfBirth:{
            type: "String", 
            require: true, 
        },

        avatar:{
            type: "String",
            require: false,
        },

        posts:[
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            }
        ]
    
    },
    "Author", 
    
);


// Esportiamo un modello chiamato "user" che rispecchi lo schema "userSchema"
export default model ("Author", authorSchema);

/* TIPI DI DATO UTILIZZABILI

    String
    Number
    Boolean
    Array
    Buffer
    Date
    ObjectId
    UUID
*/