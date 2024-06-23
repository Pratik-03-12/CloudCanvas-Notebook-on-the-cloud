const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
const JWT_SECRET='pratik$%sa'
const router = express.Router();

//Create a user using POST "/api/auth/createUser"
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check whether user with the same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt)

      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);

      res.json(authToken);


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);
module.exports = router;
