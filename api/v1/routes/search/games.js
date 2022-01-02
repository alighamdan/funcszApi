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
var axios_1 = __importDefault(require("axios"));
var linkedom_1 = require("linkedom");
var router = (0, express_1.Router)();
router.get("/games", function (req, res) {
    var q = req.query.q;
    if (!q || typeof q !== "string") {
        return res.status(404).json({
            error: "Please Provide q Param",
        });
    }
    getGames(String(q).replace(/%20/g, '+').replace(/\s/g, '+'))
        .then(function (data) {
        return res.json(data);
    })
        .catch(function (err) {
        return res.status(404).json({
            error: "Cannot Load the Games",
            err: err
        });
    });
});
exports.default = router;
function getGames(query) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var response, doc, urls, array, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("https://www.game-debate.com/search/games?t=games&query=" + query
                                    .replace(/\s/g, "+")
                                    .replace(/%20/g, "+"))];
                            case 1:
                                response = _a.sent();
                                doc = (0, linkedom_1.parseHTML)(response.data).document;
                                urls = Array.from(doc.querySelectorAll("a")).filter(function (url) {
                                    return url.href.startsWith("/games/index.php?");
                                });
                                if (urls.length === 0)
                                    return [2 /*return*/, reject(new Error("No Search Found"))];
                                array = [];
                                Array.from(doc.querySelectorAll(".search-result"))
                                    .map(function (item, index) {
                                    var _a, _b;
                                    return {
                                        url: "https://www.game-debate.com" + urls[index].href || null,
                                        image: item.querySelector(".search-result-image img").src,
                                        name: (_a = item.querySelector(".search-result-detail h2")) === null || _a === void 0 ? void 0 : _a.textContent,
                                        description: (_b = item.querySelector(".search-result-detail p")) === null || _b === void 0 ? void 0 : _b.textContent,
                                    };
                                })
                                    .forEach(function (item) {
                                    gameRequirments(item.url).then(function (GameReqs) {
                                        array.push(GameReqs);
                                    });
                                });
                                i = setInterval(function () {
                                    if (array.length === 0)
                                        return;
                                    clearInterval(i);
                                    setTimeout(function () {
                                        return resolve(array);
                                    }, 1000);
                                }, 300);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function gameRequirments(url) {
    return new Promise(function (resolev) {
        axios_1.default.get(url).then(function (_a) {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var data = _a.data;
            var doc = (0, linkedom_1.parseHTML)(data).window.document;
            var minmumRequirments = (_b = doc
                .querySelector(".devDefSysReqMinWrapper")) === null || _b === void 0 ? void 0 : _b.textContent.replace(/\n\n/g, "\n").replace(/\n\n\n/g, "\n");
            var maxmumRequirments = (_c = doc
                .querySelector(".devDefSysReqRecWrapper")) === null || _c === void 0 ? void 0 : _c.textContent.replace(/\n\n/g, "\n").replace(/\n\n\n/g, "\n");
            var aboutGameRequirment = (_d = doc.querySelector(".hardwareDescriptionNew")) === null || _d === void 0 ? void 0 : _d.textContent;
            var a = Array.from(doc.querySelectorAll(".game-release-date p"));
            var GameRelase = (_e = a[1]) === null || _e === void 0 ? void 0 : _e.textContent;
            var lolow = Array.from(doc.querySelectorAll(".gameFpsGraph div"));
            var GameGraphicsCardCanRunFPS = {
                "Graphic Card": {
                    name: (_g = (_f = lolow[1]) === null || _f === void 0 ? void 0 : _f.textContent.trim()) === null || _g === void 0 ? void 0 : _g.replace(/\n/g, ""),
                    Url: "https://www.game-debate.com" +
                        ((_h = doc.querySelector(".gameFpsGraph div a")) === null || _h === void 0 ? void 0 : _h.href),
                },
                FPS: (_k = (_j = doc
                    .querySelector(".gameFpsValFigure")) === null || _j === void 0 ? void 0 : _j.textContent.trim()) === null || _k === void 0 ? void 0 : _k.replace(/\n/g, ""),
            };
            var res = {
                name: doc
                    .querySelector("head title")
                    .textContent.split("|")[0]
                    .trim()
                    .replace(/\n/g, "")
                    .replace(" System Requirements", ""),
                url: url,
                GameRelase: GameRelase,
                aboutGameRequirment: aboutGameRequirment,
            };
            if (((_l = doc.querySelector(".gameFpsGraph div a")) === null || _l === void 0 ? void 0 : _l.href) !== undefined)
                res.BestGrapicCardForGame = GameGraphicsCardCanRunFPS;
            if (minmumRequirments) {
                getRequirment(minmumRequirments)
                    .then(function (data) {
                    res.minmiumRequirments = data;
                })
                    .catch(function (string) {
                    res.minmiumRequirments = string;
                });
            }
            if (maxmumRequirments) {
                getRequirment(maxmumRequirments)
                    .then(function (data) {
                    res.maxmiumRequirments = data;
                })
                    .catch(function (string) {
                    res.maxmiumRequirments = string;
                });
            }
            return resolev(res);
        });
    });
}
function getRequirment(string) {
    var reqs = {};
    var allreqs = string.toLowerCase().split("\n");
    if (string.includes("OS: ")) {
        var os = string.split("OS: ")[1].split("\n")[0].trim().replace(/\n/g, "");
        reqs.os = os;
    }
    if (allreqs.some(function (e) {
        return e.includes("os") ||
            e.includes("windows") ||
            e.includes("mac") ||
            e.includes("linux");
    })) {
        if (reqs.os == null) {
            reqs.os = allreqs.find(function (e) {
                return e.includes("os") ||
                    e.includes("windows") ||
                    e.includes("mac") ||
                    e.includes("linux");
            });
        }
    }
    if (string.includes("Processor: ")) {
        var processor = string
            .split("Processor: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.processor = processor;
    }
    if (allreqs.some(function (e) {
        return e.includes("processor") || e.includes("intel") || e.includes("core");
    })) {
        if (reqs.processor == null) {
            reqs.processor = allreqs
                .filter(function (e) {
                return e.includes("processor") || e.includes("intel") || e.includes("core");
            })
                .join(", ");
        }
    }
    if (string.includes("Memory: ")) {
        var ram = string
            .split("Memory: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.ram = ram;
    }
    if (allreqs.some(function (e) { return e.includes("memory"); })) {
        if (reqs.ram == null) {
            reqs.ram = allreqs.find(function (e) { return e.includes("memory"); });
        }
    }
    if (string.includes("\nRAM: ")) {
        var ram = string
            .split("\nRAM: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.ram = ram;
    }
    if (allreqs.some(function (e) { return e.includes("ram") && !e.includes("vram"); })) {
        if (reqs.ram == null) {
            reqs.ram = allreqs.find(function (e) { return e.includes("ram") && !e.includes("vram"); });
        }
    }
    if (string.includes("Graphics: ")) {
        var Graphics = string
            .split("Graphics: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.graphics = Graphics;
    }
    if (allreqs.some(function (e) { return e.includes("nivdia"); })) {
        if (reqs.graphics == null) {
            reqs.graphics = allreqs.find(function (e) { return e.includes("nivdia"); });
        }
    }
    if (string.includes("DirectX: ")) {
        var DirectX = string
            .split("DirectX: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.directx = DirectX;
    }
    if (allreqs.some(function (e) { return e.includes("directx"); })) {
        if (reqs.directx == null) {
            reqs.directx = allreqs.find(function (e) { return e.includes("directx"); });
        }
    }
    if (string.includes("Network: ")) {
        var Graphics = string
            .split("Network: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.network = Graphics;
    }
    if (allreqs.some(function (e) { return e.includes("network"); })) {
        if (reqs.network == null) {
            reqs.network = allreqs.find(function (e) { return e.includes("network"); });
        }
    }
    if (string.includes("Storage: ")) {
        var Storage_1 = string
            .split("Storage: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.storage = Storage_1;
    }
    if (allreqs.some(function (e) { return e.includes("storage"); })) {
        if (reqs.storage == null) {
            reqs.storage = allreqs.find(function (e) { return e.includes("storage"); });
        }
    }
    if (string.includes("VRAM: ")) {
        var VRAM = string
            .split("VRAM: ")[1]
            .split("\n")[0]
            .trim()
            .replace(/\n/g, "");
        reqs.vram = VRAM;
    }
    if (allreqs.some(function (e) { return e.includes("vram"); })) {
        if (reqs.vram == null) {
            reqs.vram = allreqs.find(function (e) { return e.includes("vram"); });
        }
    }
    if (string.includes("HDD: ")) {
        var HDD = string.split("HDD: ")[1].split("\n")[0].trim().replace(/\n/g, "");
        reqs.hdd = HDD;
    }
    if (allreqs.some(function (e) { return e.includes("hdd"); })) {
        if (reqs.hdd == null) {
            reqs.hdd = allreqs.find(function (e) { return e.includes("hdd"); });
        }
    }
    return new Promise(function (resolve, reject) {
        if (Object.keys(reqs).length === 0) {
            return reject(string);
        }
        else
            return resolve(reqs);
    });
}
