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

            surname:{
                type:"String",
                require: true,
            },

            avatar: {
                type: "String",
                require: true,
            },

            _id: {
                type: Schema.Types.ObjectId,
                ref:"Author"
            }
            
        },

        content: {
            type: "String",
            require: true,
        },

        comments: [
            {
                author:{
                    type: Schema.Types.ObjectId,
                    ref: "Post",
                },

                description:{
                    type:"String",
                    required: true,
                }
            }
        ],
    },
   "blogpost"
   
)

export default model ("blogPost", blogPostSchema);