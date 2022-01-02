"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var router = (0, express_1.Router)();
router.get('/wiki', function (req, res) {
    var question = req.query.q;
    if (!question) {
        return res.status(404)
            .json({
            error: "Please Provide A q Param"
        });
    }
    axios_1.default.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + question)
        .then(function (_a) {
        var data = _a.data;
        return res.json(data);
    })
        .catch(function (err) {
        return res.status(404).json({
            error: "Cannot Find This Question",
            err: err
        });
    });
});
exports.default = router;
