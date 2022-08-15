import express from "express"


const router = express.Router();

// Paths for middleware in app
router.get("/register", (req, res) => {
    res.send("Auths endpoint here")
})

export default router