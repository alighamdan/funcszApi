"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bins_1 = __importDefault(require("../../../../src/data/schemas/bins"));
var router = (0, express_1.Router)();
router.get('/search/:query', function (req, res) {
    var query = req.params.query;
    if (!query) {
        return res.status(404).json({
            error: "Please Provide A query"
        });
    }
    if (typeof query !== 'string') {
        return res.status(404).json({
            error: "please Provide The query As String"
        });
    }
    bins_1.default.find({ isprivate: false })
        .then(function (r) {
        var results = r.filter(function (i) {
            return i.title.toLowerCase().indexOf(String(query).toLowerCase()) !== -1;
        })
            .map(function (e) {
            return {
                title: e.title,
                havePassword: e.password != null,
                Language: e.language,
                Code: e.Code,
                ID: e.ID,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt
            };
        });
        return res.json({
            Bins: results,
            length: results.length
        });
    })
        .catch(function (err) { return console.error(err); });
});
exports.default = router;
