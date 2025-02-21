import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "NoteApp",
  password: "Mhisham2016",
  port: 5432,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to PostgreSQL database", err));

const app = express();
const portno = 4000;
const currentTime = new Date();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch all posts
app.get("/getData", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM notedata`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Add a new post
app.post("/addData", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const result = await db.query(
      `INSERT INTO notedata (title, content, author, date) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [title, content, author, currentTime]
    );
    res.status(201).json({ message: "Successfully added", newPost: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to add post" });
  }
});

// Update a specific post
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

// Delete a specific post
<<<<<<< HEAD
=======
// Delete a post
>>>>>>> origin/main
app.delete("/deleteData/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db.query("DELETE FROM notedata WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", deletedPost: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});


app.listen(portno, () => {
  console.log(`Server running on port ${portno}`);
});
