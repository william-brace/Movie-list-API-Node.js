const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

const genres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Horror",
  },
];

app.get("/api/genres", (req, res) => {
  const myGenres = genres;
  if (!myGenres) return res.status(404).send("Genres not found");

  res.send(myGenres);
});

app.get("/api/genres/:id", (req, res) => {
  //Find genre with id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //if it doesnt exist return 404
  if (!genre) return res.status(404).send("Genre with given id was not found!");

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  //validate request body - minimum 3 characters for name
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create new genre object
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  //Find genre with id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //if it doesnt exist return 404
  if (!genre) return res.status(404).send("Genre with given id was not found!");

  //validate req body
  const { error } = validateBody(req.body);
  //if error return 400
  if (error) return res.status(400).send(error.details[0].message);

  //set genre name to req,body.name
  genre.name = req.body.name;
  //send updated genre back
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  //Find genre with id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //if it doesnt exist return 404
  if (!genre) return res.status(404).send("Genre with given id was not found!");

  //get index of genre
  const index = genres.indexOf(genre);
  //delete genre from genres array
  genres.splice(index, 1);

  //return deleted genre
  res.send(genre);
});

function validateBody(body) {
  schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return (result = schema.validate(body));
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on ${port} 3000...`));
