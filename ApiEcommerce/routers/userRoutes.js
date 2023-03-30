const router = require("express").Router();
const User = require("../models/User");

// register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (err) {
    if (err.code === 1100) return res.status(400).send("Email already exists");
    res.status(400).send(err.message);
  }
});

//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// get user

router.get("/", async (req, res) => {
    try{
        const users = await User.find({ isAdmin: false}).populate('orders');
        res.json(users);
    }catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;
