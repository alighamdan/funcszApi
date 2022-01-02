"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prettier_1 = require("prettier");
var rapydscript = require("rapydscript");
var router = (0, express_1.Router)();
router.post("/py-to-js", function (req, res) {
    var code = req.body.code;
    if (!code || typeof code !== "string") {
        return res.status(404).json({
            error: "Please Provide code Body",
        });
    }
    try {
        var result = rapydscript.compile(code, { omit_baseli: "" });
    }
    catch (err) {
        return res.status(404).json({
            error: "Some Thing Went Wrong While Converting",
            err: err,
        });
    }
    return res.json({
        code: result,
        prettied: (0, prettier_1.format)(result, { parser: "babel" }),
    });
});
exports.default = router;
