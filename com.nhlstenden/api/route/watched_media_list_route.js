const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /watched_media_list'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /watched_media_list'
    });
});

//get for a single watched_media_list
router.get('/:watched_media_list_id', (req, res, next) => {
    const id = req.params.watched_media_list_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special watched_media_list',
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

//delete a single watched_media_list
router.delete('/:watched_media_list_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted watched_media_list!'
    });
});

module.exports = router; //allows other files to use the routes in this file