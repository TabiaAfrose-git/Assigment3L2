import { Request, request, Response } from "express";
import Book from "./book.model";


//1. Create Book
const createBook = async(req: Request, res: Response) =>{
    try{
        const payload = req.body
        const book = new Book(payload)
        const data =  await book.save()
        res.send({
            success: true,
            Message: "Book created successfully",
            data,
        });
    }catch (error) {
            res.send({
                success: false,
                Message: "Error",
                error,
            });
        }
};

//2. Get All Books
const getAllBooks = async(req: Request, res: Response) =>{
    try{
        const genre = req.query.genre;
        /*

        //filter: Filter by genre
        const data = await Book.find({genre: "FANTASY"})

        // sort: asc or desc
         const data = await Book.find().sort({"genre": "asc"})

        //limit: Number of results (default: 10)
            const data = await Book.find().limit(10)
        */
        const data = await Book.find()

        res.send({
            success: true,
            Message: "Books retrieved successfully",
            data,
        });
    }catch (error) {
            res.send({
                success: false,
                Message: "Error",
                error,
            });

        }

};

//3.Get Book by ID
const getBookByID = async(req: Request, res: Response) =>{
    try {
        const bookId = req.params.bookId
        const data = await Book.findById(bookId);

        res.send({
            success: true,
            Message: "Book retrieved successfully",
            data,
    });

    } catch (error) {
            res.send({
                success: false,
                Message: "Error",
                error,
            });

        }

}

//4. Update Book
const updateBook =  async(req: Request, res: Response) =>{
    try {
        const bookId = req.params.bookId
        const data = await Book.findByIdAndUpdate(bookId, req.body,{new: true});
            res.send({
            success: true,
            Message: "Book updated successfully",
            data,
        });


    } catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });

    }

}

//5. Delete Book

const deleteBook = async(req: Request, res: Response) =>{
    try {
        const bookId = req.params.bookId
        const data = await Book.findByIdAndDelete(bookId);
           res.send({
            success: true,
            Message: "Book deleted successfully",
            data,
        });


    } catch (error) {
         res.send({
            success: false,
            Message: "Error",
            error,
        });
    }

}


export{createBook, getAllBooks, getBookByID, updateBook, deleteBook}