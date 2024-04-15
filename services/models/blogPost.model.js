import {Schema, model} from 'mongoose';

const blogPostSchema = new Schema(
    {
        category:{
            type: "String", 
            require: true, 
        },

        title:{
            type: "String", 
            require: true, 
        },

        cover:{
            type: "String", 
            require: true, 
        },
        
        readTime: {
            value: {
                type: "String",
                require: true,
            },
            unit: {
                type: "String",
                require: true,
            }
        },
        
        author: {
            name: {
                type:"String",
                require: true,
            },

            avatar: {
                type: "String",
                require: true,
            },
            
        },

        content: {
            type: "String",
            require: true,
        }
    },
    "blogPost"
    
)

export default model ("blogPost", blogPostSchema);