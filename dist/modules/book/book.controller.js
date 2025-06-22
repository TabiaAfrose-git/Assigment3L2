"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookByID = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
//1. Create Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const book = new book_model_1.default(payload);
        const data = yield book.save();
        res.send({
            success: true,
            Message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });
    }
});
exports.createBook = createBook;
//2. Get All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = req.query.genre;
        /*

        //filter: Filter by genre
        const data = await Book.find({genre: "FANTASY"})

        // sort: asc or desc
         const data = await Book.find().sort({"genre": "asc"})

        //limit: Number of results (default: 10)
            const data = await Book.find().limit(10)
        */
        const data = yield book_model_1.default.find();
        res.send({
            success: true,
            Message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });
    }
});
exports.getAllBooks = getAllBooks;
//3.Get Book by ID
const getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
        res.send({
            success: true,
            Message: "Book retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });
    }
});
exports.getBookByID = getBookByID;
//4. Update Book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, { new: true });
        res.send({
            success: true,
            Message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });
    }
});
exports.updateBook = updateBook;
//5. Delete Book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(bookId);
        res.send({
            success: true,
            Message: "Book deleted successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            Message: "Error",
            error,
        });
    }
});
exports.deleteBook = deleteBook;
