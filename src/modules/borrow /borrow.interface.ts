import { Date, Model, Types } from "mongoose";

export interface IBorrow{
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}
//using static method in Interface
export interface BorrowStaticMethods extends Model<IBorrow> {
    borrowBook(bookId: Types.ObjectId, quantity: number): any;
}