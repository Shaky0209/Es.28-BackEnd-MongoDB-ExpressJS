import  {Schema, model} from "mongoose";

const postSchema = new Schema(
    
    {
        image:{
            type: "String",
            required: true,
        },

        description: {
            type: "String",
            required: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "Author",
        },
    },
    {
        collection: "posts",
        timestamps: true,
    }
);

export default model("Post", postSchema);