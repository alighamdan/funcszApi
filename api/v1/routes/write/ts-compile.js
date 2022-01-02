"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsCompiler = require('typescript-compiler');
var express_1 = require("express");
var prettier_1 = require("prettier");
var router = (0, express_1.Router)();
router.post('/ts-compiler', function (req, res) {
    var code = req.body.code;
    if (!code || typeof code !== 'string') {
        return res.status(404).json({
            error: "Please Provide a valid typescript code"
        });
    }
    return res.json({
        code: tsCompiler.compileString(code),
        prettied: (0, prettier_1.format)(tsCompiler.compileString(code), { parser: "babel" })
    });
});
exports.default = router;
