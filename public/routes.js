const router = require("express").Router();

//user login
router.post('/login', (request, response, next) => {
    response.send("Login")
});

//user register
router.post('/register', (request, response, next) => {
    response.send("Register")
});

module.exports = router;