const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comments.js')

// Get All comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})


// Get all the comments from all users for a specific issue
commentRouter.get("/issue/:_id", (req, res, next) => {
  Comment.find({ issue: req.params._id }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

commentRouter.get("/userid", (req, res, next) => {
  console.log(999,req.user._id)
  Comment.find({ user: req.user._id }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Get all the comments from a specific user, for all issues
commentRouter.get("/user", (req, res, next) => {
  Comment.find({ user: req.user._id }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})


// Add new Comment
commentRouter.post("/", (req, res, next) => {
  req.body.user = req.user
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})



// Delete Comment
commentRouter.delete("/:commentId", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.commentId},
    {user: req.params.userid},
    (err, deletedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(deletedComment)
    }
  )
})



module.exports = commentRouter