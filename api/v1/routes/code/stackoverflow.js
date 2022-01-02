"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var functions_1 = require("./functions");
var router = (0, express_1.Router)();
router.get('/stackoverflow', function (req, res) {
    var q = req.query.q;
    var limit = req.query.limit;
    if (!q)
        return res.status(404).json({ msg: "Please Provide q Param" });
    var start = Date.now();
    (0, functions_1.stackoverflowCodes)(String(q))
        .then(function (codes) {
        console.log(codes);
        var endtime = Date.now();
        var elapsed = endtime - start;
        if (limit && !isNaN(Number(limit))) {
            res.json({ elapsedTimeInMS: elapsed, codes: codes.slice(0, Number(limit)) });
        }
        else
            res.json({ elapsedTimeInMS: elapsed, codes: codes });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = router;
