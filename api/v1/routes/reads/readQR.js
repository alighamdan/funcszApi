"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var router = (0, express_1.Router)();
router.get('/qr-read', function (req, res) {
    var url = req.query.url;
    if (!url) {
        return res.status(404).json({
            msg: "Please Provide A url Param"
        });
    }
    axios_1.default.get("http://api.qrserver.com/v1/read-qr-code/?fileurl=" + url)
        .then(function (_a) {
        var data = _a.data;
        res.json(data);
    }).catch(function (err) {
        res.status(404).send(err);
    });
});
exports.default = router;
