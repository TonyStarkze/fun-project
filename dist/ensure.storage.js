"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const directoryPath = path_1.default.join(process.cwd(), "data");
const jsonFileName = 'db.json';
const content = {};
// Function to write content to a JSON file
const writeJsonFile = (filePath, data) => {
    fs_extra_1.default.outputJson(filePath, data)
        .then(() => {
        console.log(`storage file created`);
    })
        .catch(err => {
        console.log(err);
    });
};
// Main function to create file in directory
const createFileInDirectory = (directoryPath, fileName, fileContent) => {
    fs_extra_1.default.ensureDir(directoryPath)
        .then(() => {
        const filePath = path_1.default.join(directoryPath, fileName);
        writeJsonFile(filePath, fileContent);
    })
        .catch(err => {
        console.log(err);
    });
};
// Handle process exit event
process.on('exit', () => {
    if (fs_extra_1.default.existsSync(directoryPath)) {
        fs_extra_1.default.remove(directoryPath)
            .then(() => {
            console.log(`storage cleared`);
        })
            .catch(err => {
            console.log(err);
        });
    }
});
// Usage
createFileInDirectory(directoryPath, jsonFileName, content);
//# sourceMappingURL=ensure.storage.js.map