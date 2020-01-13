const router = require("express").Router();
const NoteModel = require("./model");

//get all notes
router.get("/", (request, response, next) => {
  response.send("All notes");
});

//get single note by id
router.get("/:id", (request, response, next) => {
  response.send("Get note by id");
});

//create note
router.post(
  "/",
  //middleware checks validations
  inputValidation,
  (request, response, next) => {
    const newNote = new NoteModel({
      title: request.body.title,
      body: request.body.body
    });
    //attempt to save info in DB and return a promise
    newNote
      .save()
      .then(document => {
        if (document) {
          response.json(document);
        } else {
          response.send("document did not save");
        }
      })
      //if an unforeseen error occurs, catch()
      .catch(error => {
        console.log(error);
        response.send("an error has occurred");
      });
  }
);

//update note by id
router.put("/:id", (request, response, next) => {
  response.send("Update note");
});

//delete note
router.delete("/", (request, response, next) => {
  response.send("Delete note");
});

//create middleware function to ensure required fields are accounted for; else throws and error
function inputValidation(request, response, next) {
  const { title, body } = request.body;
  //creating array of list of items that are missing
  const missingFields = [];
  if (!title) {
    missingFields.push("title");
  }
  if (!body) {
    missingFields.push("body");
  }
  if (missingFields.length) {
    response
      //status 400 for bad request
      .status(400)
      .send(`The following fields are missing: ${missingFields.join(", ")}`);
  }
  //if no missing field, proceed to next middleware
  else {
    next();
  }
}

module.exports = router;
