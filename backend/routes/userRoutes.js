const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")

const router = express.Router()

// CREATE
router.post("/", auth, async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.json(user)
})

// READ
router.get("/", auth, async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(user)
})

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: "User Deleted" })
})

module.exports = router
