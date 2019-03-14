var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var config = require('./config');
aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});
console.log('multer - secretAccessKey', config.AWS_SECRET_ACCESS_KEY);
console.log('multer - accessKeyId', config.AWS_ACCESS_KEY_ID);
var s3 = new aws.S3();
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};
var upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'bwm-ng-dev',
        metadata: function (req, file, cb) {
            //cb(null, {fieldName: 'TESTING_METADATA'});
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
module.exports = upload;
