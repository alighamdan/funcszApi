"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var functions_1 = require("./functions");
var router = (0, express_1.Router)();
router.get('/stackoverflow', function (req, res) {
    var q = req.query.q;
    if (!q)
        return res.status(404).json({ msg: "Please Provide q Param" });
    var start = Date.now();
    (0, functions_1.stackoverflowCodes)(String(q))
        .then(function (codes) {
        var endtime = Date.now();
        var elapsed = endtime - start;
        res.json({ elapsedTimeInMS: elapsed, codes: codes });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = router;
