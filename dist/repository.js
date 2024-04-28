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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const DEFAULT_EXPIRY_MINUTES = +process.env.EXPIRY_IN_MINUTES;
class Repository {
    constructor(cache) {
        this.cache = cache;
    }
    insertText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const sharedText = {
                code: id,
                text,
                expiry: (0, utils_1.getExpiryDate)(DEFAULT_EXPIRY_MINUTES),
            };
            yield this.cache.set(id, JSON.stringify(sharedText), {
                EX: 3600,
            });
            return id;
        });
    }
    getText(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = yield this.cache.get(code);
            return str ? JSON.parse(str) : null;
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map