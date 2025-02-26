import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "NoteApp",
  password: "Mhisham2016",
  port: 5432,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );

const app = express();
const portno = 4000;
const currentTime = new Date();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    // console.log(header);
    req.token = header;
    next();
  } else {
    res.send({ message: "Token not given" });
  }
}

app.get("/getData", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM notedata`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/checkuser", async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  console.log(user);
  console.log(pass);

  const result = await db.query("select * from userinfo where username = $1", [
    user,
  ]);
  console.log(result.rows);
  const { id, username, password } = result.rows[0];
  if (user === username && pass === password) {
    console.log("sahi user ha ");
    const token = jwt.sign(result.rows[0], "secret", {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    console.log(token);
    res.send(token);
  } else {
    console.log("sahi user nahi ha");
  }
});

app.post("/isAuthourize", verifyToken, (req, res) => {
  console.log("hello");

  const header = req.token;
  console.log(header);
  console.log("asldfalsdfa;lsdf");
  jwt.verify(header, "secret", (err, auth) => {
    if (err) {
      res.send(err);
    } else {
      console.log(auth);
      res.send({ message: "authorized", auth });
    }
  });
  console.log("I am here");
});

app.post("/adduser", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  try {
    const result = await db.query(
      "insert into userinfo (username,password) values ($1,$2) returning *",
      [username, password]
    );
    if (result.rows.length > 0) {
      const data = result.rows;
      res.send({ message: "added successfully", data });
    } else {
      res.send({ error: "invalid format" });
    }
  } catch (error) {}
});

app.post("/addData", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const result = await db.query(
      `INSERT INTO notedata (title, content, author, date) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [title, content, author, currentTime]
    );
    res
      .status(201)
      .json({ message: "Successfully added", newPost: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to add post" });
  }
});

app.patch("/updateSpecificData/:Data_id", async (req, res) => {
  try {
    const pid = parseInt(req.params.Data_id);
    const { title, content, author } = req.body;

    const result = await db.query(
      `UPDATE notedata SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *`,
      [title, content, author, pid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ID does not exist" });
    }

    res.json({ message: "Successfully updated", updatedPost: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.delete("/deleteData/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db.query(
      "DELETE FROM notedata WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      message: "Post deleted successfully",
      deletedPost: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(portno, () => {
  console.log(`Server running on port ${portno}`);
});
