"use strict";
//https://gist.github.com/SeanJM/9817f1be5cdbd505ce143eae3ca54621
Object.defineProperty(exports, "__esModule", { value: true });
var lib = {
    alpha: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ],
    number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    symbols: ['_', '-', '$', '!', '%', '?']
};
var defaultKeys = ['alpha', 'number', 'symbols'];
function generateId(index, customKeys) {
    var keys = customKeys
        || defaultKeys;
    var customLib = keys
        .map(function (a) { return lib[a]; })
        .reduce(function (a, b) { return a.concat(b); });
    var n = customLib.length;
    var generatedId = [];
    while (index > 0) {
        generatedId.push(customLib[Math.round(Math.random() * n)]);
        index -= 1;
    }
    return generatedId.join('');
}
exports.default = generateId;
