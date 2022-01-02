"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var functions_1 = require("../../../src/functions");
var router = (0, express_1.Router)();
// loop over all routes
(0, functions_1.readdirs)(__dirname, ".js")
    .filter(function (e) { return !e.includes("index.js"); })
    .filter(function (e) { return !e.includes("functions.js"); })
    .filter(function (e) { return e.endsWith(".js"); })
    .forEach(function (dir, i) {
    var route = require(dir.endsWith('.js') ? dir:dir+'.js').default;
    if (!route)
        return;
    var d = extract(dir);
    router.use("/" + d.type, route);
    console.log(((i + 1 > 9 ? i + 1 : i + 1 + " ") + "- Loaded V1: " + ("/" + d.type) + " " + ("Router: " + route.stack[0].route.path)).rainbow
        .bold, "  Method: ".white, ("" + Object.keys(require(dir).default.stack[0].route.methods)[0].toUpperCase()).rainbow.bgBlack.italic);
});
exports.default = router;
function extract(string) {
    var type = string.split("/").reverse().slice(1)[0];
    var RouterName = string.split("/").reverse()[0].replace(".js", "");
    return {
        type: type,
        RouterName: RouterName,
    };
}
