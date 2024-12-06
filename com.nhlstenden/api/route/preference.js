const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /preference'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /preference'
    });
});

//get for a single preference
router.get('/:preference_id', (req, res, next) => {
    const id = req.params.preference_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special preference',
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

//delete a single preference
router.delete('/:preference_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted preference!'
    });
});

module.exports = router; //allows other files to use the routes in this file