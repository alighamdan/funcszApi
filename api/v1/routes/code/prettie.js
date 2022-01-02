"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prettier_1 = require("prettier");
var express_1 = require("express");
var router = (0, express_1.Router)();
router.post("/prettie", function (req, res) {
    var code = req.body.code;
    var lang = req.body.language;
    if (!code) {
        return res.status(404).json({
            error: "Please Send Your Code In code Body"
        });
    }
    var parsersTypes = [
        "babel",
        "babel-flow",
        "babel-ts",
        "flow",
        "typescript",
        "espree",
        "meriyah",
        "css",
        "scss",
        "less",
        "json",
        "json5",
        "json-stringify",
        "graphql",
        "markfown",
        "mdx",
        "html",
        "vue",
        "anular",
        "lwc",
        "yaml",
    ];
    if (lang) {
        if (lang.toLowerCase() === 'javascript') {
            return res.status(404).json({
                error: "Use 'babel' Instead Of Javascript"
            });
        }
        if (!parsersTypes.includes(lang.toLowerCase())) {
            return res.status(404).json({
                error: "lang body Has No Supported Check All Supported Types",
                supportedTypes: (0, prettier_1.getSupportInfo)()
            });
        }
    }
    var formatted = (0, prettier_1.format)(typeof code !== "string" ? JSON.stringify(code) : code, {
        parser: !lang ? null : lang
    });
    if (formatted === code) {
        return res.json({
            status: "This Code Is Already Formatted"
        });
    }
    return res.json({ formatted: formatted });
});
exports.default = router;
