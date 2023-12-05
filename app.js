//const express = require('express');   //old syntax
import express from "express"; //new syntax
import session from "express-session";
import HelloRoutes from "./hello.js"; //need full path.js
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import "dotenv/config"; // use different front end URL in dev and in production

import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas"); //connect to the database

const app = express(); //create an express intance

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
); //use cors
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json()); // must be AFTER session configuration

ModuleRoutes(app);
CourseRoutes(app); //call the function
Lab5(app); //call the function
HelloRoutes(app); //call the function
UserRoutes(app); //call UserRoutes function

app.listen(process.env.PORT || 4000); //uses the PORT environment variable if available,
// or uses 4000 otherwise when running locally
