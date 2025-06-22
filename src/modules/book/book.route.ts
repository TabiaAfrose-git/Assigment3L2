import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookByID, updateBook } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/books", createBook)
bookRoute.get("/books", getAllBooks)
bookRoute.get("/books/:bookId", getBookByID)
bookRoute.patch("/books/:bookId",updateBook)
bookRoute.delete("/books/:bookId",deleteBook)


export default bookRoute;