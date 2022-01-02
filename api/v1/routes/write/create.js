"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bins_1 = __importDefault(require("../../../../src/data/schemas/bins"));
var router = (0, express_1.Router)();
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, language, title, password, isprivate, id, Token, isThere, isThereToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.body.code;
                language = req.body.language;
                title = req.body.title;
                password = req.body.password;
                isprivate = Boolean(req.body.private);
                if (!code) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Please Provide code Body",
                        })];
                }
                if (typeof code !== "string") {
                    return [2 /*return*/, res.status(404).json({
                            error: "Please Send The Code As String",
                        })];
                }
                if (!title) {
                    return [2 /*return*/, res.status(404).json({
                            error: "Please Provide title Body",
                        })];
                }
                if (typeof title !== "string") {
                    return [2 /*return*/, res.status(404).json({
                            error: "Please Provide The Title Body As String",
                        })];
                }
                if (!language)
                    language = "PlainText";
                if (!isprivate)
                    isprivate = false;
                id = RandomID();
                Token = RandomToken();
                return [4 /*yield*/, bins_1.default.find({ ID: id })];
            case 1:
                isThere = (_a.sent()).length !== 0;
                return [4 /*yield*/, bins_1.default.find({ Token: Token })];
            case 2:
                isThereToken = (_a.sent()).length !== 0;
                while (isThere) {
                    id = RandomID();
                }
                while (isThereToken) {
                    Token = RandomToken();
                }
                bins_1.default.create({
                    title: title,
                    password: password ? password : null,
                    language: language,
                    Code: code,
                    ID: id,
                    isprivate: isprivate,
                    Token: Token,
                })
                    .then(function (data) {
                    return res.json({
                        status: "Created SuccessFully!",
                        data: {
                            title: data.title,
                            havePassword: data.password != null,
                            language: data.language,
                            Code: data.Code,
                            ID: data.ID,
                            Token: data.Token,
                            CreatedAt: data.createdAt,
                            UpdatedAt: data.updatedAt,
                        },
                        note: "Do Not Show The Token For Any One You Can Only Edit This Bin And Deleted Only With This Token",
                    });
                })
                    .catch(function (err) {
                    return res.status(404).json({
                        error: "Some Thing Went Wrong",
                        err: err,
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
function RandomID() {
    var result = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123465789";
    for (var i = 0; i < 30; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function RandomToken() {
    var result = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123465789.-";
    for (var i = 0; i < 50; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
