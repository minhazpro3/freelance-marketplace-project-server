const express = require("express");
const mongoose = require("mongoose");
const reviewSchema = require("../schemas/reviewSchema");

const Review = new mongoose.model("Review", reviewSchema);

const reviewRoute = express.Router();

reviewRoute.post("/", async (req, res) => {
  console.log(req.body);
  const newReview = new Review(req.body);
  newReview.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Your review is published!",
      });
    }
  });
});
// GET ALL Review
reviewRoute.get("/", async (req, res) => {
    await Review.find({}, (err, data) => {
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
// GET Review by buyer email
reviewRoute.get("/buyerEmail/:buyerEmail", async (req, res) => {
  await Review.find({ buyerEmail: req.params.buyerEmail }, (err, data) => {
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
// Get review by seller email
// GET A SINGLE BY --EMAIL-- USERS__
reviewRoute.get("/sellerEmail/:sellerEmail", async (req, res) => {
  await Review.find({ sellerEmail: req.params.sellerEmail }, (err, data) => {
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

module.exports = reviewRoute;
