const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get All issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})



issueRouter.put("/upvote/:issueID", async (req, res, next) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.issueID });
    if (issue.votedUser.includes(req.user._id)) {
      res.status(403);
      throw new Error('You can only vote once per issue!');
    }
    const updated = await Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {
        $inc: { upvote: +1 },
        $push: { votedUser: req.user._id }
      },
      { new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res.status(500);
    return next(err);
  }
})

issueRouter.put("/downvote/:issueID", async (req, res, next) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.issueID });
    if (issue.votedUser.includes(req.user._id)) {
      res.status(403);
      throw new Error('You can only vote once per issue!');
    }
    const updated = await Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {
        $inc: { downvote: +1 },
        $push: { votedUser: req.user._id }
      },
      { new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res.status(500);
    return next(err);
  }
})

  // Add new Issue
  issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedIssue)
    })
  })
  /////////////////////
  
  
  // get one issue by id
  issueRouter.get("/issue/:issueId", (req, res, next) => {
    Issue.find({ issue: req.params.issueId }, (err, posts) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(posts);
    });
  });
  
  // Get all the comments from a specific user, for all issues
  issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })
  
  // Get comments by user id --> will get all the issues for  current user
  issueRouter.get("/user/:_id", (req, res, next) => {
    Issue.find({ user: req.user._id, issue: req.params._id }, (err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })
  
  
  module.exports = issueRouter