const express = require("express");
const app = express();

require("dotenv").config({ path: "./config.env" })
const path = require("path");
const bcrypt = require("bcrypt");
const dbConnect = require("./DB");
const User = require("./userModel");
const PORT = process.env.PORT
const cors = require("cors");
const jwt = require("jsonwebtoken");


dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://hall-booking-system.vercel.app",
  })
);

app.post("/register", async (request, response) => {
  let passwords = request.body.password;
  bcrypt
    .hash(passwords, 10)
    .then((hashedPassword) => {
      const user = new User1({
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
          });
        })

        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })

    .catch((e) => {
      response.status(600).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/booking", async (request, response) => {
  const saveDetails = () => {
    const user = new User({
      FirstName: request.body.FirstName,
      LastName: request.body.LastName,
      password: request.body.password,
      hall: request.body.hall,
      college: request.body.college,
      phoneNumber: request.body.phoneNumber,
      hallType: request.body.hallType,
      numberOfMembers: request.body.numberOfMembers,
      audioSystem: request.body.audioSystem,
      gender: request.body.gender,
      date: request.body.date,
      FromTime: request.body.FromTime,
      ToTime: request.body.ToTime,
      GuestName: request.body.GuestName,
      GuestType: request.body.GuestType,
    });

    user
      .save()
      .then((result) => {
        
        response.status(201).send({
          message: "User Created Successfully",
        });
      })

      .catch((error) => {
        response.status(500).send({
          message: "Error creating user",
          error,
        });
      });
  };
  saveDetails();
  
});

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })

    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});


app.get('/users', async (req,res)=>{
  const data = await User.find({})
      res.json(data);
  })  

  app.delete('/deleteuser', (req, res, next) => {
    User.deleteOne({id: req.body.FirstName}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  
  

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port,",`${PORT}`);
});
