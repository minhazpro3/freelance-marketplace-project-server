const express = require("express");
const multer = require("multer");
const authSchema = require("../schemas/authSchema");
const mongoose = require("mongoose");
const authRoute = express.Router();
const User = new mongoose.model("User", authSchema);
const cloudinary = require("../utils/cloudinry");
const upload = require("../utils/multer");
const { append } = require("express/lib/response");

// CREATE A NEW USER___
authRoute.post("/", async (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "User create successfully!",
      });
    }
  });
});
// GET ALL USERS__
authRoute.get("/", async (req, res) => {
  await User.find({}, (err, data) => {
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
// GET A SINGLE BY --EMAIL-- USERS__
authRoute.get("/email/:email", async (req, res) => {
  await User.find({ email: req.params.email }, (err, data) => {
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
// GET A SINGLE BY --EMAIL-- USERS__
authRoute.get("/status/:email", async (req, res) => {
  await User.find({ email: req.params.email }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error!!",
      });
    } else {
      res.status(200).json({
        status: data[0]?.status,
        message: "Success!!",
      });
    }
  });
});
authRoute.get("/:id", async (req, res) => {
  await User.find({ _id: req.params.id }, (err, data) => {
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
// DELETE A SINGLE USER BY ID__
authRoute.delete("/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
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
// UPDATE USER ABOUT___
authRoute.put("/about/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        about: req.body.about,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "About update successfully!",
        });
      }
    }
  );
});
// UPDATE USER SKILLS___
authRoute.put("/skills/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        skills: req.body.skills,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Skills update successfully!",
        });
      }
    }
  );
});
// UPDATE USER EDUCATION__
authRoute.put("/education/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        education: req.body.education,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Education update successfully!",
        });
      }
    }
  );
});
// UPDATE USER PROFESSION__
authRoute.put("/profession/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        profession: req.body.profession,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!!",
        });
      } else {
        res.status(200).json({
          message: "Profession update successfully!!",
        });
      }
    }
  );
});
// UPDATE USER BIO__
authRoute.put("/bio/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        bio: req.body.bio,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!!",
        });
      } else {
        res.status(200).json({
          message: "Bio update successfully!",
        });
      }
    }
  );
});
// Image upload__
// authRoute.post("/uploaded", , async (req, res) => {
//   try {

//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// })
// UPDATE USER AVATAR__
authRoute.put("/avatar/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        avatar: req.body.image,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!!",
        });
      } else {
        res.status(200).json({
          message: "User profile Avatar update successfully!!",
        });
      }
    }
  );
});
// authRoute.put("/avatar/:id", upload.single("image"), async (req, res) => {
//   const result = await cloudinary.uploader.upload(req.file.path);
//   await User.updateOne({ _id: req.params.id }, {
//     $set: {
//       avatar: result.secure_url,
//       cloudinary_avatar_id: result.public_id
//     }
//   }, (err) => {
//     if (err) {
//       res.status(500).json({
//         error: "There was a server side error!!"
//       })
//     } else {
//       res.status(200).json({
//         message: "Profile Pic update successfully!"
//       })
//     }
//   })
// })
// UPDATE USER THUMBNAIL__
authRoute.put("/banner/:id", async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        image: req.body.image,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!!",
        });
      } else {
        res.status(200).json({
          message: "User profile thumbnail update successfully!!",
        });
      }
    }
  );
});
// authRoute.put("/banner/:id", upload.single("image"), async (req, res) => {
//   const result = await cloudinary.uploader.upload(req.file.path);
//   await User.updateOne({ _id: req.params.id }, {
//     $set: {
//       image: result.secure_url,
//       cloudinary_banner_id: result.public_id
//     }
//   }, (err) => {
//     if (err) {
//       res.status(500).json({
//         error: "There was a server side error!!"
//       })
//     } else {
//       res.status(200).json({
//         message: "User profile thumbnail update successfully!!"
//       })
//     }
//   })
// })

// CREATE OR UPDATE SELLER LEVEL_____
//  SET LEVEL ONE___
authRoute.put("/level/one/:email", async (req, res) => {
  console.log(req.params.email);
  await User.updateOne(
    { email: req.params.email },
    {
      $set: {
        level: "one",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Seller level one add successfully!",
        });
      }
    }
  );
});
//  SET LEVEL TWO___
authRoute.put("/level/two/:email", async (req, res) => {
  console.log(req.params.email);
  await User.updateOne(
    { email: req.params.email },
    {
      $set: {
        level: "two",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Seller level Two add successfully!",
        });
      }
    }
  );
});
//  SET LEVEL TOP___
authRoute.put("/level/top/:email", async (req, res) => {
  console.log(req.params.email);
  await User.updateOne(
    { email: req.params.email },
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
          message: "Seller level Top add successfully!",
        });
      }
    }
  );
});
//  CREATE ADMIN GET ADMIN AND DELETE ADMIN FROM HERE_____
//  Create a new admin___
authRoute.put("/admin/:email", async (req, res) => {
  console.log(req.params.email);
  await User.updateOne(
    { email: req.params.email },
    {
      $set: {
        admin: "admin",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Admin create successfully!",
        });
      }
    }
  );
});
// Get and  access check
authRoute.get("/admin/:email", async (req, res) => {
  await User.find({ email: req.params.email }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was server side error!",
      });
    } else {
      if (data[0]?.admin === "admin") {
        res.status(200).json({
          isAdmin: data[0]?.admin,
          access: true,
          message: "Check admin get successfully!",
        });
      } else {
        res.status(200).json({
          isAdmin: data[0]?.admin,
          access: false,
          message: "Check admin get successfully!",
        });
      }
    }
  });
});
//  Remove a admin
authRoute.put("/remove/admin/:email", async (req, res) => {
  console.log(req.params.email);
  await User.updateOne(
    { email: req.params.email },
    {
      $set: {
        admin: "wasAdmin",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Admin deleted successfully!",
        });
      }
    }
  );
});

module.exports = authRoute;
// Welcome to gsb soft
