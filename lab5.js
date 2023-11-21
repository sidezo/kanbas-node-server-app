function Lab5(app) {
  const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };

  const todos = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
      description: "Description 1",
      due: "2021-10-10",
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
      description: "Description 2",
      due: "2021-10-10",
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
      description: "Description 3",
      due: "2021-10-10",
    },
    {
      id: 4,
      title: "Task 4",
      completed: false,
      description: "Description 4",
      due: "2021-10-10",
    },
  ];

  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    //update completed
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed === "true";
    res.json(todos);
  });

  app.get("/a5/todos/:id/description/:description", (req, res) => {
    //update description
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    //update title
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1); //finds the index of todo and removes one element from that index
    res.json(todos);
  });

  app.put("/a5/todos/:id", (req, res) => {
    //put is used to update
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.res
        .status(404)
        .json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

    if (  //this is to check if the request body is valid
      !req.body.title ||
      !req.body.description ||
      !req.body.due ||
      typeof req.body.completed !== "boolean"
    ) {
      return res.status(400).send("Invalid request data");
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });

  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.res
        .status(404)
        .json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      //body is a todo object
      ...req.body, //passed by response = await axios.post(API, todo);
      id: new Date().getTime(), //generate a unique id
    };
    todos.push(newTodo);
    res.json(newTodo); //responnse with the new Object, not entire array
  });

  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "New Description",
      due: "2021-10-10",
    };
    todos.push(newTodo); //add newTodo to todos array
    res.json(todos); //response with the entire array
  });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    res.json(todo);
  });

  app.get("/a5/todos", (req, res) => {
    //query string is the part of url after ? e.g ?completed=true
    const { completed } = req.query;
    if (completed) {
      const comp = completed === "true";
      const t = todos.filter((todo) => todo.completed === comp); //this will return an array as t
      res.json(t);
      return;
    }
    res.json(todos);
  });

  app.get("/a5/assignment", (req, res) => {
    res.json(assignment); //server tell browser default as Json format
  });

  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title); //server tell browser default as Json format
  });
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params; // object destructing, modern way to extract properties from an object
    assignment.title = newTitle;
    res.send(assignment);
  });
  // extra credit
  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params; // object destructing, modern way to extract properties from an object,
    //we are destructing route parameters from the url
    assignment.score = parseInt(newScore);
    res.send(assignment);
  });
  app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params; // object destructing, modern way to extract properties from an object,
    //we are destructing route parameters from the url
    assignment.completed = newCompleted === "true"; //convert string to boolean
    res.send(assignment);
  });

  const hello = (req, res) => {
    res.send("Welcome to lab 5!"); //server tell browser default as html format
  };

  app.get("/a5", hello);

  app.get("/a5/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
  });

  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to lab 5!");
  });
  //http://localhost:4000/a5/calculator?a=1&b=2&operation=add
  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(`${result.toString()} is the answer`); //here, we convert the result to string
  }); //so that browsers don't confuse it as error code e.g(404)

  app.get("/a5/add/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    //res.send(` ${a} + ${b} is ${a + b}`);
    res.send(`${a + b}`);
  });

  app.get("/a5/subtract/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(` ${a - b}`);
  });
}
export default Lab5; //
