import { Request, Response } from "express";
import Borrow from "./borrow.model";
import { ErrorRequestHandler } from 'express';

//6. Borrow a Book
const BorrowABook = async(req: Request, res: Response) =>{
try {

    const body = req.body

    //Call static method in controller
    const check = await Borrow.borrowBook(body.book, body.quantity)
    //console.log(check);

    const borrow = await Borrow.create(body)

        res.send({
        success: true,
        Message: "Book borrowed successfully",
        data: borrow,
    });

} catch (error) {
            res.send({
                success: false,
                Message: "Error",
                error,
            });

        }
}

//7. Borrowed Books Summary (Using Aggregation)

const BorrowedBooksSummary = async(req: Request, res: Response) =>{

try {
    //const data = await Borrow.find().populate("book")

    const summary = await Borrow.aggregate([
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

} catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrow summary",
    });

        }
}

export{BorrowABook, BorrowedBooksSummary}
