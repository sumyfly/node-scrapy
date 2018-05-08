"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const path = require("path");
const fsUtils_1 = require("./utils/fsUtils");
const emojis = require('./emojis.json');
console.warn('emojis', emojis);
function requestForHttpContent(url, fileDirName) {
    const fileName = path.basename(url);
    const callback = res => {
        const contentLength = parseInt(res.headers['content-length']);
        const fileBuff = [];
        res.on('data', chunk => {
            const buffer = new Buffer(chunk);
            fileBuff.push(buffer);
        });
        res.on('end', () => __awaiter(this, void 0, void 0, function* () {
            if (isNaN(contentLength)) {
                console.warn(url + 'contentLenght error');
                return;
            }
            const totalBuff = Buffer.concat(fileBuff);
            if (totalBuff.length < contentLength) {
                console.warn('error contentLength ');
            }
            if (!(yield fsUtils_1.fsUtils.isExits(fileDirName))) {
                yield fsUtils_1.fsUtils.makeDir(fileDirName);
            }
            fs.appendFile(fileDirName + '/' + fileName, totalBuff, { flag: 'a' }, err => console.warn(err + ':' + fileName));
        }));
    };
    return callback;
}
function startScrapyTask(url, dirName) {
    const req = http.request(url, requestForHttpContent(url, dirName));
    req.on('error', e => {
        console.log(`http request ${url} error!`, e);
    });
    req.end();
}
const out = {};
Object.keys(emojis).map(key => {
    out[key] = [];
    emojis[key].map(img => {
        const reg = /http:\/\/img.soogif.com\/(.*)/g;
        const fileName = reg.exec(img.image)[1];
        out[key].push({ image: `https://smileprod.blob.core.chinacloudapi.cn/emojis/${key}/` + fileName });
    });
});
console.warn('out', JSON.stringify(out));
//# sourceMappingURL=index.js.map