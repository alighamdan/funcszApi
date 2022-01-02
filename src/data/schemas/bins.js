"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    title: String,
    password: String || null,
    language: String,
    Code: String,
    ID: String,
    isprivate: Boolean,
    Token: String
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('bins', schema);
