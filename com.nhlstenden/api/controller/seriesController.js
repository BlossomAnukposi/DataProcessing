const SeriesModel = require("../model/seriesModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SeriesController extends ControllerParent {
    constructor() {
        super(SeriesModel);

        // ['createAccount', 'updateAccount'].forEach(
        //     method => this[method] = this[method].bind(this)
        // );
    }
}

const controller = new SeriesController();
module.exports = controller;