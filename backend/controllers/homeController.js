import Register from "../models/register.js";
import ErrorResponse from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from 'express-async-handler';


const getStudents = asyncHandler(async (req, res) => {
    const students = await Register.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "rollNo",
                foreignField: "rollNo",
                as: "student",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            department: 1,
                            hostel: 1,
                            contact: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$student"
        },
        {
            $addFields: {
                name: "$student.name",
                department: "$student.department",
                hostel: "$student.hostel",
                contact: "$student.contact"
            }
        },
        {
            $project: {
                student: 0
            }
        },
        {
            $sort: {
                outDateAndTime: -1
            }
        }
    ])
    if (!students) {
        throw new ErrorResponse(400, "No students found")
    }

    return res.status(200).json(
        new ApiResponse(200, students)
    );
});

const getOutStudents = asyncHandler(async (req, res) => {
    const students = await Register.aggregate([
        {
            $match: {
                inDateAndTime: null
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "rollNo",
                foreignField: "rollNo",
                as: "student",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            department: 1,
                            hostel: 1,
                            contact: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$student"
        },
        {
            $addFields: {
                name: "$student.name",
                department: "$student.department",
                hostel: "$student.hostel",
                contact: "$student.contact"
            }
        },
        {
            $project: {
                student: 0
            }
        },
        {
            $sort: {
                outDateAndTime: -1
            }
        }
    ])

    if (!students) {
        throw new ErrorResponse(400, "No students found")
    }

    return res.status(200).json(
        new ApiResponse(200,students)
    )
})

const getEntriesByDate = asyncHandler(async (req, res) => {
    const { date } = req.body;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const students = await Register.aggregate([
        {
            $match: {
                outDateAndTime: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "rollNo",
                foreignField: "rollNo",
                as: "student",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            department: 1,
                            hostel: 1,
                            contact: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$student"
        },
        {
            $addFields: {
                name: "$student.name",
                department: "$student.department",
                hostel: "$student.hostel",
                contact: "$student.contact"
            }
        },
        {
            $project: {
                student: 0
            }
        },
        {
            $sort: {
                outDateAndTime: -1
            }
        }
    ])
    
    if (!students) {
        throw new ErrorResponse(400, "No students found")
    }

    return res.status(200).json(
        new ApiResponse(200, students)
    )
})

export { getStudents, getOutStudents, getEntriesByDate }