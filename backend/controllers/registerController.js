import Register from "../models/register.js";
import ErrorResponse from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from 'express-async-handler';
import Student from "../models/student.js";

const createOutEntry = asyncHandler(async (req, res) => {
    const { rollNo } = req.body;
    const userExist = await Student.findOne({ rollNo });
    if (!userExist) {
        return res.status(404).json(
            new ApiResponse(404, "", `No student found || Roll No: ${rollNo}`)
        );
    }

    const existingOutEntry = await Register.findOne({
        $and: [
            { rollNo },
            { inDateAndTime: "" }
        ]
    });
    if (existingOutEntry) {
        return res.status(409).json(
            new ApiResponse(409, "", `Student already out of the campus || Roll No: ${rollNo}`)
        );
    }

    const outEntry = await Register.create({ rollNo });
    if (!outEntry) {
        throw new ErrorResponse(400, "Out entry failed");
    }

    return res.status(200).json(
        new ApiResponse(200, "", `Out entry successfully created || Roll No: ${rollNo}`)
    );
});


const createInEntry = asyncHandler(async (req, res) => {
    const { rollNo } = req.body;

    const userExist = await Student.findOne({ rollNo });
    if (!userExist) {
        return res.status(404).json(
            new ApiResponse(404, "", `No student found || Roll No: ${rollNo}`)
        );
    }

    const existingOutEntry = await Register.findOne({
        $and: [
            { rollNo },
            { inDateAndTime: "" }
        ]
    });
    if (!existingOutEntry) {
        return res.status(409).json(
            new ApiResponse(409, "", `No out entry found || Roll No: ${rollNo}`)
        );
    }

    const inEntry = await Register.findOneAndUpdate(
        { rollNo, inDateAndTime: "" },
        { inDateAndTime: Date.now() },
        { new: true }
    );
    if (!inEntry) {
        throw new ErrorResponse(400, "In entry failed");
    }

    return res.status(200).json(
        new ApiResponse(200, "", `In entry successfully created || Roll No: ${rollNo}`)
    );
});


export {createInEntry, createOutEntry};