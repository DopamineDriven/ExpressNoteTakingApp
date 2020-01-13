const router = require("express").Router();
const NoteModel = require("./model");

//get all notes
router.get("/", (request, response, next) => {
  NoteModel.find()
    .then((results) => {
        if (!results) {
            //404 = not found
            response
                .status(404)
                .send("notes not found")
        }
        else {
            response.json(results)
        }
    })
    .catch((error) => {
        console.log(error)
        response
            //500 = server error
            .status(500)
            .send("error occurred")
    })
});

//get single note by id
router.get("/:id", (request, response, next) => {
    NoteModel.findById(request.params.id)
        .then((results) => {
            if(!results) {
                response
                    .status(404)
                    .send("note not found")
            }
            else {
                response.json(results)
            }
        })
        .catch((error) => {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
        })
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

//update note by id -- put -- findOneAndUpdate
router.put("/:id", updateInputValidation, (request, response, next) => {
    //three parameters: (1) what to find (2) what to update (3) show old vs new records
    NoteModel.findOneAndUpdate({ _id: request.params.id }, request.updateObject, {
        new: true
    })
        .then((results) => {
            if(!results) {
                response
                    .status(404)
                    .send("note not found")
            }
            else {
                response.json(results)
            }
        })
        .catch((error) => {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
        })
});

//delete note by id--mongoose uses findOneAndRemove--uses provided id and removes it
router.delete("/:id", (request, response, next) => {
    NoteModel.findOneAndRemove({ _id: request.params.id })
        .then((results) => {
            if(!results) {
                response
                    .status(404)
                    .send("note not found")
            }
            else {
                response.send("deleted successfully ")
            }
        })
        .catch((error) => {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
        })
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

//validation middleware
function updateInputValidation(request, response, next) {
    const { title, body } = request.body
    const updateObject = {}

    if (title) {
        updateObject.title = title
    }

    if (body) {
        updateObject.body = body
    }
    request.updateObject=updateObject
    next()
}

module.exports = router;
