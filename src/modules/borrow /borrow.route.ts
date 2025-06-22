import { Router } from "express";
import { BorrowABook, BorrowedBooksSummary } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/borrow",BorrowABook)
borrowRoute.get("/borrow",BorrowedBooksSummary)


export default borrowRoute;