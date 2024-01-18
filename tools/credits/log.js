"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.info = exports.warn = exports.error = void 0;
const chalk_1 = __importDefault(require("chalk"));
const console = __importStar(require("console"));
function error(...text) {
    return console.error(chalk_1.default.bold.red(...text));
}
exports.error = error;
function warn(...text) {
    return console.error(chalk_1.default.bold.yellow(...text));
}
exports.warn = warn;
function info(...text) {
    return console.error(chalk_1.default.bold.white(...text));
}
exports.info = info;
function debug(...text) {
    return console.debug(chalk_1.default.bold.blue(...text));
}
exports.debug = debug;
//# sourceMappingURL=log.js.map