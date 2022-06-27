const Post = require("../models/posts");
const auth = require("../middleware/authJwt");
const fs = require("fs"); 

// Pour afficher tous les posts = GET
exports.getAllPosts = (req, res, next) => {
    Post.find() 
      .then((posts) => {
        res.status(200).json(posts); 
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };
  
  // Pour afficher un seul post = GET
  exports.getOnePost = (req, res, next) => {
    Post.findOne({
      // affiche la sauce correspondant à l'id
      _id: req.params.id,
    })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  };
  