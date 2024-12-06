const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /referral_discount'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /referral_discount'
    });
});

//get for a single referral_discount
router.get('/:referral_discount_id', (req, res, next) => {
    const id = req.params.referral_discount_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special referral_discount',
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

module.exports = router; //allows other files to use the routes in this file