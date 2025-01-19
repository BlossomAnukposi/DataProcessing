const SeriesModel = require("../model/seriesModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SeriesController extends ControllerParent {
    constructor() {
        super(SeriesModel);

        ['createSeries', 'updateSeries'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    async createSeries(req, res) {
        try {
            const seriesData = req.body;
            const result = await this.model.createSeries(seriesData);

            if (!result) {
                return res.status(400).json({ message: "Failed to create series" });
            }

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSeries(req, res) {
        try {
            const { id } = req.params;
            const seriesData = req.body;

            // Get current series data first
            const currentSeries = await this.model.getEntryById(id);
            if (!currentSeries || currentSeries.length === 0) {
                return res.status(404).json({ message: "Series not found" });
            }

            // Merge existing data with updates
            const updatedData = {
                title: seriesData.title || currentSeries[0].title,
                age_classification:
                    seriesData.age_classification || currentSeries[0].age_classification,
                genre: seriesData.genre || currentSeries[0].genre,
                description: seriesData.description || currentSeries[0].description,
                quality: seriesData.quality || currentSeries[0].quality,
                series_url: seriesData.series_url || currentSeries[0].series_url,
            };

            const result = await this.model.updateSeries(id, updatedData);

            if (!result) {
                return res.status(404).json({ message: "Update failed" });
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const controller = new SeriesController();
module.exports = controller;
