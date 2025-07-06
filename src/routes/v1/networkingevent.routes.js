const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Networking Events" });
});

router.post("/create", (req, res) => {
    // Logic for creating a networking event
    res.status(201).json({ message: "Networking Event Created" });
});


module.exports = router;