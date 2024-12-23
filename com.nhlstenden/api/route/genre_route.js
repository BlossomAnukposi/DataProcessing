const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// Get all genres
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT genre_id, name, description FROM genre"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching genres",
      error: error.message,
    });
  }
});

// Create new genre
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  // Basic validation
  if (!name) {
    return res.status(400).json({
      message: "Genre name is required",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO genre (name, description) VALUES ($1, $2) RETURNING genre_id, name, description",
      [name, description]
    );

    res.status(201).json({
      message: "Genre created successfully",
      genre: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating genre",
      error: error.message,
    });
  }
});

// Get single genre
router.get("/:genre_id", async (req, res) => {
  const genre_id = req.params.genre_id;

  try {
    const result = await pool.query(
      "SELECT genre_id, name, description FROM genre WHERE genre_id = $1",
      [genre_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching genre",
      error: error.message,
    });
  }
});

// Update genre
router.patch("/:genre_id", async (req, res) => {
  const genre_id = req.params.genre_id;
  const { name, description } = req.body;

  try {
    let updateQuery = "UPDATE genre SET ";
    const updateValues = [];
    const queryParams = [];
    let paramCount = 1;

    if (name) {
      updateValues.push(`name = $${paramCount}`);
      queryParams.push(name);
      paramCount++;
    }

    if (description) {
      updateValues.push(`description = $${paramCount}`);
      queryParams.push(description);
      paramCount++;
    }

    if (updateValues.length === 0) {
      return res.status(400).json({
        message: "No update data provided",
      });
    }

    queryParams.push(genre_id);
    updateQuery +=
      updateValues.join(", ") +
      ` WHERE genre_id = $${paramCount} RETURNING genre_id, name, description`;

    const result = await pool.query(updateQuery, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json({
      message: "Genre updated successfully",
      genre: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating genre",
      error: error.message,
    });
  }
});

// Delete genre
router.delete("/:genre_id", async (req, res) => {
  const genre_id = req.params.genre_id;

  try {
    const result = await pool.query(
      "DELETE FROM genre WHERE genre_id = $1 RETURNING genre_id",
      [genre_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    res.status(200).json({
      message: "Genre deleted successfully",
      genre_id: result.rows[0].genre_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting genre",
      error: error.message,
    });
  }
});

module.exports = router;
