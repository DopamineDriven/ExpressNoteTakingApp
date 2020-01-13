const router = require("express").Router();
const PublicModel = require('./model');

//user login
router.post('/login', (request, response, next) => {
    response.send("Login")
});

//user register
router.post('/register', (request, response, next) => {
    const newNote = new PublicModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
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
});


router.post('/:id', (request, response, next) => {
    PublicModel
        .findById(request.params.id)
        .then((result) => {
            if(!result) {
                response
                    .status(404)
                    .send('user not found')
            }
            else {
                response.json(result)
            }
        })
    .catch((error) => {
        console.log(error)
        response.status(500).send('error occurred')
    })
});


module.exports = router;