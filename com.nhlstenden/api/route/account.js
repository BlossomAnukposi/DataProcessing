const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /account'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /account'
    });
});

//get for a single account
router.get('/:account_id', (req, res, next) => {
    const id = req.params.account_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special account',
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

//update a single account
router.patch('/:account_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated account!'
    });
});

//delete a single account
router.delete('/:account_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted account!'
    });
});

module.exports = router; //allows other files to use the routes in this file