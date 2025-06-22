import { model, Schema } from "mongoose";


const bookSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true},
    author:{ type: String, required: true, trim: true},
    genre: { type: String,
            required: true,
            trim: true,
            enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: '{VALUE} is not a valid genre'
            }
        },
    isbn: { type: String, required: true, trim: true, unique: true},
    description: { type: String, trim: true},
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be an integer'
        }
    },
    available: { type: Boolean,  default: true},

},{timestamps: true, versionKey: false }
);



const Book = model<IBook>("book", bookSchema);
export default Book;