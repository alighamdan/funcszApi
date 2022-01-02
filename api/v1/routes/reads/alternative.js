"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get('/alternative', function (req, res) {
    var query = req.query.query;
    var limit = req.query.limit;
    if (!query)
        return res.status(404).json({
            msg: "Please Provide query Param"
        });
    if (!limit)
        limit = "10";
    var start = Date.now();
    axios_1.default.post("https://zidpns2vb0-dsn.algolia.net/1/indexes/fullitems/query?x-algolia-agent=Algolia for JavaScript (4.11.0); Browser (lite)&x-algolia-api-key=88489cdf3a8fbfe07a2f607bf1568330&x-algolia-application-id=ZIDPNS2VB0", {
        query: query,
        "hitsPerPage": Number(limit)
    })
        .then(function (_a) {
        var data = _a.data;
        var end = Date.now();
        var elapsed = end - start;
        res.json({
            elapsedTimeInMS: elapsed,
            data: data.hits
        });
    });
});
exports.default = router;
