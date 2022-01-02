"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var functions_1 = require("./functions");
var router = (0, express_1.Router)();
router.get('/tabnine', function (req, res) {
    var q = req.query.q;
    var type = req.query.type;
    var limit = req.query.limit;
    if (!q)
        return res.status(404).json({
            "msg": "q Param Is Missing"
        });
    var start = Date.now();
    if (!type)
        type = 'javascript';
    (0, functions_1.TabnineCodes)(String(q), String(type))
        .then(function (codes) {
        var endtime = Date.now();
        var elapsed = endtime - start;
        if (limit && !isNaN(Number(limit))) {
            res.json({
                elapsedTimeInMS: elapsed,
                codes: codes.slice(0, Number(limit))
            });
        }
        else
            res.json({
                elapsedTimeInMS: elapsed,
                codes: codes
            });
    })
        .catch(function (error) {
        res.status(404).json(error);
    });
});
exports.default = router;
