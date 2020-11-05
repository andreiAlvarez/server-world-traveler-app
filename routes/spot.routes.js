// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE,
// THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Author and Book models in order to use them *********
const Country = require('../models/Country.model');
const Spot = require('../models/Spot.model');
//const uploadCloud = require("../configs/cloudinary-setup");

// ****************************************************************************************
// POST - create a spot
// ****************************************************************************************

// <form action="/spots" method="POST">
router.post('/api/spots', (req, res, next) => {
  // console.log(req.body);
  Spot.create(req.body)
    .then(spotDoc => res.status(200).json({ spot: spotDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the spots created by the user
// ****************************************************************************************

router.get('/api/spots', (req, res) => {
  Spot.find()
    .then(spotsFromDB => res.status(200).json({ spots: spotsFromDB }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the spot
// ****************************************************************************************

// <form action="/books/{{this._id}}/delete" method="post">
router.post('/api/spots/:spotId/delete', (req, res) => {
  Spot.findByIdAndRemove(req.params.spotId)
    .then(() => res.json({ message: 'Successfully removed!' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/books/{{foundBook._id}}/update" method="POST">
router.post('/api/spots/:id/update', (req, res) => {
  Spot.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedSpot => res.status(200).json({ spot: updatedSpot }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the spot details
// ****************************************************************************************

router.get('/api/spots/:someSpotId', (req, res) => {
  Spot.findById(req.params.someSpotId)
    .populate('country')
    .then(foundSpot => res.status(200).json({ spot: foundSpot }))
    .catch(err => next(err));
});

// ****************************************************************************************
// PATCH route for spot image upload
// ****************************************************************************************
// router.patch(
//   "/spots/image/:spotId",
//   uploadCloud.single("image"),
//   (req, res, next) => {
//       Product.findByIdAndUpdate(
//           req.params.countryId,
//           { image: req.file.url },
//           { new: true }
//       )
//           .then((updatedCountry) => {
//               res.status(200).json(updatedProduct);
//           })
//           .catch((err) => res.status(400).json(err));
//   }
// );

module.exports = router;
