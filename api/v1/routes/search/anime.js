"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var router = (0, express_1.Router)();
router.get('/anime', function (req, res) {
    var image = req.query.url;
    if (!image) {
        return res.status(404)
            .json({
            error: "Please Provide url Param"
        });
    }
    axios_1.default.get("https://api.trace.moe/search?url=" + encodeURIComponent(String(image)))
        .then(function (_a) {
        var data = _a.data;
        return res.json(data);
    }).catch(function (err) {
        return res.status(404).json({
            error: true,
            err: err
        });
    });
});
exports.default = router;
