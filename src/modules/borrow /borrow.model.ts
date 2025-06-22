import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "./borrow.interface";
import Book from "../book/book.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>({
    book: {
        type: Schema.Types.ObjectId,
        ref:"book",
        required: true},
    quantity:{
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
        validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer'
        }
    },
    dueDate:{
        type: Date,
        required: true
    }
},{ timestamps: true,  versionKey: false  });


//Using Static method in modele for Borrow book handling (quantity, available, Save the borrow record)

borrowSchema.static("borrowBook", async function borrowBook(bookId: string, quantity: number) {

    const book = await Book.findById(bookId);
    if(!book) throw new Error("Book Not Found")

    if (book.copies < quantity) {
        throw new Error('Not enough copies available');
    }
    book.copies -= quantity;

    if (book.copies === 0) {
        book.available = false;
    }
    await book.save();
    return book.copies;

})

const Borrow = model<IBorrow,BorrowStaticMethods>("Borrow", borrowSchema);
export default Borrow;