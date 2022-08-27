const express = require('express');

const router = express.Router();




router.get('/homepage', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contacts', (req, res) => {
    res.render('contacts');
});

router.get('/contacts', (req, res) => {
    res.render('contacts');
});

module.exports = router;
