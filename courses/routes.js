import Database from "../Database/index.js";
function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    //if there is a get request to /api/courses (matches the url in the front end)
    const courses = Database.courses; //then i am going to send back the courses from the database
    res.send(courses);
  });
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.courses.findIndex((course) => course._id === id);
    if (index === -1) {
      res.status(404).send("Course not found");
      return;
    }
    Database.courses.splice(index, 1);
    res.json(204);
  });

  app.post("/api/courses", (req, res) => {
    const newCourse = { ...req.body, _id: new Date().getTime().toString() };
    //Database.courses.push(newCourse);
    Database.courses.unshift(newCourse); //puts at the beggining of the array
    res.send(newCourse);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.courses.findIndex((course) => course._id === id);
    if (index === -1) {
      res.status(404).send("Course not found");
      return;
    }
    Database.courses[index] = {
      ...Database.courses[index],
      ...req.body,
    };
    res.json(200);
  });

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((course) => course._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  });
} //end of function

export default CourseRoutes;
