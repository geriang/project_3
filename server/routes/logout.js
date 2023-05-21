const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.user) {
      req.session.user = null;
      req.flash("success", "You have successfully logged out");
      req.session.save(()=> {
        res.redirect("/")
      })
    }
  
  });

  module.exports = router