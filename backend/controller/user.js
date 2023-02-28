const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.signUp = (req, res) => {
  const { email, password, hobbies, address } = req.body;

  User.findOne({ email }) //Checking if the email exist
    .then((user) => {
      if (user)
        res.status(409).json({ error: "The entered Email already exist!" });
      else {
        bcrypt.hash(password, 12, (err, hashedPassword) => {
          // Now we can store the password hash in db.
          const userData = new User({
            _id: mongoose.Types.ObjectId(),
            email: email,
            password: hashedPassword,
            hobbies: hobbies,
            address: address,
          });
          let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // auth: {
            //   user: "joan.borer87@ethereal.email",
            //   pass: "xd8aMtBbUF7reWb48P",
            // },
            // service: "gmail",
            // auth: {
            //   user: "devkuldip836@gmail.com",
            //   pass: "zonkuldip",
            // },
          });

          let mailOptions = {
            from: "devkuldip836@gmail.com",
            to: "zonvoirkuldip@gmail.com",
            subject: `offer rejection for the job`,
            html: `After much consideration, I have decided to pursue another role that will offer me more opportunities to pursue my interests in [insert interest] and [insert interest].” “Unfortunately, I have decided not to accept the position, as it isn't a good fit for me at this time.`,
            // attachments: [
            //   {
            //     filename: `${name}.pdf`,
            //     path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
            //     contentType: 'application/pdf',
            //   },
            // ],
          };
          console.log(mailOptions);
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          });

          // transporter.sendMail(mailOptions, function (err, info) {
          //   if (err) {
          //     res.json(err);
          //   } else {
          //     res.json(info);
          //   }
          // });
          userData
            .save()
            .then(() => {
              const token = jwt.sign(
                { _id: userData._id },
                process.env.JWT_SECRET
              );
              res.status(201).json({
                message: "The user has been signed up successfully!",
                token: token,
                userData,
              });
            })
            .catch((error) => res.status(500).json({ error }));
        });
      }
    });
};

exports.allUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) return;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(404).json({
        error: "User not found",
      });
    } else {
      // Load hash from your password DB.
      bcrypt.compare(password, user.password, (err, result) => {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        if (result) {
          const newUser = new User({
            email: user.email,
            password: user.password,
            id: user._id,
            token: token,
          });
          res.status(200).json({
            message: "The user has been signed in successfully!",
            newUser,
          });
        } else {
          res.status(401).json({ error: "authentication failed" });
        }
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  console.log(req.params.userId);

  User.findByIdAndRemove({ _id: req.params.userId })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "The user has been deleted successfully!",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};
