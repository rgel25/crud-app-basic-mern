const express = require("express");
const router = express.Router();
const Entry = require("../models/data.model");

router.get("/", async (req, res) => {
  const entries = await Entry.find({});
  res.send(entries);
});

router.post("/", async (req, res) => {
  const entry = new Entry(req.body);
  await entry.save();
});

router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const entry = req.body;
  await Entry.findByIdAndUpdate(id, entry);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Entry.findByIdAndDelete(id);
});

module.exports = router;
