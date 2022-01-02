"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
var router = (0, express_1.Router)();
router.get('/idea', function (req, res) {
    axios_1.default.get("https://kq4z97l2ba.execute-api.ap-northeast-1.amazonaws.com/dev/get")
        .then(function (_a) {
        var data = _a.data;
        return res.json({
            idea: data.idea
        });
    })
        .catch(function (err) {
        return res.status(404).json({
            error: "Some Thing Went Wrong"
        });
    });
});
exports.default = router;
