const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/authJwt");
const multer = require("../middleware/multer-config");

router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);

module.exports = router;
