"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("table");
var express_1 = __importDefault(require("express"));
var colors_1 = __importDefault(require("colors"));
var functions_1 = require("./src/functions");
var mongoose_1 = __importDefault(require("mongoose"));
var fs_1 = require("fs");
var prettier_1 = require("prettier");
mongoose_1.default.connect("mongodb+srv://funcsz:gbj2SnPh4d6Q!K5@funcsz.ndwuv.mongodb.net/funcsz?retryWrites=true&w=majority", function (err) {
    if (err)
        return console.error("Some Thing Went Wrong When Connecting With mongoDB".red);
    else
        return console.log("Mongodb Connected Successfully!".green.bold);
});
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var all = {};
(0, fs_1.readdirSync)("./api", {
    withFileTypes: true,
})
    .filter(function (e) {
    return e.isDirectory() && e.name.toLowerCase().startsWith("v");
})
    .forEach(function (folder, index, mainList) {
    var ver = require("./api/" + folder.name + "/routes/index").default;
    app.use("/api/" + folder.name, ver);
    var apiroutes = (0, functions_1.readdirs)("./api/" + folder.name + "/routes", ".ts")
        .filter(function (e) { return !e.includes("functions.ts"); })
        .filter(function (e) { return !e.includes("index.ts"); })
        .filter(function (e) { return e.endsWith(".ts"); });
    apiroutes.forEach(function (fileDir) {
        var route = require(fileDir).default;
        if (!route || !route.stack[0])
            return;
        if (!all[folder.name])
            all[folder.name] = [];
        if (all[folder.name]
            .map(function (e) { return e.router.path; })
            .includes(route.stack[0].route.path) &&
            all[folder.name]
                .map(function (e) { return e.routeType; })
                .includes("/" + fileDir.split("/").reverse().slice(1)[0])) {
            return;
        }
        return all[folder.name].push({
            version: folder.name,
            routeType: "/" + fileDir.split("/").reverse().slice(1)[0],
            router: {
                method: Object.keys(route.stack[0].route.methods)[0].toUpperCase(),
                path: route.stack[0].route.path,
            },
            example: "/api/" + folder.name + "/" + fileDir.split("/").reverse().slice(1)[0] + route.stack[0].route.path,
        });
    });
    // commented out because Its Restart The nodemon on Start.
    (0, fs_1.writeFileSync)("./apiVersionRequest.json", (0, prettier_1.format)(JSON.stringify(all), {
        parser: "json",
    }));
    app.listen(3000, function () {
        console.log((0, table_1.table)(__spreadArray([
            [colors_1.default.bold("Version"), colors_1.default.bold("EndPoints")]
        ], mainList.map(function () {
            return [
                colors_1.default.bold(folder.name),
                apiroutes.length > 20
                    ? "" + colors_1.default.bold.green(apiroutes.length.toString())
                    : "" + colors_1.default.bold.red(apiroutes.length.toString()),
            ];
        }), true), {
            header: {
                content: colors_1.default.yellow.bold("All Api Versions And EndPoints Length"),
            },
            columnDefault: {
                width: 20,
            },
        }));
    });
});
