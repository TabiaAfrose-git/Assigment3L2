"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/borrow", borrow_controller_1.BorrowABook);
borrowRoute.get("/borrow", borrow_controller_1.BorrowedBooksSummary);
exports.default = borrowRoute;
