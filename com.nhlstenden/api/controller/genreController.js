const genreModel = require("../model/genreModel");
const controllerParent = require("../../api/controller/controllerParent");

class genreController extends controllerParent
{
    constructor()
    {
        super(genreModel);

        this.getAllEntries = this.getAllEntries.bind(this);
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllGenresQuery');
    }
}

module.exports = new genreController();