const express = require('express');
const router = express.Router();
const Ratemodel = require("../model/ratemodel");
router.post('/:email', async (req, res) => {
    const { rating, comment,name,date,photo } = req.body;
    const email = req.params.email;

    try {
        const newRating = new Ratemodel({
            wemail: email,
            rating: rating,
            comment: comment,
            uname: name,
            date: date,
            photo: photo,
        });
        await newRating.save();
        res.status(201).json({ message: "Rating submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting rating", error });
    }
});
router.get('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const ratings = await Ratemodel.find({ wemail: email });
        if (!ratings || ratings.length === 0) {
            return res.status(404).json({ message: "No ratings found for this worker" });
        }
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ratings", error });
    }
});
module.exports = router;