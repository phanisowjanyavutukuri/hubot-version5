module.exports = function(output) {
    output = output;
const fs = require('fs')
        fs.appendFile('/home/test/OutputLog.txt', output, function(err)  {
        if (err) throw err;
        })
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3();
        var myBucket = 'mytestingsync';
        
        var myKey = 'Test1/Output.txt';
        fs.readFile('/home/test/OutputLog.txt', function (err, data) {
         if (err) { throw err; }
         params = {Bucket: myBucket, Key: myKey, Body: data };
         s3.putObject(params, function(err, data) {
          if (err) {
             console.log(err)
          } else {
         console.log("Successfully uploaded data to myBucket/myKey");
                  }
         });
         });
        }

