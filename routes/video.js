const express = require('express');

const router = express.Router();




router.get('/home.mp4', (req, res) => {
    res.send('<p> Does your mom know about it? </p>');
});



module.exports = router;
