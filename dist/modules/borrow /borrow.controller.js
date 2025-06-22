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
exports.BorrowedBooksSummary = exports.BorrowABook = void 0;
const borrow_model_1 = __importDefault(require("./borrow.model"));
//6. Borrow a Book
const BorrowABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        //Call static method in controller
        const check = yield borrow_model_1.default.borrowBook(body.book, body.quantity);
        //console.log(check);
        const borrow = yield borrow_model_1.default.create(body);
        res.send({
            success: true,
            Message: "Book borrowed successfully",
            data: borrow,
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
exports.BorrowABook = BorrowABook;
//7. Borrowed Books Summary (Using Aggregation)
const BorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const data = await Borrow.find().populate("book")
        const summary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.send({
            success: true,
            Message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrow summary",
        });
    }
});
exports.BorrowedBooksSummary = BorrowedBooksSummary;
