const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// Get all series
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT series_id, title, age_classification, genre, description, quality FROM series"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching series",
      error: error.message,
    });
  }
});

// Create new series
router.post("/", async (req, res) => {
  const { title, age_classification, genre, description, quality } = req.body;

  // Basic validation
  if (!title || !age_classification || !genre) {
    return res.status(400).json({
      message: "Title, age classification, and genre are required fields",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO series (title, age_classification, genre, description, quality) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, age_classification, genre, description, quality]
    );

    res.status(201).json({
      message: "Series created successfully",
      series: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating series",
      error: error.message,
    });
  }
});

// Get single series
router.get("/:series_id", async (req, res) => {
  const series_id = req.params.series_id;

  try {
    const result = await pool.query(
      "SELECT series_id, title, age_classification, genre, description, quality FROM series WHERE series_id = $1",
      [series_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Series not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching series",
      error: error.message,
    });
  }
});

// Update series
router.patch("/:series_id", async (req, res) => {
  const series_id = req.params.series_id;
  const { title, age_classification, genre, description, quality } = req.body;

  try {
    let updateQuery = "UPDATE series SET ";
    const updateValues = [];
    const queryParams = [];
    let paramCount = 1;

    if (title) {
      updateValues.push(`title = $${paramCount}`);
      queryParams.push(title);
      paramCount++;
    }

    if (age_classification) {
      updateValues.push(`age_classification = $${paramCount}`);
      queryParams.push(age_classification);
      paramCount++;
    }

    if (genre) {
      updateValues.push(`genre = $${paramCount}`);
      queryParams.push(genre);
      paramCount++;
    }

    if (description) {
      updateValues.push(`description = $${paramCount}`);
      queryParams.push(description);
      paramCount++;
    }

    if (quality) {
      updateValues.push(`quality = $${paramCount}`);
      queryParams.push(quality);
      paramCount++;
    }

    if (updateValues.length === 0) {
      return res.status(400).json({
        message: "No update data provided",
      });
    }

    queryParams.push(series_id);
    updateQuery +=
      updateValues.join(", ") + ` WHERE series_id = $${paramCount} RETURNING *`;

    const result = await pool.query(updateQuery, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Series not found",
      });
    }

    res.status(200).json({
      message: "Series updated successfully",
      series: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating series",
      error: error.message,
    });
  }
});

// Delete series
router.delete("/:series_id", async (req, res) => {
  const series_id = req.params.series_id;

  try {
    const result = await pool.query(
      "DELETE FROM series WHERE series_id = $1 RETURNING series_id",
      [series_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Series not found",
      });
    }

    res.status(200).json({
      message: "Series deleted successfully",
      series_id: result.rows[0].series_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting series",
      error: error.message,
    });
  }
});

// Get series by genre
router.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;

  try {
    const result = await pool.query(
      "SELECT series_id, title, age_classification, genre, description, quality FROM series WHERE genre = $1",
      [genre]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching series by genre",
      error: error.message,
    });
  }
});

module.exports = router;
