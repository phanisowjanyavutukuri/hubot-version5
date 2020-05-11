var slackObj = null;
var searchQuery;
(function() {
    var WebClient;
   
    WebClient = require("@slack/client").WebClient;
    module.exports = function(robot) {
      return robot.hear(/splunk (.*) (.*) (.*) (.*) (.*)/i,function(res) {
        slackObj = res;
      var room, output, default_channel_name, notification_room, web;
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
        condition = require('../libs/checking_user_and_room');
        async function function_call () {
        if (notification_room != null && (condition(res.message.user.id,res.message.room) == "true")) {
        
        var host, pid, splunk, envi;
        
        host = void 0;
        pid = void 0;
        host = res.match[1];
        pid = res.match[2];
        envi = res.match[3];
        earliest_time = res.match[4];
        latest_time = res.match[5];

        searchQuery = "search host="+host+" source="+pid;

        splunk =  await require('../libs/splunk_login.js');
        console.log("load of file is done");
        
        splunk(envi,searchQuery,earliest_time,latest_time, log);
        console.log(stat);
        console.log("function is being called");
        console.log("**********"+ typeof stat);
        await console.log("========================================");
        //stat.then(function(result){
        //  console.log("stat is calling"+ result);
        //}).catch(function(result) { console.log("In catch"+ result);  })
        await console.log("========================================");
        console.log("sow is calling"+stat);

        // output = "the splunk query is  "+searchQuery+" by user <@"+res.message.user.name+">"  + "'\n";
        // console.log(output);
        // myoutput = require('../libs/pushing_output_to_aws.js');
        //  mystat = JSON.stringify(stat);
        // console.log(mystat);
        //  return res.reply(JSON.stringify(stat));
    } //if condition for the notification room is closed
    else {
        return res.reply("invalid message room");
        } //closing the else condition
        }//close of the function_call
        function_call();

      });
    };
  }).call(this);

  function log(stat){
    output = "the splunk query is  "+searchQuery+" by user <@"+slackObj.message.user.name+">"  + "'\n";
    fold1 = stat.defaultSaveTTL
            fold2 = stat.defaultTTL
            fold3 = stat.diskUsage
            finalPath = fold1+"/"+fold2+"/"+fold3
            var AWS = require('aws-sdk');
            //AWS.config.loadFromPath('./aws-config.json');
            var s3 = new AWS.S3();
            var params = {  Bucket: 'test-hubot', Key: finalPath };
            s3.deleteObject(params, function(err, data) {
                if (err) console.log(err, err.stack);  // error
                else     console.log();                 // deleted
            });
    console.log(output);
    myoutput = require('../libs/pushing_output_to_aws.js');
     mystat = JSON.stringify(stat);
    console.log(mystat);
     return slackObj.reply(finalPath);
  }
