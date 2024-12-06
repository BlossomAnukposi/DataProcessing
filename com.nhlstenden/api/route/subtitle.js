const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /subtitle'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /subtitle'
    });
});

//get for a single subtitle
router.get('/:subtitle_id', (req, res, next) => {
    const id = req.params.subtitle_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special subtitle',
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

//update a single subtitle
router.patch('/:subtitle_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated subtitle!'
    });
});

//delete a single subtitle
router.delete('/:subtitle_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted subtitle!'
    });
});

module.exports = router; //allows other files to use the routes in this file