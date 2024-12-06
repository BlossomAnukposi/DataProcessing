const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /episode'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /episode'
    });
});

//get for a single episode
router.get('/:episode_id', (req, res, next) => {
    const id = req.params.episode_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special episode',
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

//delete a single episode
router.delete('/:episode_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted episode!'
    });
});

module.exports = router; //allows other files to use the routes in this file