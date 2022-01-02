"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var weather = require("weather-js");
var router = (0, express_1.Router)();
router.get('/weather', function (req, res) {
    var query = req.query.q;
    var degreeType = req.query.degreeType;
    if (!query) {
        return res.status(404).json({
            error: "Please Provide a valid query (q ) Parameters"
        });
    }
    if (!degreeType)
        degreeType = 'c';
    degreeType = String(degreeType).toUpperCase();
    weather.find({
        search: String(query),
        degreeType: degreeType
    }, function (error, result) {
        if (error)
            return res.status(404).send(error);
        else
            return res.status(200).json(result);
    });
});
exports.default = router;
