// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const profileRouter = express.Router();

// ********* require Author model in order to use it for CRUD *********
const Profile = require('../models/Profile.model');

// ****************************************************************************************
// POST route to create a profile in the DB
// ****************************************************************************************

// <form action="/profile" method="POST">
profileRouter.post('/api/profile', (req, res, next) => {
  Profile.create(req.body)
    .then(profileDoc => res.status(200).json({ profile: profileDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the profile
// ****************************************************************************************

profileRouter.post('/api/profile/:profileId/delete', (req, res) => {
  Profile.findByIdAndRemove(req.params.profileId)
    .then(() => res.json({ message: 'Successfully removed!' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/books/{{foundBook._id}}/update" method="POST">
profileRouter.post('/api/profile/:id/update', (req, res) => {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProfile => res.status(200).json({ profile: updatedProfile }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the profile details
// ****************************************************************************************

profileRouter.get('/api/profile/:someProfileId', (req, res) => {
  Profile.findById(req.params.someProfileId)
    .populate('user')
    .then(foundProfile => res.status(200).json({ profile: foundProfile }))
    .catch(err => next(err));
});

module.exports = profileRouter;
