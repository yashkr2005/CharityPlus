const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route Post api/users
//register
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),

    check("email", "please include an email").isEmail(),

    check(
      "password",
      "please enter a passoword of more than length 6"
    ).isLength({ min: 6 }),

    check("type_of", "please enter user type").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body)

    const { name, email, password, type_of } = req.body;

    try {
      // see if user exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        type_of,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);
router.get("/rating", async (req, res) => {
  try {
    const profiles = await Profile.find(
      { type_of: false },
      {
        contributions: 0,
        posts: 0,
        followers: 0,
        following: 0,
        location: 0,
        bio: 0,
        type_of: 0,
      }
    ).populate("user", ["name", "rating", "_id"]);

    if (!profiles) {
      return res.status(400).json({ msg: "no users found" });
    }

    const users = profiles.map((item) => {
      return {
        name: item.user.name,
        handle: item.handle,
        rating: item.user.rating,
        monthlyRating: item.user.rating,
        _id: item.user._id.toString(),
      };
    });

    users.sort((x, y) => {
      if (x.rating > y.rating) return -1;
      if (x.rating < y.rating) return 1;
      return 0;
    });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
