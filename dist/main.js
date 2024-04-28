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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "./ensure.storage";
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const repository_1 = require("./repository");
const redis_1 = require("redis");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const redisClient = (0, redis_1.createClient)({
    username: process.env.CACHE_USER,
    password: process.env.CACHE_PASS,
    socket: {
        host: process.env.CACHE_HOST,
        port: +process.env.CACHE_PORT,
    },
});
redisClient
    .on("error", (err) => console.error(`Redis client encountered error ${err}`))
    .connect();
const repository = new repository_1.Repository(redisClient);
//this sets handlebars template ending as render engine.
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
//this tells express to look into /views directory for html files
app.set("views", path_1.default.join(process.cwd(), "views"));
//serves contents of "/public" directory on "/"
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
//middleware to parse json & url encoded form data in  body
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Homepage
app.get("/", (req, res) => {
    return res.render("index", { csspath: "/css/style.css" });
});
//Page where user creates text to share
app.get("/sender", (req, res) => {
    return res.render("sender", { csspath: "/css/sender.css" });
});
//handles post request from the form.
app.post("/sender", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (!text) {
        return res.render("sender", {
            csspath: "/css/sender.css",
            error: "text cannot be empty",
        });
    }
    const code = yield repository.insertText(text);
    return res.render("sender", { csspath: "/css/sender.css", code });
}));
//Page where users can see shared text
app.get("/receiver/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const data = yield repository.getText(code);
    return res.render("receiver", { csspath: "/css/receiver.css", data });
}));
//404 handler
app.all("*", (_, res, __) => {
    return res.render("not_found", { csspath: "/css/not_found.css" });
});
const port = (0, utils_1.parsePort)(process.env.PORT, 3000);
app.listen(port, () => {
    console.log(`textism started on port ${port}`);
});
//# sourceMappingURL=main.js.map