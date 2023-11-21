console.log("Hello, World!");

// here, there is no dom

function HelloRoutes(app) {
  app.get("/", (req, res) => {
    //create a route
    res.send("Hello World, welcome to webdev,test"); //send a response
  });

  app.get("/about", (req, res) => {
    //create a route
    res.send("This is the about page"); //is you put /about in the url
    // after 4000, you will get this response
  });
}


export default HelloRoutes; //export the module
