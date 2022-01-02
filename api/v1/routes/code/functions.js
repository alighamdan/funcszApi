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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubGistCodes = exports.stackoverflowCodes = exports.TabnineCodes = void 0;
var axios_1 = __importDefault(require("axios"));
var linkedom_1 = require("linkedom");
var timers_1 = require("timers");
function GithubGistCodes(query) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var array, urls, urls_1, urls_1_1, url, data, error_1, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = [];
                    return [4 /*yield*/, GithubGistsUrls(query)];
                case 1:
                    urls = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, 11, 16]);
                    urls_1 = __asyncValues(urls);
                    _b.label = 3;
                case 3: return [4 /*yield*/, urls_1.next()];
                case 4:
                    if (!(urls_1_1 = _b.sent(), !urls_1_1.done)) return [3 /*break*/, 9];
                    url = urls_1_1.value;
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, GithubGistsSnippet(url)];
                case 6:
                    data = _b.sent();
                    array.push(data);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 3];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _b.trys.push([11, , 14, 15]);
                    if (!(urls_1_1 && !urls_1_1.done && (_a = urls_1.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _a.call(urls_1)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/, resolve(array.map(function (e) {
                        return { code: e.code, sourceURL: e.sourceURL };
                    }))];
            }
        });
    }); });
}
exports.GithubGistCodes = GithubGistCodes;
function GithubGistsSnippet(url) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(url)
            .then(function (response) {
            var _a, _b;
            var doc = (0, linkedom_1.parseHTML)(response.data).window.document;
            if (((_a = doc
                .querySelector("table.highlight")) === null || _a === void 0 ? void 0 : _a.textContent.replace(/\n {6}\n {8}\n {8}/g, "")) == null) {
                return reject(new Error("No Snippet found In " + url));
            }
            return resolve({
                code: (_b = doc
                    .querySelector("table.highlight")) === null || _b === void 0 ? void 0 : _b.textContent.replace(/\n {6}\n {8}\n {8}/g, ""),
                sourceURL: url,
                author: doc.querySelector(".author").textContent,
                projectName: Array.from(doc.querySelectorAll("strong"))
                    .map(function (e) { return e.textContent.trim(); })
                    .reverse()[0]
                    .trim(),
                stars: Array.from(doc.querySelectorAll(".social-count"))
                    .map(function (e) { return e.textContent.trim(); })
                    .slice(1)[0],
                forks: Array.from(doc.querySelectorAll(".social-count"))
                    .map(function (e) { return e.textContent.trim(); })
                    .slice(1)
                    .reverse()[0],
            });
        })
            .catch(reject);
    });
}
function GithubGistsUrls(query) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(getSearchURL("gist.github.com", query))
            .then(function (response) {
            var regex = new RegExp("(https://gist.github.com/[a-z0-9-/]+)", "gi");
            var urls = response.data.match(regex);
            if (urls.length === 0)
                return reject(new Error("Cannot Find Any Gist With " + query));
            return resolve(urls.slice(0, 10));
        })
            .catch(reject);
    });
}
function stackoverflowCodes(query) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var array, lnkoke, lnkoke_1, lnkoke_1_1, link, e_2_1, a;
        var _this = this;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = [];
                    return [4 /*yield*/, getAllstackoverflowurls(query)];
                case 1:
                    lnkoke = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 13]);
                    lnkoke_1 = __asyncValues(lnkoke);
                    _b.label = 3;
                case 3: return [4 /*yield*/, lnkoke_1.next()];
                case 4:
                    if (!(lnkoke_1_1 = _b.sent(), !lnkoke_1_1.done)) return [3 /*break*/, 6];
                    link = lnkoke_1_1.value;
                    GetStackoverFlowUrlCodesData(link)
                        .then(function (snippet) { var snippet_1, snippet_1_1; return __awaiter(_this, void 0, void 0, function () {
                        var snip, e_3_1;
                        var e_3, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 5, 6, 11]);
                                    snippet_1 = __asyncValues(snippet);
                                    _b.label = 1;
                                case 1: return [4 /*yield*/, snippet_1.next()];
                                case 2:
                                    if (!(snippet_1_1 = _b.sent(), !snippet_1_1.done)) return [3 /*break*/, 4];
                                    snip = snippet_1_1.value;
                                    array.push(snip);
                                    _b.label = 3;
                                case 3: return [3 /*break*/, 1];
                                case 4: return [3 /*break*/, 11];
                                case 5:
                                    e_3_1 = _b.sent();
                                    e_3 = { error: e_3_1 };
                                    return [3 /*break*/, 11];
                                case 6:
                                    _b.trys.push([6, , 9, 10]);
                                    if (!(snippet_1_1 && !snippet_1_1.done && (_a = snippet_1.return))) return [3 /*break*/, 8];
                                    return [4 /*yield*/, _a.call(snippet_1)];
                                case 7:
                                    _b.sent();
                                    _b.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    if (e_3) throw e_3.error;
                                    return [7 /*endfinally*/];
                                case 10: return [7 /*endfinally*/];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(console.error);
                    _b.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(lnkoke_1_1 && !lnkoke_1_1.done && (_a = lnkoke_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(lnkoke_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    a = setInterval(function () {
                        if (array.length === 0)
                            return;
                        setTimeout(function () {
                            (0, timers_1.clearInterval)(a);
                            return resolve(array);
                        }, 3000);
                    }, 300);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.stackoverflowCodes = stackoverflowCodes;
function GetStackoverFlowUrlCodesData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var array, a;
        return __generator(this, function (_a) {
            array = [];
            a = new Promise(function (resolve, reject) {
                axios_1.default
                    .get(url)
                    .then(function (_a) {
                    var data = _a.data;
                    var docs = (0, linkedom_1.parseHTML)(data).window.document;
                    var answers = Array.from(docs.querySelectorAll(".answer")).filter(function (e) {
                        return e.querySelector("code") !== null;
                    });
                    if (answers.length === 0)
                        return reject("No Answers In This Url");
                    answers
                        .map(function (item) {
                        var _a;
                        return {
                            code: item.querySelector("code").textContent,
                            sourceURL: "https://stackoverflow.com" + ((_a = item.querySelector(".js-share-link")) === null || _a === void 0 ? void 0 : _a.href),
                        };
                    })
                        .forEach(function (snippet, index, list) {
                        array.push(snippet);
                        if (index === list.length - 1)
                            return resolve("Done");
                    });
                })
                    .catch(reject);
            });
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    a.then(function () {
                        return resolve(array);
                    }).catch(reject);
                })];
        });
    });
}
function getAllstackoverflowurls(query) {
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(getSearchURL("stackoverflow.com", query))
            .then(function (response) {
            var regex = new RegExp("(https://stackoverflow.com/[a-z0-9-/]+)", "gi");
            var urls = response.data.match(regex);
            return resolve(urls || []);
        })
            .catch(reject);
    });
}
function getSearchURL(site, keyword) {
    return "https://www.google.com/search?q=site%3A" + site + "+" + keyword.replace(/\s/g, "+");
}
function TabnineCodes(query, type) {
    if (type === void 0) { type = "javascript"; }
    return new Promise(function (resolve, reject) {
        if (!["javascript", "java"].includes(type))
            return reject(new Error("Please Only Java Or Javascript"));
        axios_1.default
            .get(SearchTabnine(query, type))
            .then(function (data) {
            if (data.data.toLowerCase().includes("No snippets found...")) {
                return reject(new Error("No Snippet Has Been Found"));
            }
            var doc = (0, linkedom_1.parseHTML)(data.data).window.document;
            var codes = Array.from(doc.querySelectorAll(".SnippetCard")).map(function (item) {
                return {
                    code: item.getElementsByClassName("SnippetCode-wrapper")[0]
                        .textContent,
                    author: item
                        .getElementsByClassName("source")[0]
                        .querySelector("div a b")
                        .textContent.split("")
                        .reverse()
                        .slice(1)
                        .reverse()
                        .join(""),
                    projectName: item
                        .getElementsByClassName("source")[0]
                        .querySelectorAll("a b")[1].textContent,
                    fileName: item.querySelector(".label").textContent,
                    sourceURL: item.querySelector(".source").querySelector("a").href,
                };
            });
            return resolve(codes);
        })
            .catch(reject);
    });
}
exports.TabnineCodes = TabnineCodes;
function SearchTabnine(query, type) {
    return "https://www.tabnine.com/code/" + type + "/query/\"" + encodeURI(query) + "\"";
}
