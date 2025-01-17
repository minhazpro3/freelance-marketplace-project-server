const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const gigsRoute = require("./routes/gigsRoute");
const reviewRoute = require("./routes/reviewRoute");
const taskRoute = require("./routes/taskRoute");
// App initialization here__
const app = express();
app.use(express.json());


const corsOptions = {
  origin: ["http://localhost:3000/*", "https://freelance-marketplace-project-client.vercel.app/*"]
}
app.use(cors(corsOptions));
// const corsOptions = {
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Acces-Control-Allow-Origin', '*');
//   res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
//   next();
// })
app.set("view engine", "ejs");
main().catch(err => console.log(err));
async function main() {
  // Database connection with mongoose___
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connection successfully!"))
    .catch(err => console.log(err))

  // All Routes Here__
  app.use("/auth/users", authRoute);
  app.use("/auth/gigs", gigsRoute);
  app.use("/auth/reviews", reviewRoute)
  app.use("/auth/task", taskRoute);
  // Find hello
  // Main page or Home page__
  app.get("/", (req, res) => {
    res.render('pages/home')
  })
}

// Hello error
// Hello error
// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({ error: err })
// }

app.listen(port, (req, res) => {
  console.log(`Server is running in port no ${port}`);
})
// All is well
// thanks too
// thanks
// endgamesecuremarketplace
// fg1UOjQEJMpH6Bqv
// mongodb+srv://freelancemarketplace:wakibnSm5GKQDbKv@cluster0.wnq6s.mongodb.net/marketplaceFreelance?retryWrites=true&w=majority
// MONGO_URL=mongodb://localhost:27017/endgameproject
// all is well
// Hello everyone