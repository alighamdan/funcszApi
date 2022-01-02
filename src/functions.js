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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readdirs = void 0;
var fs_1 = require("fs");
// return a list of files in a directory
function readdirs(dir, suffix) {
    var files = (0, fs_1.readdirSync)(dir, {
        withFileTypes: true,
    });
    var Files = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (file.isDirectory()) {
            Files = __spreadArray(__spreadArray([], Files, true), readdirs(dir + "/" + file.name, suffix), true);
        }
        else {
            Files.push(dir + "/" + file.name);
        }
    }
    return Files;
}
exports.readdirs = readdirs;
