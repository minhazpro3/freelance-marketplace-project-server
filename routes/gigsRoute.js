const express = require("express");
const mongoose = require("mongoose");
const gigsSchema = require("../schemas/gigsSchema");
const gigsRoute = express.Router();
const Gig = new mongoose.model("Gig", gigsSchema);

// CREATE A NEW Gig___
gigsRoute.post("/", async (req, res) => {
  const newUser = new Gig(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Gig create successfully!",
      });
    }
  });
});
// GET ALL GIGS
gigsRoute.get("/", async (req, res) => {
  await Gig.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error!!!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success!!",
      });
    }
  });
});
// GET TOP LEVEL GIGS
gigsRoute.get("/top", async (req, res) => {
  await Gig.find({level: "top"}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error!!!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success!!",
      });
    }
  });
});
// GET A SINGLE GIG BY HELP OF GIG ID
gigsRoute.get("/:id", async (req, res) => {
  await Gig.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error!!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success!!",
      });
    }
  });
});
// GET TOP LEVEL GIGS

// CREATE TOP LEVEL GIG---
gigsRoute.put("/top/:id", async (req, res) => {
  await Gig.updateOne(
    { _id: req.params.id },
    {
      $set: {
        level: "top",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Top level gig add successfully!",
        });
      }
    }
  );
});
// REMOVE FROM TOP LEVEL GIG
gigsRoute.put("/remove/top/:id", async (req, res) => {
  await Gig.updateOne(
    { _id: req.params.id },
    {
      $set: {
        level: "wasTop",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Remove Top level gig successfully!",
        });
      }
    }
  );
});
module.exports = gigsRoute;
