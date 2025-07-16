const express = require("express");
const { networkingEventController } = require("../../controllers");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Networking Events" });
});

router.post("/create",
    networkingEventController.createNetworkingEvent
);


module.exports = router;