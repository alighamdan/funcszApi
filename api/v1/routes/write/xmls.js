"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prettier_1 = require("prettier");
var x2js_1 = __importDefault(require("x2js"));
var router = (0, express_1.Router)();
router.post("/xml2json", function (req, res) {
    var code = req.body.code;
    if (!code) {
        return res.status(404).json({
            error: "Please Provide a valid Json Code",
        });
    }
    var regex = new RegExp('<[^>]*>[a-z0-9-/-\s]+?<\/>', 'gi');
    try {
        new x2js_1.default().xml2js(code.replace(regex, ''));
    }
    catch (error) {
        return res.status(500).json({
            error: "Some Thing Wrong In Your JSON Syntax",
        });
    }
    var XML = new x2js_1.default({ keepText: true, skipEmptyTextNodesForObj: true });
    return res.json({
        code: new x2js_1.default({ skipEmptyTextNodesForObj: true }).xml2js(code.replace(regex, '')),
        prettied: {
            json: (0, prettier_1.format)(JSON.stringify(XML.xml2js(code.replace(regex, ''))), {
                parser: "json",
            }),
            xml: (0, prettier_1.format)(code.replace(regex, ''), {
                parser: "html",
            })
        },
        details: XML.xml2js(code.replace(regex, '')),
    });
});
exports.default = router;
