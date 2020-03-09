import express from "express";
const router = express.Router();

router.get("/", function(req, res, next) {
  res.send("hello");
});

router.get("/hello", function(req, res, next) {
  console.log("ndwjdnw");
  res.send("mzu");
});

export default router;
