const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// Get all seasons
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT season_id, series_id, season_number FROM season"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching seasons",
      error: error.message,
    });
  }
});

// Create new season
router.post("/", async (req, res) => {
  const { series_id, season_number } = req.body;

  // Basic validation
  if (!series_id || !season_number) {
    return res.status(400).json({
      message: "Series ID and season number are required fields",
    });
  }

  try {
    // Check if series exists
    const seriesCheck = await pool.query(
      "SELECT series_id FROM series WHERE series_id = $1",
      [series_id]
    );

    if (seriesCheck.rows.length === 0) {
      return res.status(404).json({
        message: "Series not found",
      });
    }

    // Check if season already exists for this series
    const seasonCheck = await pool.query(
      "SELECT season_id FROM season WHERE series_id = $1 AND season_number = $2",
      [series_id, season_number]
    );

    if (seasonCheck.rows.length > 0) {
      return res.status(409).json({
        message: "Season already exists for this series",
      });
    }

    const result = await pool.query(
      "INSERT INTO season (series_id, season_number) VALUES ($1, $2) RETURNING *",
      [series_id, season_number]
    );

    res.status(201).json({
      message: "Season created successfully",
      season: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating season",
      error: error.message,
    });
  }
});

// Get single season
router.get("/:season_id", async (req, res) => {
  const season_id = req.params.season_id;

  try {
    const result = await pool.query(
      "SELECT s.season_id, s.series_id, s.season_number, sr.title as series_title FROM season s JOIN series sr ON s.series_id = sr.series_id WHERE s.season_id = $1",
      [season_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Season not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching season",
      error: error.message,
    });
  }
});

// Get all seasons for a specific series
router.get("/series/:series_id", async (req, res) => {
  const series_id = req.params.series_id;

  try {
    const result = await pool.query(
      "SELECT season_id, series_id, season_number FROM season WHERE series_id = $1 ORDER BY season_number",
      [series_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching seasons for series",
      error: error.message,
    });
  }
});

// Update season
router.patch("/:season_id", async (req, res) => {
  const season_id = req.params.season_id;
  const { season_number } = req.body;

  if (!season_number) {
    return res.status(400).json({
      message: "Season number is required for update",
    });
  }

  try {
    // Check if the new season number already exists for this series
    const seasonCheck = await pool.query(
      `SELECT series_id FROM season WHERE season_id = $1`,
      [season_id]
    );

    if (seasonCheck.rows.length === 0) {
      return res.status(404).json({
        message: "Season not found",
      });
    }

    const series_id = seasonCheck.rows[0].series_id;

    const duplicateCheck = await pool.query(
      `SELECT season_id FROM season WHERE series_id = $1 AND season_number = $2 AND season_id != $3`,
      [series_id, season_number, season_id]
    );

    if (duplicateCheck.rows.length > 0) {
      return res.status(409).json({
        message: "Season number already exists for this series",
      });
    }

    const result = await pool.query(
      "UPDATE season SET season_number = $1 WHERE season_id = $2 RETURNING *",
      [season_number, season_id]
    );

    res.status(200).json({
      message: "Season updated successfully",
      season: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating season",
      error: error.message,
    });
  }
});

// Delete season
router.delete("/:season_id", async (req, res) => {
  const season_id = req.params.season_id;

  try {
    const result = await pool.query(
      "DELETE FROM season WHERE season_id = $1 RETURNING season_id",
      [season_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Season not found",
      });
    }

    res.status(200).json({
      message: "Season deleted successfully",
      season_id: result.rows[0].season_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting season",
      error: error.message,
    });
  }
});

module.exports = router;
