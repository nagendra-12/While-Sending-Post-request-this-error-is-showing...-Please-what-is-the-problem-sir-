const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const databasePath = path.join(__dirname, "twitterClone.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/register/", async (request, response) => {
  const { user_id, username, name, password, gender } = request.body;
  const createUserQuery = `
     INSERT INTO
      user (user_id, username, name, password, gender)
     VALUES
      (
        ${user_id},
       '${username}',
       '${name}',
       '${hashedPassword}',
       '${gender}' 
      );`;
  const data = await database.run(createUserQuery);
  response.send(data);
});
