"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var functions_1 = require("./functions");
var router = (0, express_1.Router)();
router.get('/github-gist', function (req, res) {
    var q = req.query.q;
    var limit = req.query.limit;
    var start = Date.now();
    if (!q)
        return res.status(404).json({ msg: "Please Provide q Param" });
    (0, functions_1.GithubGistCodes)(String(q))
        .then(function (snippets) {
        var endtime = Date.now();
        var elapsed = endtime - start;
        if (limit && !isNaN(Number(limit))) {
            res.json({ elapsedTimeInMS: elapsed, codes: snippets.slice(0, Number(snippets)) });
        }
        else
            res.json({ elapsedTimeInMS: elapsed, codes: snippets });
    })
        .catch(function (err) {
        res.status(500).json({ msg: 'Some Thing Went Wrong', err: err });
    });
});
exports.default = router;
