const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//Create a user using POST "/api/auth"
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 7,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email:req.body.email
    }).then((user) => res.json(user)).catch(err=>{console.log(err)
        res.json({error:"Please Enter a unique value"})
    });
  }
);
module.exports = router;
