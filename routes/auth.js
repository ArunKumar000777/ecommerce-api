const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password) return res.status(400).json({message:'username , email and password are required'})
    // check for duplicate username in db
    const duplicate = await User.findOne({username: username})
    if(duplicate) return res.status(409).json({message: 'username already exists , please try another one'})
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const saveduser = await newUser.save();
        res.status(201).send(saveduser);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        // !user &&  res.status(401).json("wrong user credentials");
        if(!user) return res.status(401).json("wrong user credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        originalPassword !== inputPassword && res.status(401).json("wrong password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
