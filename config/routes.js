const axios = require("axios");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};



function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db("users").insert(creds).then(ids => {const id = ids[0];
      const token = generateToken({ username: creds.username });
      return res.status(201).json({ newUserId: id, token });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        let token = generateToken(user);
        return res.status(200).json({ welcome: user.username, token });
      } else {
        return res
          .status(401)
          .json({ Message: "Something went wrong while logging in." });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
