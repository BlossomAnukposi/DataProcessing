const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /profile'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /profile'
    });
});

//get for a single profile
router.get('/:profile_id', (req, res, next) => {
    const id = req.params.profile_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special profile',
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

//update a single profile
router.patch('/:profile_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated profile!'
    });
});

//delete a single profile
router.delete('/:profile_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted profile!'
    });
});

module.exports = router; //allows other files to use the routes in this file