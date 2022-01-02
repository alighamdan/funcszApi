"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var router = (0, express_1.Router)();
router.get('/question', function (req, res) {
    var q = req.query.q;
    if (!q) {
        return res.status(404)
            .json({
            error: "Please Provide q Param"
        });
    }
    axios_1.default.get("https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=" + encodeURI(String(q)) + "&site=stackoverflow")
        .then(function (_a) {
        var data = _a.data;
        return res.json(data);
    })
        .catch(function (err) {
        return res.status(404).json({
            err: err
        });
    });
});
exports.default = router;
