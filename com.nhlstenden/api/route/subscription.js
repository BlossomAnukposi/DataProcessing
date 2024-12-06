const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /subscription'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /subscription'
    });
});

//get for a single subscription
router.get('/:subscription_id', (req, res, next) => {
    const id = req.params.subscription_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special subscription',
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

//update a single subscription
router.patch('/:subscription_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated subscription!'
    });
});

//delete a single subscription
router.delete('/:subscription_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted subscription!'
    });
});

module.exports = router; //allows other files to use the routes in this file