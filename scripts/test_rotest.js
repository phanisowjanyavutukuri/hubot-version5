(function() {
  var WebClient;
  WebClient = require("@slack/client").WebClient;
  (function() {
    module.exports = function(robot) {
      return robot.hear(/myrotatekeys (.*)/i, function(res) {
        var room;
        var output;
        var default_channel_name, notification_room, web;
        web = new WebClient(robot.adapter.options.token);
        notification_room = void 0;
        default_channel_name = "general";
        web.channels.list().then(function(api_response) {
          room = api_response.channels.find(function(channel) {
            return channel.name === default_channel_name;
          });
          if (room != null) {
            return notification_room = room.id;
          }
        })["catch"](function(error) {
          return robot.logger.error(error.message);
        });
        notification_room = res.message.rawMessage.channel;
        if (notification_room != null && ( res.message.room == 'CU14C237V' || res.message.user.id == 'UU01SURU2' || res.message.user.id == 'UU01SURU2')) {

        var user;
        user = res.match[1];
        AWS = require('aws-sdk');
        // AWS.config.loadFromPath('./aws-config.json'); // not using this because using roles
        var iam = new AWS.IAM({apiVersion: '2010-05-08'});
        var params = {
              UserName: user
               };

        function listkeys() {
          var listObjectPromise = iam.listAccessKeys(params).promise();
          listObjectPromise.then(function(data) {
             params["AccessKeyId"] = ''+data['AccessKeyMetadata'][0]['AccessKeyId']+'';
             console.log(data);
             createkey();
             }).catch(function(err) {
             console.log("Error", err);
             }); }
        function createkey() {
         var createObjectPromise = iam.createAccessKey({UserName: params.UserName}).promise();
         createObjectPromise.then(function(data) {
         console.log("The new accesskeys are", data.AccessKey);
         deletekey();
         }).catch(function(err) {
         console.log("Error", err);
         }); }
         function deletekey() {
         var deleteObjectPromise = iam.deleteAccessKey(params).promise();
         deleteObjectPromise.then(function(data) {
         console.log("The deleted key is", data);
         }).catch(function(err) {
         console.log("Error", err);
         });
         }
                  listkeys();



                  output = "Rotated the Access keys by user <@"+res.message.user.name+">"  + "'\n";
                  console.log(output);
                  const fs = require('fs')
                  fs.appendFile('/home/test/javacoffee/OutputLog.txt', output, (err) => {
                  if (err) throw err;
                  })
                  var AWS = require('aws-sdk');
                  var s3 = new AWS.S3();
                  var myBucket = 'mytestingsync';
                  
                  var myKey = 'Test1/Output.txt';
                  fs.readFile('/home/test/javacoffee/OutputLog.txt', function (err, data) {
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
                   return res.reply("Rotated the Access keys by user <@"+res.message.user.name+">");

        }//close of if
        else {
            return res.reply("invalid message room");
        }

         });
                }
           }).call(this);
}).call(this);

