const express = require("express");
const mongoose = require("mongoose");
const taskSchema = require("../schemas/taskSchema");


const Task = new mongoose.model("Task", taskSchema);
const taskRoute = express.Router();

// CREATE A NEW TASK FOR A SELECTED PERSON OR SELLER
taskRoute.post("/", async (req, res) => {
    const newTask = new Task(req.body);
    newTask.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Your task added successfully!",
            });
        }
    });
});


// GET ALL TASK NOT USING ANY REQUIRE OR PARAMS
taskRoute.get("/", async (req, res) => {
    await Task.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Success!",
            });
        }
    });
});


// GET A ALL TASK USING ALL BUYER EMAIL
taskRoute.get("/buyerEmail/:buyerEmail", async (req, res) => {
    await Task.find({ buyerEmail: req.params.buyerEmail }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Success!",
            });
        }
    });
});


// GET ALL TASK USING SELLER EMAIL DEPENDENCE FOR A SPECIFICS SELLER
taskRoute.get("/sellerEmail/:sellerEmail", async (req, res) => {
    await Task.find({ sellerEmail: req.params.sellerEmail }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Success!",
            });
        }
    });
});


// DELETE A SINGLE TASK USING TASK ID
taskRoute.delete("/:id", async (req, res) => {
    await Task.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "User deleted successfully!",
            });
        }
    });
});


// TASK UPDATE USING ACCEPT PARAMS
taskRoute.put("/accept/:id", async (req, res) => {
    await Task.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: "running",
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Task accept successfully!",
                });
            }
        }
    );
});
// TASK UPDATE USING COMPLETE PARAMS
taskRoute.put("/complete/:id", async (req, res) => {
    await Task.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: "complete",
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Task completed!",
                });
            }
        }
    );
});

module.exports = taskRoute;