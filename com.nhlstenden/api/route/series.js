const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /series'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /series'
    });
});

//get for a single series
router.get('/:series_id', (req, res, next) => {
    const id = req.params.series_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special series',
            id: id
        });
    }
    else
    {
        res.status(200).json({
            message: 'You have logged in',
        });
    }
});

//update a single series
router.patch('/:series_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated series!'
    });
});

//delete a single series
router.delete('/:series_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted series!'
    });
});

module.exports = router; //allows other files to use the routes in this file