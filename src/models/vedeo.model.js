import  Mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedeoSchema = new Schema(
    {
        vedeoFile: {
            type: String, // cloudinary url
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true,
        },
        title: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true,
        },
        duration: {
            type: Number,  // cloudinary url
            required: true,
        },
        view: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    }, 
    {timestamps: true}
);

vedeoSchema.plugin(mongooseAggregatePaginate);


export const Vedeo = Mongoose.model("Vedeo", vedeoSchema);