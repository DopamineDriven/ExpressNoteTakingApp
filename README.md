# ExpressNoteTakingApp

# Use MongoDB to store notes
- Use https://www.mongoosejs.com to connect express with MongoDB

## npm dependencies
- nodemon https://www.npmjs.com/package/nodemon
- express https://www.npmjs.com/package/express
- body-parser https://www.npmjs.com/package/body-parser
- mongoose https://www.npmjs.com/package/mongoose
- bcryptjs https://www.npmjs.com/package/bcryptjs
- chance https://www.npmjs.com/package/chance

## Authentication & Authorization via passportjs
- Server issues accessToken on successful login
- Client sends accessToken to server on each request
- Server checks whether accessToken is correct each time a new call is made
(1) install passport npm
(2) install passport strategy module(s)
(3) configure passport strategy
(4) write the verify callback function
(5) apply passport middleware to routes