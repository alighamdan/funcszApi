"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/chatbot", function (req, res) {
    var message = req.query.message;
    if (!message || typeof message !== "string") {
        return res.status(404).json({
            error: "please Provide A message Param",
        });
    }
    // make an http get request to the ai api
    axios_1.default
        .get("https://api.affiliateplus.xyz/api/chatbot?message=" + encodeURI(message) + "&botname=funcsz&ownername=ali ghamdan&user=1")
        .then(function (_a) {
        var data = _a.data;
        return res.json(data);
    })
        .catch(function (err) {
        return res.status(404).json({
            error: "Some Thing Went Wrong",
            err: err,
        });
    });
});
exports.default = router;
