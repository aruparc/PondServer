var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
var nodemailer = require("nodemailer");
//example mailOptions object
/*let mailOptions = {
        from: 'The Signpost Team',
        to: req.body.email,
        subject: 'Welcome to Signpost!',
        html: '<h1>Welcome to Signpost!</h1></div><p>Dear ' + req.body.first_name + ',</p><p>Thank you for joining Signpost! Signpost is built with the user in mind - we want to make your life better. ' +
        'Therefore, if you have any suggestions, questions, complaints or feedback feel free to contact either of the Signpost founders directly:</p>' +
        '<p>Benjamin du Preez: benjamin@signpost.app</p><p>Chrisjan Wust: chrisjan@signpost.app</p><p>Regards,</p><p>The Signpost Team</p><p><a href="http://www.signpost.app">www.signpost.app</a></p>'
    };*/
var sendMatchEmailNotification = function (mailOptions) { return __awaiter(_this, void 0, void 0, function () {
    var transporter;
    return __generator(this, function (_a) {
        try {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'pond.app.contact@gmail.com',
                    pass: 'Letsmakefriends8*'
                },
                tls: { rejectUnauthorized: false }
            });
            transporter.sendMail(mailOptions, function (err, result) {
                if (err) {
                    console.log(err);
                    //res.status(500).send(err);
                }
                else {
                    console.log(result);
                    //res.status(200).send(result);
                }
            });
        }
        catch (err) {
            console.log("Error in send match email notification:  " + err.message + " ");
        }
        return [2 /*return*/];
    });
}); };
module.exports = sendMatchEmailNotification;
