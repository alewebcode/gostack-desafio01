const express = require("express");

const server = express();

server.use(express.json());

projects = [];
let requests = 0;

server.use((req, res, next) => {
  requests = requests + 1;

  console.log("Quantidade de requisições " + requests);

  next();
});

function checkId(req, res, nex) {
  const { id } = req.params;

  if (projects.findIndex(obj => obj.id == id) == -1) {
    return res.status(400).json({ error: "ID não encontrado" });
  }

  /*if (!res.body.id) {
    return res.status(400).json({ error: "ID não encontrado" });
  }*/
}

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const arr = { id, title, tasks: [] };

  projects.push(arr);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //const index = projects.indexOf(id);
  var index = projects.findIndex(obj => obj.id == id);

  projects[index].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;

  var index = projects.findIndex(obj => obj.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  var index = projects.findIndex(obj => obj.id == id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
