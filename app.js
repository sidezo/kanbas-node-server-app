//const express = require('express');   //old syntax
import express from "express"; //new syntax
import HelloRoutes from "./hello.js"; //need full path.js
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js"; 
import "dotenv/config"; // use different front end URL in dev and in production

const app = express(); //create an express intance

app.use(cors()); //use cors
app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app); //call the function
Lab5(app); //call the function
HelloRoutes(app); //call the function

app.listen(process.env.PORT || 4000); //uses the PORT environment variable if available,
                                        // or uses 4000 otherwise when running locally 
