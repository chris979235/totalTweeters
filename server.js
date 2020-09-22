  
const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require("path")
const port = process.env.PORT || 9000;

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/total-tweeters',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET,  algorithms: ['HS256']  })) // req.user
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comments', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on local port 9000`)
})

// "repository": {
//   "type": "git",
//   "url": "git+https://github.com/chris979235/totalTweeters.git"
// },
  
// "bugs": {
//   "url": "https://github.com/chris979235/totalTweeters/issues"
// },
// "homepage": "https://github.com/chris979235/totalTweeters#readme",
